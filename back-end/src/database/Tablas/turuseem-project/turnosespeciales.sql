DROP TABLE IF EXISTS `turnosespeciales`;

CREATE TABLE `turnosespeciales` (
    `Id_TurnoEspecial` int AUTO_INCREMENT,
    `Fec_TurnoEspecial` date NOT NULL,
    `Hor_Inicio` time NOT NULL,
    `Hor_Fin` time NOT NULL,
    `Obs_TurnoEspecial` varchar(100) NOT NULL,
    `Id_Ficha` varchar(11) NOT NULL,
    `Img_Asistencia` varchar(50) DEFAULT NULL,
    `Id_Funcionario` varchar(11) NOT NULL,
    `Id_Unidad` int NOT NULL,
    `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`Id_TurnoEspecial`),
    KEY `Id_Ficha` (`Id_Ficha`),
    KEY `Id_Funcionario` (`Id_Funcionario`),
    KEY `Id_Unidad` (`Id_Unidad`),
    CONSTRAINT `turnosespeciales_ibfk_1` FOREIGN KEY (`Id_Ficha`) REFERENCES `fichas` (`Id_Ficha`),
    CONSTRAINT `turnosespeciales_ibfk_2` FOREIGN KEY (`Id_Funcionario`) REFERENCES `funcionarios` (`Id_Funcionario`),
    CONSTRAINT `turnosespeciales_ibfk_3` FOREIGN KEY (`Id_Unidad`) REFERENCES `unidades` (`Id_Unidad`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;