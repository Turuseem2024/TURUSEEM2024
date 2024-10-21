DROP TABLE IF EXISTS `cargos`;

CREATE TABLE `cargos` (
    `Id_Cargo` int AUTO_INCREMENT,
    `Nom_Cargo` varchar(40) NOT NULL,
    `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`Id_Cargo`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;