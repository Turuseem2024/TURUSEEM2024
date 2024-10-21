DROP TABLE IF EXISTS `turnosrutinarios`;

CREATE TABLE `turnosrutinarios` (
    `Id_TurnoRutinario` int NOT NULL AUTO_INCREMENT,
    `Fec_InicioTurno` date NOT NULL,
    `Fec_FinTurno` date NOT NULL,
    `Hor_InicioTurno` time NOT NULL,
    `Hor_FinTurno` time NOT NULL,
    `Obs_TurnoRutinario` varchar(100) NOT NULL,
    `Ind_Asistencia` enum('Si', 'No') DEFAULT 'Si',
    `Id_Aprendiz` varchar(11) NOT NULL,
    `Id_Unidad` int NOT NULL,
    `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`Id_TurnoRutinario`),
    KEY `Id_Aprendiz` (`Id_Aprendiz`),
    KEY `Id_Unidad` (`Id_Unidad`),
    CONSTRAINT `turnosrutinarios_ibfk_1` FOREIGN KEY (`Id_Aprendiz`) REFERENCES `aprendices` (`Id_Aprendiz`) CONSTRAINT `turnosrutinarios_ibfk_1` FOREIGN KEY (`Id_Unidad`) REFERENCES `unidades` (`Id_Unidad`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;