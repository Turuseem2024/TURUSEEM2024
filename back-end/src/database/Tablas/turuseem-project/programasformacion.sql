DROP TABLE IF EXISTS `programasformacion`;

CREATE TABLE `programasformacion` (
    `Id_ProgramaFormacion` int NOT NULL AUTO_INCREMENT,
    `Nom_ProgramaFormacion` varchar(65) NOT NULL,
    `Tip_ProgramaFormacion` varchar(20) DEFAULT 'Tecnologo',
    `Estado` enum('Activo', 'Inactivo') DEFAULT 'Activo',
    `Id_Area` int DEFAULT NULL,
    `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`Id_ProgramaFormacion`),
    KEY `Id_Area` (`Id_Area`),
    CONSTRAINT `programasformacion_ibfk_1` FOREIGN KEY (`Id_Area`) REFERENCES `areas` (`Id_Area`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;