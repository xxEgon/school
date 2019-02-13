-- phpMyAdmin SQL Dump
-- version 3.3.9
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Czas wygenerowania: 30 Paź 2017, 19:49
-- Wersja serwera: 5.5.8
-- Wersja PHP: 5.3.5

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Baza danych: `dfilipowski`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla  `loginy`
--

CREATE TABLE IF NOT EXISTS `loginy` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `login` varchar(50) CHARACTER SET utf8 NOT NULL,
  `pass` varchar(150) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Zrzut danych tabeli `loginy`
--

INSERT INTO `loginy` (`id`, `login`, `pass`) VALUES
(1, 'a', '86f7e437faa5a7fce15d1ddcb9eaeaea377667b8'),
(2, 'b', 'e9d71f5ee7c92d6dc9e92ffdad17b8bd49418f98');
