CREATE TABLE `unidades` (
    `Id_Unidad` int AUTO_INCREMENT,
    `Nom_Unidad` varchar(50) NOT NULL,
    `Hor_Apertura` time NOT NULL,
    `Hor_Cierre` time NOT NULL,
    `Estado` enum('Activo', 'Inactivo') NOT NULL,
    `Id_Area` int DEFAULT NULL,
    `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`Id_Unidad`),
    KEY `Id_Area` (`Id_Area`),
    CONSTRAINT `unidades_ibfk_1` FOREIGN KEY (`Id_Area`) REFERENCES `areas` (`Id_Area`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;