CREATE TABLE `turnosespeciales_aprendices` (
    `Id_TurnoEspecial_Aprendiz` int NOT NULL AUTO_INCREMENT,
    `Id_TurnoEspecial` int NOT NULL,
    `Id_Aprendiz` varchar(11) NOT NULL,
    `Ind_Asistencia` enum('Si', 'No') DEFAULT 'Si',
    `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`Id_TurnoEspecial_Aprendiz`),
    KEY `Id_TurnoEspecial` (`Id_TurnoEspecial`),
    KEY `Id_Aprendiz` (`Id_Aprendiz`),
    CONSTRAINT `turnosespeciales_aprendices_ibfk_1` FOREIGN KEY (`Id_TurnoEspecial`) REFERENCES `turnosespeciales` (`Id_TurnoEspecial`),
    CONSTRAINT `turnosespeciales_aprendices_ibfk_2` FOREIGN KEY (`Id_Aprendiz`) REFERENCES `aprendices` (`Id_Aprendiz`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;