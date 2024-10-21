DROP TABLE IF EXISTS `talento_humano`;

CREATE TABLE `talento_humano` (
    `Id_Talento_Humano` varchar(10) NOT NULL,
    `Nom_Talento_Humano` varchar(30) NOT NULL,
    `Ape_Talento_Humano` varchar(30) NOT NULL,
    `Genero_Talento_Humano` enum('Masculino', 'Femenino', 'Otro') NOT NULL,
    `Cor_Talento_Humano` varchar(30) NOT NULL,
    `Tel_Talento_Humano` varchar(12) NOT NULL,
    `Id_Ficha` varchar(11) NOT NULL,
    `Estado` enum('Activo', 'Inactivo') DEFAULT 'Activo',
    `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`Id_Talento_Humano`),
    KEY `Id_Ficha` (`Id_Ficha`),
    CONSTRAINT `talento_humano_ibfk_1` FOREIGN KEY (`Id_Ficha`) REFERENCES `fichas` (`Id_Ficha`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;