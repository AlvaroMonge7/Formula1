-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-05-2023 a las 17:28:52
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `formula1`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `circuito`
--

CREATE TABLE `circuito` (
  `id_circuito` int(2) NOT NULL,
  `circuito` varchar(50) NOT NULL,
  `ciudad` varchar(50) NOT NULL,
  `pais` varchar(50) NOT NULL,
  `annoPrimerGP` int(4) NOT NULL,
  `nVueltas` int(2) NOT NULL,
  `distancia` decimal(6,3) NOT NULL,
  `pilotoRecord` int(11) DEFAULT NULL,
  `tiempoRecord` time DEFAULT NULL,
  `annoRecord` int(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `circuito`
--

INSERT INTO `circuito` (`id_circuito`, `circuito`, `ciudad`, `pais`, `annoPrimerGP`, `nVueltas`, `distancia`, `pilotoRecord`, `tiempoRecord`, `annoRecord`) VALUES
(1, 'baréin', 'Sakhir', 'Baréin', 2004, 57, '5.412', 55, '00:01:31', 2005),
(2, 'albert_park', 'Melbourne', 'Australia', 1996, 58, '5.278', 18, '00:01:20', 2023),
(3, 'baku', 'Baku', 'Azerbaiyán', 2016, 51, '6.003', 10, '00:01:43', 2019),
(4, 'hungaroring', 'Budapest', 'Hungria', 1986, 70, '4.381', 16, '00:01:16', 2020),
(5, 'interlagos', 'São Paulo', 'Brasil', 1973, 71, '4.309', 1, '00:01:10', 2018),
(6, 'jeddah', 'Jeddah', 'Arabia Saudi', 2021, 50, '6.174', 16, '00:01:30', 2021),
(7, 'marina_bay', 'Marina Bay', 'Singapur', 2008, 61, '5.063', 11, '00:01:41', 2018),
(8, 'miami', 'Miami', 'USA', 2022, 57, '5.412', 17, '00:01:31', 2022),
(9, 'monaco', 'Montecarlo', 'Monaco', 1950, 78, '3.337', 16, '00:01:12', 2021),
(10, 'monza', 'Monza', 'Italia', 1950, 53, '5.793', 56, '00:01:21', 2004),
(11, 'red_bull_ring', 'Spielberg', 'Austria', 1970, 71, '4.318', 9, '00:01:05', 2020),
(12, 'rodriguez', 'Mexico City', 'Mexico', 2023, 50, '6.120', 1, '00:01:17', 2021),
(13, 'silverstone', 'Silverstone', 'Inglaterra', 1950, 52, '5.891', 17, '00:01:27', 2020),
(14, 'spa', 'Spa', 'Belgica', 1950, 44, '7.004', 1, '00:01:46', 2018),
(15, 'suzuka', 'Suzuka', 'Japon', 1987, 53, '5.807', 16, '00:01:30', 2019),
(16, 'autodromo enzo e dino ferari', 'Imola', 'Italia', 1980, 63, '4.909', 16, '00:01:15', 2020),
(17, 'americas', 'Austin', 'USA', 2012, 56, '5.513', 10, '00:01:36', 2019),
(18, 'villeneuve', 'Montereal', 'Canada', 1978, 70, '4.361', 1, '00:01:13', 2019),
(19, 'yas_marina', 'Abu Dabi', 'Emiratos Arabes', 2009, 58, '5.281', 17, '00:01:26', 2021),
(20, 'zandvoort', 'Zandvoort', 'Paises Bajos', 1952, 72, '4.259', 16, '00:01:11', 2021),
(21, 'las vegas', 'Las Vegas', 'USA', 2023, 50, '6.120', NULL, NULL, NULL),
(22, 'cataluña', 'Montmelo', 'España', 1991, 66, '4.675', NULL, NULL, NULL),
(23, 'lusail international circuit', 'Doha', 'Qatar', 2021, 57, '5.418', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `escuderia`
--

CREATE TABLE `escuderia` (
  `id_escuderia` int(2) NOT NULL,
  `Nombre_escuderia` varchar(255) NOT NULL,
  `director` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `escuderia`
--

INSERT INTO `escuderia` (`id_escuderia`, `Nombre_escuderia`, `director`) VALUES
(1, 'Alfa Romeo', 'Fréderic Vasseur'),
(2, 'Alpha Tauri', 'Franz Tost'),
(3, 'Alpine', 'Otmar Szafnauer'),
(4, 'Aston Martin', 'Mike Krack'),
(5, 'Ferrari ', 'Mattia Binotto'),
(6, 'Hass', 'Günther Steiner'),
(7, 'McLaren', 'Andreas Seidl'),
(8, 'Mercedes', 'Toto Wolff'),
(9, 'Red Bull ', 'Christian Horner'),
(10, 'Williams', 'Jost Capito'),
(11, 'Maserati', NULL),
(12, 'Lancia', NULL),
(13, 'Vanwall', NULL),
(14, 'Cooper Climax', NULL),
(15, 'BRM', NULL),
(16, 'Lotus', NULL),
(17, 'Brabham Repco', NULL),
(18, 'Matra', NULL),
(19, 'Tyrrell', NULL),
(20, 'Benetton', NULL),
(21, 'BrawnGP', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fantasy`
--

CREATE TABLE `fantasy` (
  `id_fantasy` int(2) NOT NULL,
  `id_piloto1` int(2) DEFAULT NULL,
  `id_piloto2` int(2) DEFAULT NULL,
  `id_piloto3` int(2) DEFAULT NULL,
  `id_piloto4` int(2) DEFAULT NULL,
  `id_piloto5` int(2) DEFAULT NULL,
  `id_equipo1` int(2) DEFAULT NULL,
  `id_equipo2` int(2) DEFAULT NULL,
  `puntos` decimal(11,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `fantasy`
--

INSERT INTO `fantasy` (`id_fantasy`, `id_piloto1`, `id_piloto2`, `id_piloto3`, `id_piloto4`, `id_piloto5`, `id_equipo1`, `id_equipo2`, `puntos`) VALUES
(1, 6, 17, 15, 9, 7, 7, 2, '100.50'),
(2, 1, 6, 12, 19, 13, 6, 4, '6.00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `piloto`
--

CREATE TABLE `piloto` (
  `id_piloto` int(2) NOT NULL,
  `Nombre_piloto` varchar(255) DEFAULT NULL,
  `apellido` varchar(50) NOT NULL,
  `dorsal` int(2) DEFAULT NULL,
  `ID_escuderia` int(2) DEFAULT NULL,
  `nacionalidad` varchar(50) NOT NULL,
  `edad` int(2) DEFAULT NULL,
  `precioFantasy` decimal(3,1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `piloto`
--

INSERT INTO `piloto` (`id_piloto`, `Nombre_piloto`, `apellido`, `dorsal`, `ID_escuderia`, `nacionalidad`, `edad`, `precioFantasy`) VALUES
(1, 'Valtteri', 'Bottas', 77, 1, 'Finlandia', 33, '7.7'),
(2, 'Guanyu', 'Zhou', 24, 1, 'China', 23, '4.9'),
(3, 'Yuki', 'Tsunoda', 22, 2, 'Japon', 22, '4.8'),
(4, 'Nykc', 'de Vries', 21, 2, 'Alemania', 28, '4.9'),
(5, 'Esteban', 'Ocon', 31, 3, 'Francia', 26, '9.2'),
(6, 'Pierre ', 'Gasly', 10, 3, 'Francia', 27, '8.1'),
(7, 'Fernando', 'Alonso', 14, 4, 'España', 41, '8.9'),
(8, 'Lance', 'Stroll', 18, 4, 'Canada', 24, '7.6'),
(9, 'Carlos', 'Sainz', 55, 5, 'España', 28, '17.2'),
(10, 'Charles ', 'Lecrec', 16, 5, 'Monaco', 25, '21.1'),
(11, 'Kevin', 'Magnussen', 20, 6, 'Dinamarca', 30, '6.6'),
(12, 'Nico', 'Hulkenberg', 27, 6, 'Alemania', 35, '4.1'),
(13, 'Lando', 'Norris', 4, 7, 'Inglaterra', 23, '11.2'),
(14, 'Oscar', 'Piastri', 81, 7, 'Australia', 21, '6.8'),
(15, 'George', 'Russell', 63, 8, 'Inglaterra', 25, '18.5'),
(16, 'Lewis', 'Hamilton', 44, 8, 'Inglaterra', 38, '23.8'),
(17, 'Max', 'Verstappen', 33, 9, 'Holanda', 25, '27.2'),
(18, 'Sergio', 'Perez', 11, 9, 'Mexico', 33, '18.3'),
(19, 'Logan', 'Sargeant', 2, 10, 'Estados Unidos', 22, '3.8'),
(20, 'Alexander', 'Albon', 23, 10, 'Tailandia', 27, '5.3'),
(55, 'Pedro', 'de la Rosa', NULL, NULL, 'España', NULL, NULL),
(56, 'Bubens', 'Barrichello', NULL, NULL, 'Brasil', NULL, NULL),
(57, 'Nino', 'Fariña', NULL, NULL, 'Italia', NULL, NULL),
(58, 'Juan Manuel', 'Fangio', NULL, NULL, 'Argentina', NULL, NULL),
(59, 'Alberto', 'Ascari', NULL, NULL, 'Italia', NULL, NULL),
(60, 'Mike', 'Hawthorn', NULL, NULL, 'Inglaterra', NULL, NULL),
(61, 'Jack', 'Brabham', NULL, NULL, 'Paises Bajos', NULL, NULL),
(62, 'Phil', 'Hill', NULL, NULL, 'Inglaterra', NULL, NULL),
(63, 'Graham', 'Hill', NULL, NULL, 'Inglaterra', NULL, NULL),
(64, 'Jim', 'Clark', NULL, NULL, 'Inglaterra', NULL, NULL),
(65, 'John', 'Surtees', NULL, NULL, 'Inglaterra', NULL, NULL),
(66, 'Denny', 'Hulme', NULL, NULL, 'Nueva Celanda', NULL, NULL),
(67, 'Jackie', 'Stewart', NULL, NULL, 'Inglaterra', NULL, NULL),
(68, 'Emerson', 'Fittipaldi', NULL, NULL, 'Brasil', NULL, NULL),
(69, 'Niki', 'Lauda', NULL, NULL, 'Austria', NULL, NULL),
(70, 'James', 'Hunt', NULL, NULL, 'Inglaterra', NULL, NULL),
(71, 'Mario', 'Andretti', NULL, NULL, 'Estados Unidos', NULL, NULL),
(72, 'Jody', 'Scheckter', NULL, NULL, 'Sudafrica', NULL, NULL),
(73, 'Alan', 'Jones', NULL, NULL, 'Australia', NULL, NULL),
(74, 'Nelson', 'Piquet', NULL, NULL, 'Brasil', NULL, NULL),
(75, 'Keke', 'Rosberg', NULL, NULL, 'Finlandia', NULL, NULL),
(76, 'Alain', 'Prost', NULL, NULL, 'Francia', NULL, NULL),
(77, 'Ayton', 'Senna', NULL, NULL, 'Brasil', NULL, NULL),
(78, 'Nigel', 'Mansell', NULL, NULL, 'Inglaterra', NULL, NULL),
(79, 'Michael', 'Schumacher', NULL, NULL, 'Alemania', NULL, NULL),
(80, 'Damon', 'Hill', NULL, NULL, 'Inglaterra', NULL, NULL),
(81, 'Jacques', 'Villeneuve', NULL, NULL, 'Canada', NULL, NULL),
(82, 'Mika', 'Häkkinen', NULL, NULL, 'Finlandia', NULL, NULL),
(83, 'Kimi', 'Räikkönen', NULL, NULL, 'Finlandia', NULL, NULL),
(84, 'Jenson', 'Button', NULL, NULL, 'Inglaterra', NULL, NULL),
(85, 'Sebastian', 'Vettel', NULL, NULL, 'Alemania', NULL, NULL),
(86, 'Nico', 'Rosberg', NULL, NULL, 'Alemania', NULL, NULL),
(87, 'Jochen', 'Rindt', NULL, NULL, 'Alemania', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `piloto_gpmundial`
--

CREATE TABLE `piloto_gpmundial` (
  `ID_piloto` int(2) NOT NULL,
  `anno_mundial` int(4) NOT NULL,
  `id_escuderia` int(2) DEFAULT NULL,
  `nombre_escuderia` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `piloto_gpmundial`
--

INSERT INTO `piloto_gpmundial` (`ID_piloto`, `anno_mundial`, `id_escuderia`, `nombre_escuderia`) VALUES
(7, 2005, 3, ''),
(7, 2006, 3, ''),
(16, 2008, 7, ''),
(16, 2014, 8, ''),
(16, 2015, 8, ''),
(16, 2017, 8, ''),
(16, 2018, 8, ''),
(16, 2019, 8, ''),
(16, 2020, 8, ''),
(17, 2021, 9, ''),
(17, 2022, 9, ''),
(57, 1950, 2, ''),
(58, 1951, 2, ''),
(58, 1954, 11, ''),
(58, 1955, 8, ''),
(58, 1956, 12, ''),
(58, 1957, 11, ''),
(59, 1952, 5, ''),
(59, 1953, 5, ''),
(60, 1958, 13, ''),
(61, 1959, 14, ''),
(61, 1960, 14, ''),
(61, 1966, 17, ''),
(62, 1961, 5, ''),
(63, 1962, 15, ''),
(63, 1968, 16, ''),
(64, 1963, 16, ''),
(64, 1965, 15, ''),
(65, 1964, 5, ''),
(66, 1967, 17, ''),
(67, 1969, 18, ''),
(67, 1971, 19, ''),
(67, 1973, 16, ''),
(68, 1972, 16, ''),
(68, 1974, 7, ''),
(69, 1975, 5, ''),
(69, 1977, 5, ''),
(69, 1984, 7, ''),
(70, 1976, 5, ''),
(71, 1978, 16, ''),
(72, 1979, 5, ''),
(73, 1980, 10, ''),
(74, 1981, 10, ''),
(74, 1983, 5, ''),
(74, 1987, 10, ''),
(75, 1982, 5, ''),
(76, 1985, 7, ''),
(76, 1986, 10, ''),
(76, 1989, 7, ''),
(76, 1993, 10, ''),
(77, 1988, 7, ''),
(77, 1990, 7, ''),
(77, 1991, 7, ''),
(78, 1992, 10, ''),
(79, 1994, 20, ''),
(79, 1995, 20, ''),
(79, 2000, 5, ''),
(79, 2001, 5, ''),
(79, 2002, 5, ''),
(79, 2003, 5, ''),
(79, 2004, 5, ''),
(80, 1996, 10, ''),
(81, 1997, 10, ''),
(82, 1998, 7, ''),
(82, 1999, 5, ''),
(83, 2007, 5, ''),
(84, 2009, 21, ''),
(85, 2010, 9, ''),
(85, 2011, 9, ''),
(85, 2012, 9, ''),
(85, 2013, 9, ''),
(86, 2016, 8, ''),
(87, 1970, 16, '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(2) NOT NULL,
  `usuario` varchar(50) NOT NULL,
  `correo` varchar(50) NOT NULL,
  `contrasena` varchar(50) NOT NULL,
  `id_fantasy` int(2) DEFAULT NULL,
  `administrador` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `usuario`, `correo`, `contrasena`, `id_fantasy`, `administrador`) VALUES
(1, 'alvaro', 'alvarovillamuriel@gmail.com', '12345', 1, 1),
(2, 'leire', 'leire@gmail.com', '54321', 2, 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `circuito`
--
ALTER TABLE `circuito`
  ADD PRIMARY KEY (`id_circuito`),
  ADD KEY `pilotoRecord` (`pilotoRecord`);

--
-- Indices de la tabla `escuderia`
--
ALTER TABLE `escuderia`
  ADD PRIMARY KEY (`id_escuderia`);

--
-- Indices de la tabla `fantasy`
--
ALTER TABLE `fantasy`
  ADD PRIMARY KEY (`id_fantasy`),
  ADD KEY `fantasy_ibfk_1` (`id_piloto1`),
  ADD KEY `fantasy_ibfk_2` (`id_piloto2`),
  ADD KEY `fantasy_ibfk_3` (`id_piloto3`),
  ADD KEY `fantasy_ibfk_4` (`id_piloto4`),
  ADD KEY `fantasy_ibfk_5` (`id_piloto5`),
  ADD KEY `fantasy_ibfk_6` (`id_equipo1`),
  ADD KEY `fantasy_ibfk_7` (`id_equipo2`);

--
-- Indices de la tabla `piloto`
--
ALTER TABLE `piloto`
  ADD PRIMARY KEY (`id_piloto`),
  ADD KEY `piloto_ibfk_2` (`ID_escuderia`);

--
-- Indices de la tabla `piloto_gpmundial`
--
ALTER TABLE `piloto_gpmundial`
  ADD PRIMARY KEY (`ID_piloto`,`anno_mundial`),
  ADD KEY `anno_mundial` (`anno_mundial`),
  ADD KEY `id_escuderia` (`id_escuderia`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`),
  ADD KEY `id_fantasy` (`id_fantasy`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `circuito`
--
ALTER TABLE `circuito`
  MODIFY `id_circuito` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de la tabla `escuderia`
--
ALTER TABLE `escuderia`
  MODIFY `id_escuderia` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `fantasy`
--
ALTER TABLE `fantasy`
  MODIFY `id_fantasy` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `piloto`
--
ALTER TABLE `piloto`
  MODIFY `id_piloto` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=88;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `circuito`
--
ALTER TABLE `circuito`
  ADD CONSTRAINT `circuito_ibfk_1` FOREIGN KEY (`pilotoRecord`) REFERENCES `piloto` (`id_piloto`);

--
-- Filtros para la tabla `fantasy`
--
ALTER TABLE `fantasy`
  ADD CONSTRAINT `fantasy_ibfk_1` FOREIGN KEY (`id_piloto1`) REFERENCES `piloto` (`id_piloto`),
  ADD CONSTRAINT `fantasy_ibfk_2` FOREIGN KEY (`id_piloto2`) REFERENCES `piloto` (`id_piloto`),
  ADD CONSTRAINT `fantasy_ibfk_3` FOREIGN KEY (`id_piloto3`) REFERENCES `piloto` (`id_piloto`),
  ADD CONSTRAINT `fantasy_ibfk_4` FOREIGN KEY (`id_piloto4`) REFERENCES `piloto` (`id_piloto`),
  ADD CONSTRAINT `fantasy_ibfk_5` FOREIGN KEY (`id_piloto5`) REFERENCES `piloto` (`id_piloto`),
  ADD CONSTRAINT `fantasy_ibfk_6` FOREIGN KEY (`id_equipo1`) REFERENCES `escuderia` (`id_escuderia`),
  ADD CONSTRAINT `fantasy_ibfk_7` FOREIGN KEY (`id_equipo2`) REFERENCES `escuderia` (`id_escuderia`);

--
-- Filtros para la tabla `piloto`
--
ALTER TABLE `piloto`
  ADD CONSTRAINT `piloto_ibfk_2` FOREIGN KEY (`ID_escuderia`) REFERENCES `escuderia` (`id_escuderia`);

--
-- Filtros para la tabla `piloto_gpmundial`
--
ALTER TABLE `piloto_gpmundial`
  ADD CONSTRAINT `piloto_gpmundial_ibfk_1` FOREIGN KEY (`ID_piloto`) REFERENCES `piloto` (`id_piloto`),
  ADD CONSTRAINT `piloto_gpmundial_ibfk_3` FOREIGN KEY (`id_escuderia`) REFERENCES `escuderia` (`id_escuderia`);

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`id_fantasy`) REFERENCES `fantasy` (`id_fantasy`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
