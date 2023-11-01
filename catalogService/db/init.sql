CREATE DATABASE IF NOT EXISTS `catalog`;

USE `catalog`;

CREATE TABLE IF NOT EXISTS `cars` (
  `id` int NOT NULL auto_increment,
  `model` varchar(35),
  `make` varchar(35),
  `type` varchar(35),
  `price` int,
  `img` varchar(255),
  `year` int,
  `history` varchar(255),
  `milage` int,
  PRIMARY KEY(`id`)
);