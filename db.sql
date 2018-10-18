-- phpMyAdmin SQL Dump
-- version 4.8.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 27, 2018 at 09:16 AM
-- Server version: 10.1.34-MariaDB
-- PHP Version: 7.1.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `deploy`
--

-- --------------------------------------------------------

--
-- Table structure for table `answer`
--

CREATE TABLE `answer` (
  `id_answer` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `question` varchar(50) NOT NULL,
  `answer` int(5) NOT NULL,
  `createdate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `answer`
--

INSERT INTO `answer` (`id_answer`, `id_user`, `question`, `answer`, `createdate`) VALUES
(1, 1, 'How much your saving amount ?', 8000, '2018-07-27 14:14:27'),
(2, 1, 'How much your loan amount ?', 2000, '2018-07-27 14:14:27');

-- --------------------------------------------------------

--
-- Table structure for table `question`
--

CREATE TABLE `question` (
  `id_question` int(11) NOT NULL,
  `question` text,
  `createuser` varchar(20) NOT NULL,
  `createdate` datetime DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `question`
--

INSERT INTO `question` (`id_question`, `question`, `createuser`, `createdate`, `active`) VALUES
(1, 'How much your saving amount ?', 'admin', '2018-07-27 13:10:10', 1),
(2, 'How much your loan amount ?', 'admin', '2018-07-27 13:11:02', 1);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id_user` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `sex` varchar(20) NOT NULL,
  `religion` varchar(15) NOT NULL,
  `address` text NOT NULL,
  `city` varchar(15) NOT NULL,
  `hobby` varchar(150) NOT NULL,
  `about` text NOT NULL,
  `workplace` varchar(100) NOT NULL,
  `workstatus` varchar(20) NOT NULL,
  `nationality` varchar(15) NOT NULL,
  `language` varchar(100) NOT NULL,
  `birthdate` date DEFAULT NULL,
  `email` varchar(150) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `linkedin` varchar(50) NOT NULL,
  `gplus` varchar(50) NOT NULL,
  `createdate` datetime DEFAULT NULL,
  `updatedate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id_user`, `name`, `username`, `password`, `sex`, `religion`, `address`, `city`, `hobby`, `about`, `workplace`, `workstatus`, `nationality`, `language`, `birthdate`, `email`, `phone`, `linkedin`, `gplus`, `createdate`, `updatedate`) VALUES
(1, 'Rangga', 'admin', 'd033e22ae348aeb5660fc2140aec35850c4da997', 'Laki - laki', 'Islam', 'Karangsari Wetan, Gedong Kuning', '', 'Programming', 'About Me', 'Minomartani Sleman', 'Swasta', 'Indonesia', 'Indonesian, Inggris', '1987-08-12', 'mail@mail.com', '08', 'linkedin', 'G+', '2018-07-27 11:00:58', '2018-07-27 14:08:02');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `answer`
--
ALTER TABLE `answer`
  ADD PRIMARY KEY (`id_answer`);

--
-- Indexes for table `question`
--
ALTER TABLE `question`
  ADD PRIMARY KEY (`id_question`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `answer`
--
ALTER TABLE `answer`
  MODIFY `id_answer` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `question`
--
ALTER TABLE `question`
  MODIFY `id_question` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
