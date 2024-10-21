DROP TABLE IF EXISTS `archivo_csv`;

CREATE TABLE `archivo_csv` (
    `Id_Archivo_Csv` int AUTO_INCREMENT,
    `Nom_Archivo_Csv` varchar(30) DEFAULT NULL,
    `Archivo_Csv` varchar(35) DEFAULT NULL,
    `Fec_Creacion` date DEFAULT NULL,
    `Estado` enum('Activo', 'Inactivo') DEFAULT 'Activo',
    `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`Id_Archivo_Csv`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;