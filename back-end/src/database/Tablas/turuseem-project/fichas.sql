CREATE TABLE `fichas` (
    `Id_Ficha` varchar(11) NOT NULL,
    `Fec_InicioEtapaLectiva` date NOT NULL,
    `Fec_FinEtapaLectiva` date NOT NULL,
    `Fec_FinEtapaProductiva` date NOT NULL,
    `Can_Aprendices` int NOT NULL,
    `Id_ProgramaFormacion` int DEFAULT NULL,
    `Estado` enum('Activo', 'Inactivo') DEFAULT 'Activo',
    `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`Id_Ficha`),
    KEY `Id_ProgramaFormacion` (`Id_ProgramaFormacion`),
    CONSTRAINT `fichas_ibfk_1` FOREIGN KEY (`Id_ProgramaFormacion`) REFERENCES `programasformacion` (`Id_ProgramaFormacion`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;