CREATE TABLE `users` (
    `Id_User` int NOT NULL,
    `Nom_User` varchar(40) COLLATE utf8mb4_general_ci NOT NULL,
    `Cor_User` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
    `password` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
    `token` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
    `Confirmado` tinyint(1) NOT NULL DEFAULT '0',
    `Estado` enum('Activo', 'Inactivo') DEFAULT 'Activo',
    `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`Id_User`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;