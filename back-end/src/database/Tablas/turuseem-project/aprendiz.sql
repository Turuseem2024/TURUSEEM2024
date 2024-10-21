DROP TABLE IF EXISTS `aprendices`;

CREATE TABLE `aprendices` (
    `Id_Aprendiz` varchar(11) NOT NULL,
    `Nom_Aprendiz` varchar(30) NOT NULL,
    `Ape_Aprendiz` varchar(30) NOT NULL,
    `Id_Ficha` varchar(11) NOT NULL,
    `Fec_Nacimiento` date NOT NULL,
    `Gen_Aprendiz` enum('Masculino', 'Femenino', 'Otro') NOT NULL,
    `Cor_Aprendiz` varchar(50) NOT NULL,
    `Tel_Aprendiz` varchar(12) NOT NULL,
    `Tot_Memorandos` int NOT NULL,
    `Tot_Inasistencias` int NOT NULL,
    `Patrocinio` enum('Si', 'No') NOT NULL,
    `CentroConvivencia` enum('Si', 'No') NOT NULL,
    `Estado` enum('Activo', 'Inactivo') DEFAULT 'Activo',
    `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`Id_Aprendiz`),
    KEY `Id_Ficha` (`Id_Ficha`),
    CONSTRAINT `aprendices_ibfk_1` FOREIGN KEY (`Id_Ficha`) REFERENCES `fichas` (`Id_Ficha`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;