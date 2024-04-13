-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : jeu. 11 avr. 2024 à 02:12
-- Version du serveur :  5.7.31
-- Version de PHP : 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `ecomjava`
--

-- --------------------------------------------------------

--
-- Structure de la table `cart`
--

DROP TABLE IF EXISTS `cart`;
CREATE TABLE IF NOT EXISTS `cart` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `total` double NOT NULL,
  `quantity` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=31 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `cart`
--

INSERT INTO `cart` (`id`, `product_id`, `user_id`, `total`, `quantity`) VALUES
(26, 3, 1, 180, 1);

-- --------------------------------------------------------

--
-- Structure de la table `category`
--

DROP TABLE IF EXISTS `category`;
CREATE TABLE IF NOT EXISTS `category` (
  `cat_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`cat_id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `category`
--

INSERT INTO `category` (`cat_id`, `name`) VALUES
(1, 'Pet food'),
(2, 'Pet accessories'),
(3, 'Toys'),
(4, 'Health and care');

-- --------------------------------------------------------

--
-- Structure de la table `hibernate_sequence`
--

DROP TABLE IF EXISTS `hibernate_sequence`;
CREATE TABLE IF NOT EXISTS `hibernate_sequence` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `hibernate_sequence`
--

INSERT INTO `hibernate_sequence` (`next_val`) VALUES
(27);

-- --------------------------------------------------------

--
-- Structure de la table `orders`
--

DROP TABLE IF EXISTS `orders`;
CREATE TABLE IF NOT EXISTS `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `total` double NOT NULL,
  `quantity` int(11) NOT NULL,
  `fullname` varchar(100) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `orders`
--

INSERT INTO `orders` (`id`, `product_id`, `user_id`, `total`, `quantity`, `fullname`, `address`, `phone`) VALUES
(10, 3, 2, 180, 1, 'ghalia khzami', 'rue oued elmakhazine vn safi', '0818818'),
(9, 3, 1, 180, 1, '', '', ''),
(8, 1, 1, 33, 1, '', '', ''),
(7, 39, 1, 145, 1, '', '', ''),
(11, 40, 2, 134, 1, 'ghalia khzami', 'rue oued elmakhazine vn safi', '0818818'),
(12, 39, 2, 145, 1, 'ghalia khzami', 'rue oued elmakhazine vn safi', '0818818'),
(13, 39, 2, 145, 1, 'ghaliaa', 'rueee', '9999'),
(14, 3, 2, 180, 1, 'lolo', 'ruee', '9999'),
(15, 40, 2, 134, 1, '', '', '');

-- --------------------------------------------------------

--
-- Structure de la table `product`
--

DROP TABLE IF EXISTS `product`;
CREATE TABLE IF NOT EXISTS `product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text,
  `price` double NOT NULL,
  `category` varchar(11) DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=43 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `product`
--

INSERT INTO `product` (`id`, `title`, `description`, `price`, `category`, `stock`, `image_url`, `category_id`) VALUES
(1, 'product1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ', 33, 'Pet food', 0, 'assets/img/food1.jpg', NULL),
(3, 'product3', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ', 180, 'Pet food', 100, 'assets/img/food1.jpg', NULL),
(42, 'test0', 'YYYYYYYYYYYYY', 188, 'PET', 0, 'assets\\img\\petfood1.jpg', NULL),
(39, 'toy cats', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 145, 'Pet Toys', 15, 'assets\\img\\spray-feliway-classic.jpg', NULL),
(40, 'medecine cat', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 134, 'Health care', 98, 'assets\\img\\easypill-chat-gingiva-1.png', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint(20) NOT NULL,
  `email` varchar(120) NOT NULL,
  `email_verification_status` tinyint(1) DEFAULT '0',
  `email_verification_token` varchar(255) DEFAULT NULL,
  `encrypted_password` varchar(255) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `role` varchar(255) DEFAULT 'user',
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_6dotkott2kjsp8vw4d0m25fb7` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `email`, `email_verification_status`, `email_verification_token`, `encrypted_password`, `first_name`, `last_name`, `user_id`, `role`) VALUES
(1, 'elghalia@gmail.com', NULL, NULL, '$2a$10$JAlLoOP.7psUPbmE2qSc8OI3JslvmSupMP3YK9yDXpOWv490g/.Yq', 'ghalia', 'khzami', 'O0j4Ve2I61c5nj8znx9Y2Go4kKX8Hkx0', 'admin'),
(2, 'elghaliatest@gmail.com', NULL, NULL, '$2a$10$JFo9qM8LZneAsLiOV3LymuxDpdmf8UoZXmxmDxVvfvCItXtdF8waW', 'ghalia', 'khzami', 'PbDWCAIXiOXAubf8HDHhTZaq4xCz6Ggf', 'user'),
(6, '123test@gmail.com', NULL, NULL, '$2a$10$6toPYNVfqijc1hDJd.54d.1ZsmlwdJ70P9eGEdxa/uzjWFNBbcwXK', 'test', 'test', 'JLuLBBBXvfLnNi9Vz2BxBNg6vn7x4qKZ', 'user'),
(12, 'ohohotest@gmail.com', NULL, NULL, '$2a$10$qsBSJ039KC3.Ks0pEBLiZuzY5ym90nkIhtHpeUXolxAaNGTk2Fl.K', 'ghalia', 'khzami', 'sSynoQ7fKKLBlyS9BwgUAKhoksK38PXr', 'user'),
(13, 'maria@example.com', NULL, NULL, '$2a$10$2xEC7h31cZLYTzVpUcmlRuluJ.SH4b8AePcBH04pVF43XtRwOpDRq', 'maria', 'omar', '0N6QVZssUnMimxgAxLmk5SWPHSClKSCu', 'user'),
(14, 'alx@gmail.com', NULL, NULL, '$2a$10$2SRrv8yWSgU4JpruAarIyexgZIZuRmO68/TDJ934WlU0Bg/vP/k8K', 'alx', 'alx', 'pJNpkxZuzjr2EDPxzLlLfl2aGaOqRWbr', 'user'),
(23, 'hh@gmail.com', NULL, NULL, '$2a$10$zgCRLs4qEn5HXOVEvY/R9ejv50ZdQYBvYQSM.Vz7HeAaJWg22LYz2', 'hh', 'hh', '7ufdpdE0ARieXY1kJPXLVePFp51x78PW', NULL),
(24, 'hh8@gmail.com', NULL, NULL, '$2a$10$Ku2tGcam8ZDFU7uLX4luJuzq5buBYmEJmsNaO0mIYCB92za9pBnZ6', 'hh', 'hh', 'eAOTDqI04QsGAxFJqVVydDpyVAgroZy2', 'user'),
(25, 'elghaliass@gmail.csom', NULL, NULL, '$2a$10$85VwdOPj3JeEoItBF3VBT.pv6TFOHVVU2ra/cfuZ0vGWAV/cz1n1i', 'sss', 'ss', 'aZS7DYSidjT59oQGymKToDpyKFtS7iUz', 'USER'),
(26, 'test00@gmail.com', NULL, NULL, '$2a$10$5zDx5Tiww7hqx3r5CfmsbOvlINmbw38rW3DIVfQ4DuMK11qkCcQni', 'test', 'test', 'RuUWDeQeXOVmNeieWU4OP78VQJ5HhrTv', 'user');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
