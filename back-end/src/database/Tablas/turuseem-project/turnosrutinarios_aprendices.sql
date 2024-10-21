DROP TABLE IF EXISTS `turnosrutinarios_aprendices`;

CREATE TABLE `turnosrutinarios_aprendices` (
    `Id_TurnoRutinario_Aprendiz` int NOT NULL AUTO_INCREMENT,
    `Id_TurnoRutinario` int DEFAULT NULL,
    `Id_Aprendiz` varchar(11) NOT NULL,
    `Ind_Asistencia` enum('Si', 'No') DEFAULT 'Si',
    `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`Id_TurnoRutinario_Aprendiz`),
    KEY `Id_TurnoRutinario` (`Id_TurnoRutinario`),
    KEY `Id_Aprendiz` (`Id_Aprendiz`),
    CONSTRAINT `turnosrutinarios_aprendices_ibfk_1` FOREIGN KEY (`Id_TurnoRutinario`) REFERENCES `turnosrutinarios` (`Id_TurnoRutinario`),
    CONSTRAINT `turnosrutinarios_aprendices_ibfk_2` FOREIGN KEY (`Id_Aprendiz`) REFERENCES `aprendices` (`Id_Aprendiz`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;