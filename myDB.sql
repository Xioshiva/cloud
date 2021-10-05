-- phpMyAdmin SQL Dump
-- version 4.9.7deb1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : mar. 05 oct. 2021 à 14:59
-- Version du serveur :  8.0.26-0ubuntu0.21.04.3
-- Version de PHP : 7.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `myDB`
--

-- --------------------------------------------------------

--
-- Structure de la table `classements`
--

CREATE TABLE `classements` (
  `id` int NOT NULL,
  `message` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  `occurence` int NOT NULL,
  `index` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `classements`
--

INSERT INTO `classements` (`id`, `message`, `occurence`, `index`) VALUES
(1, 'Mardi 34 Juin 2021', 87, 0),
(2, 'Samedi 27 Aout 2021', 45, 0),
(3, 'Dimanche 12 Juillet 2021', 39, 0),
(4, 'Mercredi 17 Septembre 2020', 36, 0),
(5, 'nouvelle entrée', 32, 0),
(6, 'nouvelle entrée', 38, 0),
(7, 'nouvelle entrée', 39, 0),
(8, 'nouvelle entrée', 40, 0),
(9, 'nouvelle entrée', 42, 0),
(10, 'nouvelle entrée', 43, 0),
(11, 'nouvelle entrée', 48, 0),
(12, 'nouvelle entrée', 50, 0),
(13, 'nouvelle entrée', 52, 0),
(14, 'Régulation de trafic', 4367, 1),
(15, 'Train en panne', 3889, 1),
(16, 'Travaux sur les voies', 3781, 1),
(17, 'Embouteillages', 3704, 1),
(18, 'Paris -> Bordeaux', 1023, 2),
(19, 'Lyon -> Strasbourg', 923, 2),
(20, 'Rennes -> Toulouse', 867, 2),
(21, 'Geneve -> Grenoble', 2, 2),
(22, 'Lyon Part Dieu', 23, 4),
(23, 'Paris Montparnasse', 37, 4),
(24, 'Avigon Centre', 23, 4),
(25, 'Bellegarde', 1000000, 4),
(26, 'Geneve Cornavin', 1, 4);

-- --------------------------------------------------------

--
-- Structure de la table `succes`
--

CREATE TABLE `succes` (
  `id` int UNSIGNED NOT NULL DEFAULT '0',
  `message` varchar(128) NOT NULL,
  `id_user` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `succes`
--

INSERT INTO `succes` (`id`, `message`, `id_user`) VALUES
(0, 'Panne de reveil à la hessncf: plus de 2000 heures de retard cumulé', 1),
(0, 'Excuses pourries: L\'excuse Train en panne a été utilisé plus de 500 fois', 2),
(1, 'C\'est pas notre faute: plus de 5000 trains sont arrivés en retard', 1),
(1, 'C\'est pas notre faute: plus de 5000 trains ont été supprimés', 2),
(2, 'Faute avouée à moitié pardonée: plus de 2000 trains ne sont pas arrivés à destination', 1),
(2, 'On fait semblant de travailler: L\'excuse \"Travaux sur la voie\" a été utilisé plus de 500 fois', 2),
(3, 'Doucement le matin, pas trop vite l\'après-midi: plus de 5000 heures de retard', 1),
(3, 'Les cheminots en sueur: L\'excuse \"Embouteillages\" a été utilisé plus de 1000 fois', 2),
(4, 'Pizza ananas = pizza des sous hommes', 1),
(4, 'Un jour historique: plus de 10 jours de retard cumulé en moins de 24 heures', 2),
(5, 'pizza ananas = king', 1);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int NOT NULL,
  `name` varchar(128) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `name`) VALUES
(1, 'Dorian'),
(2, 'Thomas');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `classements`
--
ALTER TABLE `classements`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `succes`
--
ALTER TABLE `succes`
  ADD PRIMARY KEY (`id`,`id_user`),
  ADD KEY `contrainte_user` (`id_user`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `classements`
--
ALTER TABLE `classements`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `succes`
--
ALTER TABLE `succes`
  ADD CONSTRAINT `contrainte_user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
