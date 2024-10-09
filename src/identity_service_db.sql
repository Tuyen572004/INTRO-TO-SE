CREATE DATABASE `identity_service` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin */ /*!80016 DEFAULT ENCRYPTION='N' */; 

USE `identity_service`;

CREATE TABLE `permissions` (
  `name` varchar(100) COLLATE utf8mb4_bin NOT NULL,
  `description` text COLLATE utf8mb4_bin,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

CREATE TABLE `roles` (
  `name` varchar(100) COLLATE utf8mb4_bin NOT NULL,
  `description` text COLLATE utf8mb4_bin,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

CREATE TABLE `roles_permissions` (
  `role_name` varchar(100) COLLATE utf8mb4_bin NOT NULL,
  `permission_name` varchar(100) COLLATE utf8mb4_bin NOT NULL,
  PRIMARY KEY (`role_name`,`permission_name`),
  KEY `fk_roles_permissions_permission` (`permission_name`),
  CONSTRAINT `fk_roles_permissions_permission` FOREIGN KEY (`permission_name`) REFERENCES `permissions` (`name`),
  CONSTRAINT `fk_roles_permissions_role` FOREIGN KEY (`role_name`) REFERENCES `roles` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;


CREATE TABLE `users` (
  `id` varchar(100) COLLATE utf8mb4_bin NOT NULL,
  `username` varchar(100) COLLATE utf8mb4_bin DEFAULT NULL,
  `password` text COLLATE utf8mb4_bin,
  `email` varchar(100) COLLATE utf8mb4_bin DEFAULT NULL,
  `role_name` varchar(100) COLLATE utf8mb4_bin DEFAULT 'USER',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `fk_users_roles` (`role_name`),
  CONSTRAINT `fk_users_roles` FOREIGN KEY (`role_name`) REFERENCES `roles` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

CREATE TABLE `invalidated_tokens` (
  `access_id` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `refresh_id` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `expiration_time` datetime DEFAULT NULL,
  PRIMARY KEY (`access_id`),
  UNIQUE KEY `refresh_id` (`refresh_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

CREATE TABLE `verify_codes` (
  `verify_code` varchar(100) COLLATE utf8mb4_bin NOT NULL,
  `user_id` varchar(100) COLLATE utf8mb4_bin NOT NULL,
  `expiration_time` datetime DEFAULT NULL,
  PRIMARY KEY (`verify_code`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `fk_verify_codes_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

SET FOREIGN_KEY_CHECKS=0;
