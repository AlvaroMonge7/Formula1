const express = require("express");
const mysql = require("mysql"); //para hacer peticiones a la base dedatos
const cron = require("node-cron"); //para hacer un funcion cada cierto tiempo
const convert = require("xml-js");//para convertir el XML a JSON
const axios = require("axios");//para poder hacer peticiones a la una api
const bodyParser = require('body-parser');
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "formula1",
}); 


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

let oldDrivers = [];
//se ejecuta cada lunes a las 9 de la mañana
const task1 = cron.schedule("27 13 * * 1", () => {
  axios
    .get("https://ergast.com/api/f1/current/last/results")
    .then((response) => {
      const res = convert.xml2json(response.data, { compact: true, spaces: 4 });
      const data = JSON.parse(res);
      const drivers = data.MRData.RaceTable.Race.ResultsList.Result.map(
        (result) => ({
          posicion: result._attributes.position,
          driverId: result.Driver._attributes.driverId,
          givenName: result.Driver.GivenName._text,
          familyName: result.Driver.FamilyName._text,
          nationality: result.Driver.Nationality._text,
          //corregir el nombre de la escuderia de la api
          constructor:result.Constructor.Name._text === "Alpine F1 Team" ? "Alpine" : result.Constructor.Name._text === "Haas F1 Team" ? "Haas" : result.Constructor.Name._text,
          grid: result.Grid._text,
          laps: result.Laps._text,
          status: result.Status._text,
          puntos: result._attributes.points,
          tiempo: result.Time ? result.Time._text : "",
        })
      );
      

      if (JSON.stringify(oldDrivers) !== JSON.stringify(drivers)) {
        oldDrivers = drivers;
        let fantasies = [];
        connection.query(
          `SELECT f.id_fantasy, p.apellido AS piloto1, p2.apellido AS piloto2, p3.apellido AS piloto3, p4.apellido AS piloto4, p5.apellido AS piloto5, e1.Nombre_escuderia AS equipo1, e2.Nombre_escuderia AS equipo2
            FROM Fantasy f
            JOIN Piloto p ON f.id_piloto1 = p.id_piloto
            JOIN Piloto p2 ON f.id_piloto2 = p2.id_piloto
            JOIN Piloto p3 ON f.id_piloto3 = p3.id_piloto
            JOIN Piloto p4 ON f.id_piloto4 = p4.id_piloto
            JOIN Piloto p5 ON f.id_piloto5 = p5.id_piloto
            JOIN Escuderia e1 ON f.id_equipo1 = e1.id_escuderia
            JOIN Escuderia e2 ON f.id_equipo2 = e2.id_escuderia;`,
          (error, rows) => {
            if (error) throw error;

            rows.forEach((row) => {
              fantasies.push(row);
            });

            fantasies.forEach((fantasy) => {
              let puntos = 0;
              for (let i = 1; i <= 5; i++) {
                const piloto = fantasy[`piloto${i}`];
                const driver = drivers.find(
                  (driver) => driver.familyName === piloto
                );
                if (driver) {
                  puntos += parseInt(driver.puntos);
                  if (driver.constructor === fantasy.equipo1 || fantasy.equipo2) {
                    //suma los la mitad de los puntos que ha conseguido el piloto que pertenece al equipo del fantasy
                    puntos += parseInt(driver.puntos) / 2;
                  }
                }
              }

              let puntosAntiguos=0
              let puntosTotal=0
              connection.query(
                'SELECT puntos FROM fantasy WHERE id_fantasy = ?',
                [fantasy.id_fantasy],
                (error, results, fields) => {
                  if (error) {
                    console.log(error);
                  } else if (results.length > 0) {
                    puntosAntiguos = results[0].puntos;
                    puntosTotal=puntos+puntosAntiguos;

                    connection.query(
                      `UPDATE Fantasy SET puntos = ? WHERE id_fantasy = ?`,
                      [puntosTotal, fantasy.id_fantasy],
                      (error, results) => {
                        if (error) throw error;
                      }
                    );
                  }
                }
              );

            });
          }
        );
      }
    })
    .catch((error) => {
      console.log(error);
    });
});  
task1.start();  
  


//funcion para cambiar el equipo fantasy
app.post('/fantasy/:id', (req, res) => {
  const { pilotos, escuderias } = req.body;
  if (pilotos.length !== 5 || escuderias.length !== 2) {
    res.status(400).json({ success: false, error: 'Debes proporcionar 5 pilotos y 2 escuderías' });
    return;
  }
  const pilotosIds = [];
  const equiposIds = [];

  const insertPilotos = () => {
    const piloto = pilotos.pop();
    connection.query(
      'SELECT id_piloto FROM piloto WHERE apellido = ?',
      [piloto.apellido],
      (error, results, fields) => {
        if (error) {
          console.log(error);
          res.status(500).json({ success: false, error: 'Error en la consulta de pilotos' });
        } else if (results.length > 0) {
          pilotosIds.push(results[0].id_piloto);
        }

        if (pilotos.length > 0) {
          insertPilotos();
        } else {
          insertEscuderias();
        }
      }
    );
  };

  const insertEscuderias = () => {
    const escuderia = escuderias.pop();
    
    connection.query(
      'SELECT id_escuderia FROM escuderia WHERE Nombre_escuderia = ?',
      [escuderia.Nombre_escuderia],
      (error, results, fields) => {
        if (error) {
          console.log(error);
          res.status(500).json({ success: false, error: 'Error en la consulta de escuderías' });
        } else if (results.length > 0) {
          equiposIds.push(results[0].id_escuderia);
          console.log(equiposIds)
        }

        if (escuderias.length > 0) {
          insertEscuderias();
        } else {
          insertFantasy(); 
        }
      }
    );
  };

  const insertFantasy = () => {
    console.log(pilotosIds, equiposIds);
    connection.query(
      `UPDATE fantasy SET id_piloto1 = ?, id_piloto2 = ?, id_piloto3 = ?, id_piloto4 = ?, id_piloto5 = ?, id_equipo1 = ?, id_equipo2 = ? WHERE id_fantasy = ${req.params.id}`,
      [pilotosIds[0], pilotosIds[1], pilotosIds[2], pilotosIds[3], pilotosIds[4], equiposIds[0], equiposIds[1]],
      (error, results, fields) => {
        if (error) {
          console.log(error);
          res.status(500).json({ success: false, error: 'Error al actualizar en la tabla fantasy' });
        } else {
          res.json({ success: true, message: 'Actualización exitosa en la tabla fantasy' });
        }
      }
    );
  };

  insertPilotos();
});

app.get('/puntosFantasy/:id', (req, res) => {
  connection.query(
    'SELECT puntos FROM fantasy WHERE id_fantasy = ?',
    [req.params.id],
    (error, results, fields) => {
      if (error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Error en la consulta de la tabla fantasy' });
      } else if (results.length > 0) {
        const puntos = results[0].puntos;
        res.json({ success: true, puntos });
      }
    }
  );
});


app.post("/login", (req, res) => {
  const params = req.body;

  connection.query(
    "SELECT usuario, administrador, id_usuario FROM usuario WHERE usuario = ? AND contrasena = ?",
    [params.usuario, params.contrasena],
    (error, results, fields) => {
      if (error) {
        res.json({ success: false, error: error.message });
      } else if (results.length > 0) {
        console.log(results[0]);
        const usuario = results[0];
        res.json({
          success: true,
          usuario: usuario.usuario,
          administrador: usuario.administrador,
          idUsuario: usuario.id_usuario,
        });
      } else {
        res.json({ success: false , message:'Usuario o contraseña incorrectos'});
      }
    }
  );
});


app.post("/registrar", (req, res) => {
  console.log('hola')
  const params = req.body;

  connection.query(
    "INSERT INTO usuario (usuario, correo, contrasena) VALUES (?, ?, ?)",
    [params.usuario, params.correo, params.contrasena],
    (error, results, fields) => {
      if (error) {
        res.json({ success: false, error: error.message });
      } else {
        res.json({ success: true });
      }
    }
  );
  connection.query(
    "INSERT INTO `fantasy` (`id_fantasy`, `id_piloto1`, `id_piloto2`, `id_piloto3`, `id_piloto4`, `id_piloto5`, `id_equipo1`, `id_equipo2`, `puntos`) VALUES (NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);",
    (error, results, fields)=>{
      if (error) throw error;
    }
  )
  var id_fantasyNuevo;
  connection.query(
    "SELECT * FROM fantasy",
    (error, rows)=>{
      if (error) throw error;

      filas=rows.length-1
      id_fantasyNuevo=rows[filas].id_fantasy;

      console.log( id_fantasyNuevo);
      connection.query(
        `UPDATE usuario SET id_fantasy = ${id_fantasyNuevo} WHERE usuario.id_usuario = ${id_fantasyNuevo};`,
        (error, results, fields)=>{
          if (error) throw error;
        }
      )
    }
  );
});

//consultas a la base de datos
app.get("/circuitos", (req, res) => {
  connection.query("SELECT c.id_circuito, c.circuito, c.ciudad, c.pais, c.annoPrimerGP, c.nVueltas, c.distancia, p.apellido AS apellido_piloto, p.Nombre_piloto AS nombre_piloto, c.tiempoRecord, c.annoRecord FROM circuito c JOIN piloto p ON c.pilotoRecord = p.id_piloto; ", (error, results, fields) => {
    if (error) throw error;

    res.json(results);
  });
});

app.get("/pilotosActivos", (req, res) => {
  connection.query(
    "SELECT piloto.*, escuderia.Nombre_escuderia  FROM piloto  JOIN escuderia  ON piloto.ID_escuderia = escuderia.ID_escuderia WHERE piloto.ID_escuderia IS NOT NULL",
    (error, results, fields) => {
      if (error) throw error;

      res.json(results);
    }
  );
});

app.get("/escuderias", (req, res) => {
  connection.query(
    "SELECT e.*, COUNT(pg.anno_mundial) AS cantidad_mundiales FROM escuderia e LEFT JOIN piloto_gpmundial pg ON e.id_escuderia = pg.id_escuderia LEFT JOIN piloto p ON pg.ID_piloto = p.ID_piloto WHERE e.director IS NOT NULL GROUP BY e.id_escuderia",
    (error, results, fields) => {
      if (error) throw error;

      res.json(results);
    }
  );
});

app.get("/pilotosFantasy/:id", (req, res) => {
  connection.query(
    "SELECT p.apellido FROM fantasy f INNER JOIN piloto p ON f.id_piloto1 = p.id_piloto OR f.id_piloto2 = p.id_piloto OR f.id_piloto3 = p.id_piloto OR f.id_piloto4 = p.id_piloto OR f.id_piloto5 = p.id_piloto WHERE f.id_fantasy= " +
      req.params.id,
    (error, results, fields) => {
      if (error) throw error;

      res.json(results);
    }
  );
});

app.get("/escuderiasFantasy/:id", (req, res) => {
  connection.query(
    "SELECT e.Nombre_escuderia FROM escuderia e INNER JOIN fantasy f ON e.id_escuderia = f.id_equipo1 OR e.id_escuderia = f.id_equipo2 WHERE f.id_fantasy = " +
      req.params.id,
    (error, results, fields) => {
      if (error) throw error;

      res.json(results);
    }
  );
});

app.get("/ganadores", (req, res) => {
  connection.query(
    "SELECT piloto.*, GROUP_CONCAT(piloto_gpmundial.anno_mundial) AS mundiales FROM piloto, piloto_gpmundial WHERE piloto.id_piloto = piloto_gpmundial.ID_piloto  GROUP BY piloto.Nombre_piloto",
    (error, results, fields) => {
      if (error) throw error;

      res.json(results);
    }
  );
});

app.listen(3000, () => console.log("Servidor iniciado en el puerto 3000"));
