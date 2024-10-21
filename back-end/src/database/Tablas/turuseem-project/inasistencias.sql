DROP TABLE IF EXISTS `inasistencias`;

CREATE TABLE `inasistencias` (
    `Id_Inasistencia` int AUTO_INCREMENT,
    `Fec_Inasistencia` date NOT NULL,
    `Mot_Inasistencia` varchar(50) NOT NULL,
    `Id_TurnoRutinario_Aprendiz` int DEFAULT NULL,
    `Id_TurnoEspecial_Aprendiz` int DEFAULT NULL,
    `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`Id_Inasistencia`),
    KEY `Id_TurnoRutinario_Aprendiz` (`Id_TurnoRutinario_Aprendiz`),
    KEY `Id_TurnoEspecial_Aprendiz` (`Id_TurnoEspecial_Aprendiz`),
    CONSTRAINT `inasistencias_ibfk_1` FOREIGN KEY (`Id_TurnoRutinario_Aprendiz`) REFERENCES `turnosrutinarios_aprendices` (`Id_TurnoRutinario_Aprendiz`),
    CONSTRAINT `inasistencias_ibfk_2` FOREIGN KEY (`Id_TurnoEspecial_Aprendiz`) REFERENCES `turnosespeciales_aprendices` (`Id_TurnoEspecial_Aprendiz`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;