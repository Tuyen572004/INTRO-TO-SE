CREATE DATABASE `identity_service` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin */ /*!80016 DEFAULT ENCRYPTION='N' */; 

USE `identity_service`;

CREATE TABLE `users` (
	id varchar(100) primary key,
	username TEXT,
    `password` TEXT,
    email TEXT,
    role_name varchar(100)
);

CREATE TABLE `roles` (
	`name` varchar(100) primary key,
    `description` TEXT
);

ALTER TABLE `users` 
ADD CONSTRAINT fk_users_roles
FOREIGN KEY (role_name)
REFERENCES `roles`(`name`)
;

CREATE TABLE `permissions` (
	`name` varchar(100) primary key,
    `description` TEXT
);

CREATE TABLE `roles_permissions` (
	`role_name` varchar(100),
    `permission_name` varchar(100),
    CONSTRAINT pk_roles_permissions PRIMARY KEY (`role_name`, `permission_name`)
);

ALTER TABLE `roles_permissions`
ADD CONSTRAINT fk_roles_permissions_role
FOREIGN KEY (role_name)
REFERENCES roles (`name`);

ALTER TABLE `roles_permissions`
ADD CONSTRAINT fk_roles_permissions_permission
FOREIGN KEY (permission_name)
REFERENCES permissions (`name`);

CREATE TABLE `verify_codes` (
	`verify_code` varchar(100) primary key,
    user_id varchar(100),
    expiration_time DATETIME
);

ALTER TABLE `verify_codes`
ADD CONSTRAINT
UNIQUE(user_id);

ALTER TABLE `verify_codes`
ADD CONSTRAINT fk_verify_codes_user
FOREIGN KEY (user_id)
REFERENCES `users`(id);

CREATE TABLE `invalidated_tokens` (
	`access_id` varchar(255) primary key,
    `refresh_id` varchar(255) unique not null,
    expiration_time DATETIME
)
