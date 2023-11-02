CREATE DATABASE IF NOT EXISTS `shoppingCart`;

USE `shoppingCart`;

CREATE TABLE IF NOT EXISTS `carts` (
    `cartId`   int NOT NULL auto_increment,
    `carsIds` varchar(5000),
    PRIMARY KEY(`cartId`)
);