DROP TABLE IF EXISTS `funcionarios`;

CREATE TABLE `funcionarios` (
    `Id_Funcionario` varchar(11) NOT NULL,
    `Nom_Funcionario` varchar(25) NOT NULL,
    `Ape_Funcionario` varchar(25) NOT NULL,
    `Genero` enum('Masculino', 'Femenino', 'Otro') NOT NULL,
    `Tel_Funcionario` varchar(12) NOT NULL,
    `Id_Cargo` int NOT NULL,
    `Estado` enum('Activo', 'Inactivo') DEFAULT 'Activo',
    `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`Id_Funcionario`),
    KEY `Id_Cargo` (`Id_Cargo`),
    CONSTRAINT `funcionarios_ibfk_1` FOREIGN KEY (`Id_Cargo`) REFERENCES `cargos` (`Id_Cargo`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;