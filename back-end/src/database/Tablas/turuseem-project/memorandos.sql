DROP TABLE IF EXISTS `memorandos`;

CREATE TABLE `memorandos` (
    `Id_Memorando` int NOT NULL AUTO_INCREMENT,
    `Fec_Memorando` date NOT NULL,
    `Mot_Memorando` varchar(40) DEFAULT NULL,
    `Id_Inasistencia` int NOT NULL,
    `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`Id_Memorando`),
    KEY `Id_Inasistencia` (`Id_Inasistencia`),
    CONSTRAINT `memorandos_ibfk_1` FOREIGN KEY (`Id_Inasistencia`) REFERENCES `inasistencias` (`Id_Inasistencia`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;