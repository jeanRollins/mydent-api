-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 10-05-2021 a las 15:25:23
-- Versión del servidor: 5.7.33-cll-lve
-- Versión de PHP: 7.3.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `alohaweb_mydent`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `campanas`
--

CREATE TABLE `campanas` (
  `id` int(11) NOT NULL,
  `rut_usuario` varchar(20) NOT NULL,
  `body` text NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(500) NOT NULL,
  `tipo` int(11) NOT NULL,
  `fecha_creado` datetime NOT NULL,
  `fecha_lanzamiento` datetime NOT NULL,
  `estado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `campanas`
--

INSERT INTO `campanas` (`id`, `rut_usuario`, `body`, `nombre`, `descripcion`, `tipo`, `fecha_creado`, `fecha_lanzamiento`, `estado`) VALUES
(29, '181913878', '09474d7815e86d7c7a7e7192270ca79a618f35eb75d41c8fb8c91a2e12d327d612e5f9c1e031b12cccf454aaa9c847a547ee1d5c1599c641e383ec4a72d92022cdcf0e3fad6ca2e9a3c1a02ed935c7e83105d7f202e6286558a49c8aa0553ff90153e95ed1e81a84d9f2b159c6dc0450dc2d3fb284be406063d0dc6b434c490ed0ad14a0ea1fb5457635c918e50a1322cb980f276b7648555a6588cf60e10b9fddf1557110216693b617d0684925114e5d9a1d1fba455817faedb581db2a124ad7820783463919188e9b217c5549a7a629510183dd4d082959b26e71eb64219a07136a24a3c5877fbc57b1310e0bb8b105624727cb05f6', 'Limpieza 20% descuento', 'Limpieza 20% descuento para persona mayo 60 años.', 1, '2021-02-17 19:28:14', '2021-02-17 19:31:05', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `campanas_estado`
--

CREATE TABLE `campanas_estado` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `campanas_estado`
--

INSERT INTO `campanas_estado` (`id`, `nombre`) VALUES
(1, 'Creada'),
(2, 'Lanzado'),
(3, 'Enviada');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `campanas_pacientes`
--

CREATE TABLE `campanas_pacientes` (
  `id` int(11) NOT NULL,
  `id_campana` int(11) NOT NULL,
  `rut_paciente` varchar(20) NOT NULL,
  `fecha_creacion` datetime NOT NULL,
  `estado` int(11) NOT NULL,
  `fecha_envio` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `campanas_pacientes`
--

INSERT INTO `campanas_pacientes` (`id`, `id_campana`, `rut_paciente`, `fecha_creacion`, `estado`, `fecha_envio`) VALUES
(24, 29, '76892407', '2021-02-17 19:31:05', 2, '2021-02-17 19:35:03'),
(25, 29, '271121903', '2021-02-17 19:31:05', 2, '2021-02-17 19:35:04');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `dicom`
--

CREATE TABLE `dicom` (
  `id` int(11) NOT NULL,
  `rut_usuario` varchar(20) NOT NULL,
  `rut_paciente` varchar(20) NOT NULL,
  `url` varchar(100) NOT NULL,
  `date` datetime NOT NULL,
  `titulo` text NOT NULL,
  `descripcion` text NOT NULL,
  `token` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `documentos`
--

CREATE TABLE `documentos` (
  `id` int(11) NOT NULL,
  `url` text NOT NULL,
  `descripcion` text NOT NULL,
  `tipo` text NOT NULL,
  `rut_usuario` varchar(10) NOT NULL DEFAULT '',
  `rut_paciente` varchar(10) NOT NULL DEFAULT '',
  `nombre` text NOT NULL,
  `created` date DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `especialidades`
--

CREATE TABLE `especialidades` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `codigo` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `especialidades`
--

INSERT INTO `especialidades` (`id`, `name`, `codigo`) VALUES
(1, 'Periodoncia', 'periodonci'),
(2, 'General', 'general'),
(3, 'Odontopediatría', 'odontopedi'),
(4, 'Cirujía', 'cirujia'),
(5, 'Ortodoncia', 'ortodoncia'),
(6, 'Prótesis fija', 'protesis-f'),
(7, 'Prótesis removible', 'protesis-r'),
(8, 'Implantes', 'implantes'),
(9, 'Endodoncia', 'endodoncia');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `especialidades_tratamiento`
--

CREATE TABLE `especialidades_tratamiento` (
  `id` int(11) NOT NULL,
  `id_especialidad` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `codigo` varchar(10) NOT NULL,
  `class` varchar(20) NOT NULL,
  `type` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `especialidades_tratamiento`
--

INSERT INTO `especialidades_tratamiento` (`id`, `id_especialidad`, `nombre`, `codigo`, `class`, `type`) VALUES
(1, 1, 'Revision cuadrante', 'cuadrante', '', 'no-mark'),
(2, 1, 'Control Gingivitis', 'gingivitis', '', 'no-mark'),
(3, 1, 'Control Limpieza general ', 'control-li', '', 'no-mark'),
(4, 4, 'Extracción  simple', 'extraccion', 'extractSimple', 'piece'),
(5, 4, 'Extracción  compleja', 'extraccion', 'extractComplex', 'piece'),
(6, 3, 'Extracción  temporal', 'extraccion', 'extractTemporal', 'piece'),
(7, 3, 'Tapadura temporal', 'tapadura-t', 'tapaduraTemporal', 'sector'),
(8, 2, 'Limpieza general ', 'limpieza-g', '', 'no-mark'),
(9, 2, 'Barniz flúor', 'barniz-flu', '', 'no-mark'),
(10, 2, 'Composite', 'composite', 'composite', 'sector'),
(11, 2, 'Ionómero simple', 'ionomero-s', 'ionomeroSimple', 'piece'),
(12, 8, 'Implante Tratamiento', 'implante-t', 'ionomeroSimple', 'piece'),
(13, 8, 'Valor  implante', 'valor-impl', '', 'no-mark'),
(14, 8, 'Control Implante', 'control-im', '', 'no-mark'),
(15, 3, 'Instrucción de higiene', 'instruccio', '', 'no-mark'),
(16, 3, 'Extracción  pulpar', 'extraccion', 'extractTemporal', 'piece'),
(17, 5, 'Ortodoncia tratamiento', 'ortodoncia', '', 'no-mark'),
(18, 3, 'Control Ortodoncia', 'control-or', '', 'no-mark'),
(19, 3, 'Insumos', 'insumos', '', 'no-mark'),
(20, 6, 'Protésis fija unitaria', 'protesis-f', 'ionomeroSimple', 'piece'),
(21, 6, 'Protésis temporal', 'protesis-t', 'ionomeroSimple', 'piece'),
(22, 6, 'Casquete porcelana', 'casquete-p', 'ionomeroSimple', 'piece'),
(23, 6, 'Insumos laboratorio', 'insumos la', '', 'no-mark'),
(24, 7, 'Protésis Valplas', 'protesis-v', '', 'no-mark'),
(25, 7, 'Prótesis removible metálica', 'protesis-r', '', 'no-mark'),
(26, 7, 'Prótesis acrílica', 'protesis-a', '', 'no-mark'),
(27, 7, 'Insumos laboratorio prótesis', 'insumos-pr', '', 'no-mark'),
(28, 2, 'Otros valores', 'otros-valo', '', 'no-mark'),
(29, 9, 'Endodoncia diente Anterior', 'endodoncia', 'ionomeroSimple', 'piece'),
(30, 9, 'Endodoncia Premolar', 'endodoncia', 'ionomeroSimple', 'piece'),
(31, 9, 'Endodoncia Molar', 'enodoncia-', 'ionomeroSimple', 'piece'),
(32, 9, 'Control endodoncia', 'control-en', 'ionomeroSimple', 'piece'),
(33, 2, 'Control general', 'control-ge', '', 'no-mark'),
(34, 2, 'Urgencia', 'urgencia', '', 'no-mark');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial`
--

CREATE TABLE `historial` (
  `id` int(11) NOT NULL,
  `rut_usuario` varchar(12) NOT NULL,
  `rut_paciente` varchar(12) NOT NULL,
  `diente` int(11) DEFAULT NULL,
  `fecha` datetime NOT NULL,
  `historial` varchar(2000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `historial`
--

INSERT INTO `historial` (`id`, `rut_usuario`, `rut_paciente`, `diente`, `fecha`, `historial`) VALUES
(28, '181913878', '76892407', 1, '2021-02-17 19:37:30', 'd0c0037a8482f468f9cefb74305347a22f5dd8dc9085ba341aeeb470d5b74e755e6a9130a45908f7c32aecdf267acb43f62a9b46d612d191f71d94ba1ee413b152ed91c16fe2c748f833c5775ef6d69446e06116890ab944eaebd8cc64913356323bd8b14a9c7beb108ea860c85160f1646770a18fe4aa3cdc');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `horas`
--

CREATE TABLE `horas` (
  `id` int(11) NOT NULL,
  `codigo_hora` varchar(25) NOT NULL,
  `rut_paciente` varchar(20) NOT NULL,
  `rut_usuario` varchar(20) NOT NULL,
  `fecha` date NOT NULL,
  `hora` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `horas`
--

INSERT INTO `horas` (`id`, `codigo_hora`, `rut_paciente`, `rut_usuario`, `fecha`, `hora`) VALUES
(47, '41wedFeb17022021', '76892407', '181913878', '2021-02-17', '20:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `horas_detalle`
--

CREATE TABLE `horas_detalle` (
  `id` int(11) NOT NULL,
  `codigo_hora` varchar(30) NOT NULL,
  `observacion` text NOT NULL,
  `estado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `horas_detalle`
--

INSERT INTO `horas_detalle` (`id`, `codigo_hora`, `observacion`, `estado`) VALUES
(49, '41wedFeb17022021', '', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `horas_estados`
--

CREATE TABLE `horas_estados` (
  `id` int(11) NOT NULL,
  `nombre` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `horas_estados`
--

INSERT INTO `horas_estados` (`id`, `nombre`) VALUES
(1, 'Asignado'),
(2, 'Atendido');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pacientes`
--

CREATE TABLE `pacientes` (
  `id` int(11) NOT NULL,
  `nombres` varchar(100) NOT NULL,
  `apellido_materno` varchar(40) NOT NULL,
  `apellido_paterno` varchar(40) NOT NULL,
  `prevision` int(11) NOT NULL,
  `rut` varchar(70) NOT NULL,
  `correo` varchar(50) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `estado` int(11) NOT NULL,
  `creado` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `pacientes`
--

INSERT INTO `pacientes` (`id`, `nombres`, `apellido_materno`, `apellido_paterno`, `prevision`, `rut`, `correo`, `fecha_nacimiento`, `estado`, `creado`) VALUES
(32, 'Luisa ', 'Robles', 'Salazar', 1, '76892407', 'jean.nafre@gmail.com', '2021-02-17', 1, '2021-02-17 19:08:34'),
(33, 'Carlos', 'Duque', 'Duque', 3, '271121903', 'cduque@ciisa.cl', '2021-02-04', 1, '2021-02-17 19:30:28');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pacientes_ficha`
--

CREATE TABLE `pacientes_ficha` (
  `rut` varchar(20) NOT NULL,
  `grupo_sanguineo` varchar(20) DEFAULT NULL,
  `medicamentos` varchar(1000) DEFAULT NULL,
  `estatura` varchar(40) DEFAULT NULL,
  `observaciones` varchar(2000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `pacientes_ficha`
--

INSERT INTO `pacientes_ficha` (`rut`, `grupo_sanguineo`, `medicamentos`, `estatura`, `observaciones`) VALUES
('271121903', '', '', '', ''),
('76892407', '', '', '', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `presupuestos`
--

CREATE TABLE `presupuestos` (
  `id` int(11) NOT NULL,
  `rut_paciente` varchar(20) NOT NULL,
  `rut_usuario` varchar(20) NOT NULL,
  `fecha_creacion` datetime NOT NULL,
  `estado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `presupuestos`
--

INSERT INTO `presupuestos` (`id`, `rut_paciente`, `rut_usuario`, `fecha_creacion`, `estado`) VALUES
(38, '76892407', '181913878', '2021-02-17 19:24:31', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `presupuestos_item`
--

CREATE TABLE `presupuestos_item` (
  `id` int(11) NOT NULL,
  `id_prespuesto` int(11) NOT NULL,
  `diente` int(11) NOT NULL,
  `cara` varchar(20) NOT NULL,
  `id_tratamiento` int(11) NOT NULL,
  `fecha_realizado` datetime NOT NULL,
  `estado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `presupuestos_item`
--

INSERT INTO `presupuestos_item` (`id`, `id_prespuesto`, `diente`, `cara`, `id_tratamiento`, `fecha_realizado`, `estado`) VALUES
(22, 38, 0, '', 73, '0000-00-00 00:00:00', 1),
(23, 38, 4, 'center', 76, '0000-00-00 00:00:00', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `presupuestos_tratamientos`
--

CREATE TABLE `presupuestos_tratamientos` (
  `id` int(11) NOT NULL,
  `rut_usuario` varchar(20) NOT NULL,
  `id_tratamiento` int(11) NOT NULL,
  `valor` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `presupuestos_tratamientos`
--

INSERT INTO `presupuestos_tratamientos` (`id`, `rut_usuario`, `id_tratamiento`, `valor`) VALUES
(73, '181913878', 8, 32990),
(75, '181913878', 9, 29900),
(76, '181913878', 10, 22990);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `prevision`
--

CREATE TABLE `prevision` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `prevision`
--

INSERT INTO `prevision` (`id`, `name`) VALUES
(1, 'Fonasa'),
(2, 'Cruz Blanca'),
(3, 'Colmena'),
(4, 'Banmedica'),
(5, 'Consalud'),
(6, 'Masvida'),
(7, 'Vida tres');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `test`
--

CREATE TABLE `test` (
  `id` int(11) NOT NULL,
  `name` varchar(11) NOT NULL,
  `rut` varchar(25) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `test`
--

INSERT INTO `test` (`id`, `name`, `rut`) VALUES
(1, '45554', '45544554'),
(2, '45454', '544554');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `rut` varchar(20) NOT NULL,
  `nombres` varchar(70) NOT NULL,
  `apellido_materno` varchar(70) NOT NULL,
  `apellido_paterno` varchar(70) NOT NULL,
  `email` varchar(40) NOT NULL,
  `token` varchar(100) NOT NULL,
  `ultimo_acceso` datetime NOT NULL,
  `email_verificacion` varchar(50) NOT NULL,
  `password` varchar(500) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `status` int(11) NOT NULL,
  `created` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `rut`, `nombres`, `apellido_materno`, `apellido_paterno`, `email`, `token`, `ultimo_acceso`, `email_verificacion`, `password`, `fecha_nacimiento`, `status`, `created`) VALUES
(39, '181913878', 'Jean Luis', '', '', 'nafre.jean@gmail.com', 'TOKEN_9owtg5aWxA1Oal67WkWzOG36TgPi250ZN9aoOGP7nBuIFRgfyk', '2021-05-07 01:29:50', 'MAIL_Sd4pSGExX2fANfgBnmeXuhZJ2kKHkgqPCIQIINoZRXWF', 'b494ca9fcc0248e5b439964fc1496604b2a3ae13a477419147408bcaa93a13496781c136eaebaf9d8cde5e7caa7dde50c46751d849c58c7cc8d9f2c67f5828ad8a9a70db4647052becfe610dd08ee0b4f5a802888e7661afb1f6bca96e1fa447c86c87132790e4', '0000-00-00', 1, '2021-02-17 19:04:28'),
(60, '146892191', 'luis fernando', '', '', 'ltapia1717@gmail.com', 'TOKEN_XkxBySRJtdGRvOsuqpZsTJgPNnWnXzIGrMX314dUkwWSORnp4g', '2021-05-07 17:43:29', 'MAIL_pulbxMJ9wqaP32SMo3fgIuwWg4UyXVubOTmT10J3hFDa', '71f796f6d2ce2c8f537393a84174c45dfdb20988177e4a1ccf7d705c7222d60be7ef166098e308e40c726e9b0c14d8af31cbf15ea330c4122858f4241059fcc5529b5cf7a98a22773c8dd18295a13b04fa4ab819add6a79b0a60de4fa7fcd1da251f88802b5051', '0000-00-00', 1, '2021-05-07 17:41:35');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios_detalle`
--

CREATE TABLE `usuarios_detalle` (
  `rut` varchar(20) NOT NULL,
  `ano_agresado` int(11) NOT NULL,
  `id_colegio_medico` varchar(20) NOT NULL,
  `lugar_egresado` varchar(70) NOT NULL,
  `especialidad` varchar(100) NOT NULL,
  `comentarios` varchar(5000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario_pacientes`
--

CREATE TABLE `usuario_pacientes` (
  `id` int(11) NOT NULL,
  `rut_usuario` varchar(20) NOT NULL,
  `rut_paciente` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuario_pacientes`
--

INSERT INTO `usuario_pacientes` (`id`, `rut_usuario`, `rut_paciente`) VALUES
(24, '181913878', '76892407'),
(25, '181913878', '271121903');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `campanas`
--
ALTER TABLE `campanas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `rut_usuario` (`rut_usuario`),
  ADD KEY `estado` (`estado`);

--
-- Indices de la tabla `campanas_estado`
--
ALTER TABLE `campanas_estado`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `campanas_pacientes`
--
ALTER TABLE `campanas_pacientes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `rut_paciente` (`rut_paciente`),
  ADD KEY `id_campana` (`id_campana`);

--
-- Indices de la tabla `dicom`
--
ALTER TABLE `dicom`
  ADD PRIMARY KEY (`id`),
  ADD KEY `rut_usuario` (`rut_usuario`),
  ADD KEY `rut_paciente` (`rut_paciente`);

--
-- Indices de la tabla `documentos`
--
ALTER TABLE `documentos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `especialidades`
--
ALTER TABLE `especialidades`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `especialidades_tratamiento`
--
ALTER TABLE `especialidades_tratamiento`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_especialidad` (`id_especialidad`);

--
-- Indices de la tabla `historial`
--
ALTER TABLE `historial`
  ADD PRIMARY KEY (`id`),
  ADD KEY `rut_usuario` (`rut_usuario`),
  ADD KEY `rut_paciente` (`rut_paciente`);

--
-- Indices de la tabla `horas`
--
ALTER TABLE `horas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `codigo_hora` (`codigo_hora`),
  ADD KEY `rut_usuario` (`rut_usuario`),
  ADD KEY `rut_paciente` (`rut_paciente`);

--
-- Indices de la tabla `horas_detalle`
--
ALTER TABLE `horas_detalle`
  ADD PRIMARY KEY (`id`),
  ADD KEY `estado` (`estado`),
  ADD KEY `codigo_hora` (`codigo_hora`);

--
-- Indices de la tabla `horas_estados`
--
ALTER TABLE `horas_estados`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `rut` (`rut`),
  ADD KEY `prevision` (`prevision`);

--
-- Indices de la tabla `pacientes_ficha`
--
ALTER TABLE `pacientes_ficha`
  ADD PRIMARY KEY (`rut`);

--
-- Indices de la tabla `presupuestos`
--
ALTER TABLE `presupuestos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `rut_usuario` (`rut_usuario`),
  ADD KEY `rut_paciente` (`rut_paciente`);

--
-- Indices de la tabla `presupuestos_item`
--
ALTER TABLE `presupuestos_item`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_prespuesto` (`id_prespuesto`),
  ADD KEY `id_tratamiento` (`id_tratamiento`);

--
-- Indices de la tabla `presupuestos_tratamientos`
--
ALTER TABLE `presupuestos_tratamientos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `rut_usuario` (`rut_usuario`),
  ADD KEY `id_tratamiento_2` (`id_tratamiento`) USING BTREE,
  ADD KEY `id_tratamiento` (`id_tratamiento`) USING BTREE;

--
-- Indices de la tabla `prevision`
--
ALTER TABLE `prevision`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `test`
--
ALTER TABLE `test`
  ADD PRIMARY KEY (`id`),
  ADD KEY `rut` (`rut`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `rut` (`rut`),
  ADD KEY `rut_2` (`rut`);

--
-- Indices de la tabla `usuarios_detalle`
--
ALTER TABLE `usuarios_detalle`
  ADD PRIMARY KEY (`rut`),
  ADD KEY `rut` (`rut`);

--
-- Indices de la tabla `usuario_pacientes`
--
ALTER TABLE `usuario_pacientes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `rut_usuario` (`rut_usuario`),
  ADD KEY `rut_paciente` (`rut_paciente`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `campanas`
--
ALTER TABLE `campanas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT de la tabla `campanas_estado`
--
ALTER TABLE `campanas_estado`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `campanas_pacientes`
--
ALTER TABLE `campanas_pacientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de la tabla `dicom`
--
ALTER TABLE `dicom`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `documentos`
--
ALTER TABLE `documentos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT de la tabla `especialidades`
--
ALTER TABLE `especialidades`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `especialidades_tratamiento`
--
ALTER TABLE `especialidades_tratamiento`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT de la tabla `historial`
--
ALTER TABLE `historial`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT de la tabla `horas`
--
ALTER TABLE `horas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT de la tabla `horas_detalle`
--
ALTER TABLE `horas_detalle`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT de la tabla `horas_estados`
--
ALTER TABLE `horas_estados`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT de la tabla `presupuestos`
--
ALTER TABLE `presupuestos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT de la tabla `presupuestos_item`
--
ALTER TABLE `presupuestos_item`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de la tabla `presupuestos_tratamientos`
--
ALTER TABLE `presupuestos_tratamientos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- AUTO_INCREMENT de la tabla `prevision`
--
ALTER TABLE `prevision`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `test`
--
ALTER TABLE `test`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT de la tabla `usuario_pacientes`
--
ALTER TABLE `usuario_pacientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `campanas`
--
ALTER TABLE `campanas`
  ADD CONSTRAINT `campanas_ibfk_1` FOREIGN KEY (`rut_usuario`) REFERENCES `usuarios` (`rut`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `campanas_ibfk_2` FOREIGN KEY (`estado`) REFERENCES `campanas_estado` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `campanas_pacientes`
--
ALTER TABLE `campanas_pacientes`
  ADD CONSTRAINT `campanas_pacientes_ibfk_1` FOREIGN KEY (`rut_paciente`) REFERENCES `pacientes` (`rut`) ON DELETE CASCADE,
  ADD CONSTRAINT `campanas_pacientes_ibfk_2` FOREIGN KEY (`id_campana`) REFERENCES `campanas` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `dicom`
--
ALTER TABLE `dicom`
  ADD CONSTRAINT `dicom_ibfk_1` FOREIGN KEY (`rut_paciente`) REFERENCES `pacientes` (`rut`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `dicom_ibfk_2` FOREIGN KEY (`rut_usuario`) REFERENCES `usuarios` (`rut`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Filtros para la tabla `especialidades_tratamiento`
--
ALTER TABLE `especialidades_tratamiento`
  ADD CONSTRAINT `especialidades_tratamiento_ibfk_1` FOREIGN KEY (`id_especialidad`) REFERENCES `especialidades` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `historial`
--
ALTER TABLE `historial`
  ADD CONSTRAINT `historial_ibfk_1` FOREIGN KEY (`rut_usuario`) REFERENCES `usuarios` (`rut`) ON DELETE CASCADE,
  ADD CONSTRAINT `historial_ibfk_2` FOREIGN KEY (`rut_paciente`) REFERENCES `pacientes` (`rut`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `horas`
--
ALTER TABLE `horas`
  ADD CONSTRAINT `horas_ibfk_1` FOREIGN KEY (`rut_usuario`) REFERENCES `usuarios` (`rut`) ON DELETE CASCADE,
  ADD CONSTRAINT `horas_ibfk_3` FOREIGN KEY (`rut_paciente`) REFERENCES `pacientes` (`rut`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `horas_ibfk_4` FOREIGN KEY (`codigo_hora`) REFERENCES `horas_detalle` (`codigo_hora`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `horas_detalle`
--
ALTER TABLE `horas_detalle`
  ADD CONSTRAINT `horas_detalle_ibfk_1` FOREIGN KEY (`estado`) REFERENCES `horas_estados` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Filtros para la tabla `pacientes`
--
ALTER TABLE `pacientes`
  ADD CONSTRAINT `pacientes_ibfk_1` FOREIGN KEY (`prevision`) REFERENCES `prevision` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `pacientes_ficha`
--
ALTER TABLE `pacientes_ficha`
  ADD CONSTRAINT `pacientes_ficha_ibfk_1` FOREIGN KEY (`rut`) REFERENCES `pacientes` (`rut`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `presupuestos`
--
ALTER TABLE `presupuestos`
  ADD CONSTRAINT `presupuestos_ibfk_1` FOREIGN KEY (`rut_paciente`) REFERENCES `pacientes` (`rut`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `presupuestos_ibfk_2` FOREIGN KEY (`rut_usuario`) REFERENCES `usuarios` (`rut`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Filtros para la tabla `presupuestos_item`
--
ALTER TABLE `presupuestos_item`
  ADD CONSTRAINT `presupuestos_item_ibfk_1` FOREIGN KEY (`id_prespuesto`) REFERENCES `presupuestos` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `presupuestos_item_ibfk_2` FOREIGN KEY (`id_tratamiento`) REFERENCES `presupuestos_tratamientos` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Filtros para la tabla `presupuestos_tratamientos`
--
ALTER TABLE `presupuestos_tratamientos`
  ADD CONSTRAINT `presupuestos_tratamientos_ibfk_3` FOREIGN KEY (`id_tratamiento`) REFERENCES `especialidades_tratamiento` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `presupuestos_tratamientos_ibfk_4` FOREIGN KEY (`rut_usuario`) REFERENCES `usuarios` (`rut`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuario_pacientes`
--
ALTER TABLE `usuario_pacientes`
  ADD CONSTRAINT `usuario_pacientes_ibfk_1` FOREIGN KEY (`rut_paciente`) REFERENCES `pacientes` (`rut`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `usuario_pacientes_ibfk_2` FOREIGN KEY (`rut_usuario`) REFERENCES `usuarios` (`rut`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
