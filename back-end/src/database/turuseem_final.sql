-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: turuseem_final
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `aprendices`
--

DROP TABLE IF EXISTS `aprendices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aprendices` (
  `Id_Aprendiz` int NOT NULL,
  `Nom_Aprendiz` varchar(100) DEFAULT NULL,
  `Ape_Aprendiz` varchar(100) DEFAULT NULL,
  `Id_Ficha` int DEFAULT NULL,
  `Fec_Nacimiento` date DEFAULT NULL,
  `Id_Municipio` int DEFAULT NULL,
  `Dir_Residencia` varchar(200) DEFAULT NULL,
  `Edad_Aprendiz` int DEFAULT NULL,
  `Hijos_Aprendiz` enum('Si','No') NOT NULL,
  `Nom_Eps` varchar(100) DEFAULT NULL,
  `Tel_Acudiente` varchar(20) DEFAULT NULL,
  `Gen_Aprendiz` enum('Masculino','Femenino') NOT NULL,
  `Email_Aprendiz` varchar(100) NOT NULL,
  `Email_Institucional_Aprendiz` varchar(100) DEFAULT NULL,
  `Tel_Aprendiz` varchar(20) DEFAULT NULL,
  `Patrocinio` enum('Si','No') NOT NULL,
  `Nom_Empresa` varchar(150) DEFAULT NULL,
  `Centro_Convivencia` enum('Si','No') NOT NULL,
  `Fot_Aprendiz` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id_Aprendiz`),
  KEY `Id_Ficha` (`Id_Ficha`),
  KEY `Id_Municipio` (`Id_Municipio`),
  CONSTRAINT `aprendices_ibfk_1` FOREIGN KEY (`Id_Ficha`) REFERENCES `fichas` (`Id_Ficha`),
  CONSTRAINT `aprendices_ibfk_2` FOREIGN KEY (`Id_Municipio`) REFERENCES `municipios` (`Id_Municipio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aprendices`
--

LOCK TABLES `aprendices` WRITE;
/*!40000 ALTER TABLE `aprendices` DISABLE KEYS */;
/*!40000 ALTER TABLE `aprendices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `areas`
--

DROP TABLE IF EXISTS `areas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `areas` (
  `Id_Area` int NOT NULL,
  `Nom_Area` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`Id_Area`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `areas`
--

LOCK TABLES `areas` WRITE;
/*!40000 ALTER TABLE `areas` DISABLE KEYS */;
/*!40000 ALTER TABLE `areas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `areas_a_areas`
--

DROP TABLE IF EXISTS `areas_a_areas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `areas_a_areas` (
  `Id_Area_A_Area` int NOT NULL AUTO_INCREMENT,
  `Id_Area` int NOT NULL,
  `Area_Asignada` enum('AGRICOLA','AGROINDUSTRIA','GESTION AMBIENTAL','GESTION ADMINISTRATIVA','MECANIZACION','PECUARIA') NOT NULL,
  PRIMARY KEY (`Id_Area_A_Area`),
  KEY `Id_Area` (`Id_Area`),
  CONSTRAINT `areas_a_areas_ibfk_1` FOREIGN KEY (`Id_Area`) REFERENCES `areas` (`Id_Area`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `areas_a_areas`
--

LOCK TABLES `areas_a_areas` WRITE;
/*!40000 ALTER TABLE `areas_a_areas` DISABLE KEYS */;
/*!40000 ALTER TABLE `areas_a_areas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `asistencias`
--

DROP TABLE IF EXISTS `asistencias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `asistencias` (
  `Id_Asistencia` int NOT NULL,
  `Fec_Asistencia` date DEFAULT NULL,
  `Mot_Asistencia` varchar(255) DEFAULT NULL,
  `Ind_Asistencia` enum('SI','NO') NOT NULL,
  `Id_Inasistencia` int DEFAULT NULL,
  PRIMARY KEY (`Id_Asistencia`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asistencias`
--

LOCK TABLES `asistencias` WRITE;
/*!40000 ALTER TABLE `asistencias` DISABLE KEYS */;
/*!40000 ALTER TABLE `asistencias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `departamentos`
--

DROP TABLE IF EXISTS `departamentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departamentos` (
  `Id_Departamento` int NOT NULL,
  `Nom_Departamento` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`Id_Departamento`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departamentos`
--

LOCK TABLES `departamentos` WRITE;
/*!40000 ALTER TABLE `departamentos` DISABLE KEYS */;
/*!40000 ALTER TABLE `departamentos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fichas`
--

DROP TABLE IF EXISTS `fichas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fichas` (
  `Id_Ficha` int NOT NULL,
  `Fec_Inicio_Etapa_lectiva` date DEFAULT NULL,
  `Fec_Fin_Etapa_lectiva` date DEFAULT NULL,
  `Fec_Inicio_Etapa_practica` date DEFAULT NULL,
  `Fec_Fin_Etapa_practica` date DEFAULT NULL,
  `Can_Aprendices` int DEFAULT NULL,
  `Est_Fichas` enum('ACTIVO','INACTIVO') NOT NULL,
  `Id_Programa` int DEFAULT NULL,
  PRIMARY KEY (`Id_Ficha`),
  KEY `Id_Programa` (`Id_Programa`),
  CONSTRAINT `fichas_ibfk_1` FOREIGN KEY (`Id_Programa`) REFERENCES `programas` (`Id_Programa`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fichas`
--

LOCK TABLES `fichas` WRITE;
/*!40000 ALTER TABLE `fichas` DISABLE KEYS */;
/*!40000 ALTER TABLE `fichas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `funcionarios`
--

DROP TABLE IF EXISTS `funcionarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `funcionarios` (
  `Id_Funcionario` int NOT NULL,
  `Nom_Funcionario` varchar(100) DEFAULT NULL,
  `Ape_Funcionario` varchar(100) DEFAULT NULL,
  `Genero` enum('Masculino','Femenino') NOT NULL,
  `Tel_Funcionario` varchar(15) NOT NULL,
  `Est_Funcionario` enum('Activo','Inactivo') NOT NULL,
  `Cor_Funcionarios` varchar(100) DEFAULT NULL,
  `Cargo_Funcionario` enum('Planta','Contratista') NOT NULL,
  PRIMARY KEY (`Id_Funcionario`),
  CONSTRAINT `funcionarios_chk_1` CHECK ((char_length(`Tel_Funcionario`) between 7 and 15))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `funcionarios`
--

LOCK TABLES `funcionarios` WRITE;
/*!40000 ALTER TABLE `funcionarios` DISABLE KEYS */;
/*!40000 ALTER TABLE `funcionarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inasistencias`
--

DROP TABLE IF EXISTS `inasistencias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inasistencias` (
  `Id_Inasistencia` int NOT NULL,
  `Fec_Inasistencia` date DEFAULT NULL,
  `Mot_Inasistencia` varchar(255) DEFAULT NULL,
  `Tip_Inasistencia` enum('Justificada','No Justificada') NOT NULL,
  `Fec_Justificacion` date DEFAULT NULL,
  `Obs_Inasistencia` varchar(255) DEFAULT NULL,
  `Est_Inasistencia` enum('ACTIVO','INACTIVO') NOT NULL,
  PRIMARY KEY (`Id_Inasistencia`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inasistencias`
--

LOCK TABLES `inasistencias` WRITE;
/*!40000 ALTER TABLE `inasistencias` DISABLE KEYS */;
/*!40000 ALTER TABLE `inasistencias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `memorandos`
--

DROP TABLE IF EXISTS `memorandos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `memorandos` (
  `Id_Memorando` int NOT NULL,
  `Fec_Memorando` date DEFAULT NULL,
  `Tot_Memorando` int DEFAULT NULL,
  `Mot_Memorando` enum('Evacion de centro','Comportamiento indebido','inasistencia a turno','inasistencia a centro') NOT NULL,
  `Est_Memorando` enum('ACTIVO','INACTIVO') NOT NULL,
  `Id_Turno` int DEFAULT NULL,
  PRIMARY KEY (`Id_Memorando`),
  KEY `Id_Turno` (`Id_Turno`),
  CONSTRAINT `memorandos_ibfk_1` FOREIGN KEY (`Id_Turno`) REFERENCES `turnos` (`Id_Turno`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `memorandos`
--

LOCK TABLES `memorandos` WRITE;
/*!40000 ALTER TABLE `memorandos` DISABLE KEYS */;
/*!40000 ALTER TABLE `memorandos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `municipios`
--

DROP TABLE IF EXISTS `municipios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `municipios` (
  `Id_Municipio` int NOT NULL,
  `Nom_Municipio` varchar(100) DEFAULT NULL,
  `Id_Departamento` int DEFAULT NULL,
  PRIMARY KEY (`Id_Municipio`),
  KEY `Id_Departamento` (`Id_Departamento`),
  CONSTRAINT `municipios_ibfk_1` FOREIGN KEY (`Id_Departamento`) REFERENCES `departamentos` (`Id_Departamento`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `municipios`
--

LOCK TABLES `municipios` WRITE;
/*!40000 ALTER TABLE `municipios` DISABLE KEYS */;
/*!40000 ALTER TABLE `municipios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parametros`
--

DROP TABLE IF EXISTS `parametros`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `parametros` (
  `Id_Parametro` int NOT NULL AUTO_INCREMENT,
  `Id_User` int NOT NULL,
  `Nom_Parametro` varchar(100) NOT NULL,
  `Val_Parametro` varchar(255) NOT NULL,
  `Des_Parametro` text,
  `Tip_Parametro` enum('TIEMPO','TEXTO','NUMERO','BOOLEAN','ENUM') NOT NULL,
  `Est_Parametro` enum('ACTIVO','INACTIVO') DEFAULT 'ACTIVO',
  `Fecha_Creacion` datetime DEFAULT CURRENT_TIMESTAMP,
  `Fecha_Actualizacion` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_Parametro`),
  KEY `Id_User` (`Id_User`),
  CONSTRAINT `parametros_ibfk_1` FOREIGN KEY (`Id_User`) REFERENCES `users` (`Id_User`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parametros`
--

LOCK TABLES `parametros` WRITE;
/*!40000 ALTER TABLE `parametros` DISABLE KEYS */;
/*!40000 ALTER TABLE `parametros` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `programas`
--

DROP TABLE IF EXISTS `programas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `programas` (
  `Id_Programa` int NOT NULL,
  `Nom_Programa` varchar(100) DEFAULT NULL,
  `Tip_Programa` enum('TECNICO','TECNOLOGO') NOT NULL,
  `Est_Programa` enum('ACTIVO','INACTIVO') NOT NULL,
  PRIMARY KEY (`Id_Programa`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `programas`
--

LOCK TABLES `programas` WRITE;
/*!40000 ALTER TABLE `programas` DISABLE KEYS */;
/*!40000 ALTER TABLE `programas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `turnos`
--

DROP TABLE IF EXISTS `turnos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `turnos` (
  `Id_Turno` int NOT NULL AUTO_INCREMENT,
  `Fec_Inicio_Turno` date DEFAULT NULL,
  `Fec_Fin_Turno` date DEFAULT NULL,
  `Hor_Inicio_Turno` time DEFAULT NULL,
  `Hor_Fin_Turno` time DEFAULT NULL,
  `Obs_Turno` varchar(255) DEFAULT NULL,
  `Id_Asistencia` int DEFAULT NULL,
  `Tip_Turno` enum('Especial','Rutinario') DEFAULT NULL,
  `Id_Turno_Especial` int DEFAULT NULL,
  `Id_Aprendiz` int DEFAULT NULL,
  `Id_Unidad` int DEFAULT NULL,
  PRIMARY KEY (`Id_Turno`),
  KEY `Id_Asistencia` (`Id_Asistencia`),
  KEY `Id_Aprendiz` (`Id_Aprendiz`),
  KEY `Id_Unidad` (`Id_Unidad`),
  CONSTRAINT `turnos_ibfk_1` FOREIGN KEY (`Id_Asistencia`) REFERENCES `asistencias` (`Id_Asistencia`),
  CONSTRAINT `turnos_ibfk_2` FOREIGN KEY (`Id_Aprendiz`) REFERENCES `aprendices` (`Id_Aprendiz`),
  CONSTRAINT `turnos_ibfk_3` FOREIGN KEY (`Id_Unidad`) REFERENCES `unidades` (`Id_Unidad`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `turnos`
--

LOCK TABLES `turnos` WRITE;
/*!40000 ALTER TABLE `turnos` DISABLE KEYS */;
/*!40000 ALTER TABLE `turnos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `unidades`
--

DROP TABLE IF EXISTS `unidades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `unidades` (
  `Id_Unidad` int NOT NULL,
  `Nom_Unidad` varchar(100) DEFAULT NULL,
  `Hora_Apertura` time DEFAULT NULL,
  `Hora_Cierre` time DEFAULT NULL,
  `Est_Unidad` enum('ACTIVO','INACTIVO') NOT NULL,
  `Id_Area` int DEFAULT NULL,
  PRIMARY KEY (`Id_Unidad`),
  KEY `Id_Area` (`Id_Area`),
  CONSTRAINT `unidades_ibfk_1` FOREIGN KEY (`Id_Area`) REFERENCES `areas` (`Id_Area`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `unidades`
--

LOCK TABLES `unidades` WRITE;
/*!40000 ALTER TABLE `unidades` DISABLE KEYS */;
/*!40000 ALTER TABLE `unidades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `Id_User` int NOT NULL,
  `Tipo_Usuario` enum('Talento Humano','Usuario Normal') NOT NULL,
  `Nom_User` varchar(100) NOT NULL,
  `Ape_User` varchar(100) DEFAULT NULL,
  `Genero_User` enum('Masculino','Femenino') DEFAULT NULL,
  `Email_User` varchar(100) NOT NULL,
  `Tel_User` varchar(15) DEFAULT NULL,
  `Password_User` varchar(255) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `confirmado` tinyint(1) DEFAULT NULL,
  `Est_User` enum('ACTIVO','INACTIVO') NOT NULL,
  PRIMARY KEY (`Id_User`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-20 20:22:10
