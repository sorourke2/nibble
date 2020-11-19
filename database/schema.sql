-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: nibble
-- ------------------------------------------------------
-- Server version	8.0.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `dietary_type`
--

DROP TABLE IF EXISTS `dietary_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dietary_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(225) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dietary_type`
--

LOCK TABLES `dietary_type` WRITE;
/*!40000 ALTER TABLE `dietary_type` DISABLE KEYS */;
INSERT INTO `dietary_type` VALUES (1,'keto');
/*!40000 ALTER TABLE `dietary_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `has_created`
--

DROP TABLE IF EXISTS `has_created`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `has_created` (
  `recipes` int NOT NULL,
  `registered_users` int NOT NULL,
  PRIMARY KEY (`recipes`,`registered_users`),
  KEY `has_created_ibfk_2_idx` (`registered_users`),
  CONSTRAINT `has_created_ibfk_1` FOREIGN KEY (`recipes`) REFERENCES `recipe` (`id`),
  CONSTRAINT `has_created_ibfk_2` FOREIGN KEY (`registered_users`) REFERENCES `registered_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `has_created`
--

LOCK TABLES `has_created` WRITE;
/*!40000 ALTER TABLE `has_created` DISABLE KEYS */;
/*!40000 ALTER TABLE `has_created` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `has_dietary_type`
--

DROP TABLE IF EXISTS `has_dietary_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `has_dietary_type` (
  `recipe` int NOT NULL,
  `dietary_type` int NOT NULL,
  PRIMARY KEY (`recipe`,`dietary_type`),
  KEY `has_dietary_type_1_idx` (`dietary_type`),
  CONSTRAINT `has_dietary_type_1` FOREIGN KEY (`recipe`) REFERENCES `recipe` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `has_dietary_type_2` FOREIGN KEY (`dietary_type`) REFERENCES `dietary_type` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `has_dietary_type`
--

LOCK TABLES `has_dietary_type` WRITE;
/*!40000 ALTER TABLE `has_dietary_type` DISABLE KEYS */;
INSERT INTO `has_dietary_type` VALUES (20,1);
/*!40000 ALTER TABLE `has_dietary_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `has_saved`
--

DROP TABLE IF EXISTS `has_saved`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `has_saved` (
  `recipe` int NOT NULL,
  `user` int NOT NULL,
  PRIMARY KEY (`recipe`,`user`),
  KEY `specializes_in_ibfk_2_idx` (`user`),
  CONSTRAINT `has_saved_ibfk_1` FOREIGN KEY (`recipe`) REFERENCES `recipe` (`id`),
  CONSTRAINT `has_saved_ibfk_2` FOREIGN KEY (`user`) REFERENCES `registered_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `has_saved`
--

LOCK TABLES `has_saved` WRITE;
/*!40000 ALTER TABLE `has_saved` DISABLE KEYS */;
/*!40000 ALTER TABLE `has_saved` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ingredient`
--

DROP TABLE IF EXISTS `ingredient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ingredient` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(225) NOT NULL,
  `measurement` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ingredient`
--

LOCK TABLES `ingredient` WRITE;
/*!40000 ALTER TABLE `ingredient` DISABLE KEYS */;
INSERT INTO `ingredient` VALUES (1,'Ingredient1',NULL),(3,'ingredient_1',NULL),(29,'ingredient_1',NULL),(30,'ingredient_1',NULL),(31,'ingredient_2',NULL),(32,'ingredient_1',NULL),(33,'ingredient_2',NULL),(77,'tomato',1);
/*!40000 ALTER TABLE `ingredient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `made_up_of`
--

DROP TABLE IF EXISTS `made_up_of`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `made_up_of` (
  `ingredient` int NOT NULL,
  `recipe` int NOT NULL,
  PRIMARY KEY (`ingredient`,`recipe`),
  KEY `recipe` (`recipe`) /*!80000 INVISIBLE */,
  CONSTRAINT `made_up_of_1` FOREIGN KEY (`recipe`) REFERENCES `recipe` (`id`),
  CONSTRAINT `made_up_of_2` FOREIGN KEY (`ingredient`) REFERENCES `ingredient` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `made_up_of`
--

LOCK TABLES `made_up_of` WRITE;
/*!40000 ALTER TABLE `made_up_of` DISABLE KEYS */;
INSERT INTO `made_up_of` VALUES (29,16),(30,19),(31,19),(32,20),(33,20);
/*!40000 ALTER TABLE `made_up_of` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `measurement`
--

DROP TABLE IF EXISTS `measurement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `measurement` (
  `id` int NOT NULL,
  `name` varchar(225) NOT NULL,
  `unit` varchar(225) DEFAULT NULL,
  `amount` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `measurement`
--

LOCK TABLES `measurement` WRITE;
/*!40000 ALTER TABLE `measurement` DISABLE KEYS */;
/*!40000 ALTER TABLE `measurement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recipe`
--

DROP TABLE IF EXISTS `recipe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recipe` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(225) NOT NULL,
  `difficulty` varchar(225) DEFAULT NULL,
  `cooking_method` varchar(225) DEFAULT NULL,
  `serving_size` int DEFAULT NULL,
  `cuisine` varchar(225) DEFAULT NULL,
  `minutes_to_make` varchar(45) DEFAULT NULL,
  `image_source` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recipe`
--

LOCK TABLES `recipe` WRITE;
/*!40000 ALTER TABLE `recipe` DISABLE KEYS */;
INSERT INTO `recipe` VALUES (1,'spaghetti 2.0',NULL,NULL,NULL,NULL,NULL,NULL),(2,'Recipe1',NULL,NULL,NULL,NULL,NULL,NULL),(5,'spaghetti 2.0',NULL,NULL,NULL,NULL,NULL,NULL),(7,'recipe 4',NULL,NULL,NULL,NULL,NULL,NULL),(8,'recipe 4',NULL,NULL,NULL,NULL,NULL,NULL),(10,'recipe 4',NULL,NULL,NULL,NULL,NULL,NULL),(11,'recipe 4',NULL,NULL,NULL,NULL,NULL,NULL),(13,'recipe 4',NULL,NULL,NULL,NULL,NULL,NULL),(16,'recipe 4',NULL,NULL,NULL,NULL,NULL,NULL),(19,'recipe 4',NULL,NULL,NULL,NULL,NULL,NULL),(20,'recipe 4',NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `recipe` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `registered_user`
--

DROP TABLE IF EXISTS `registered_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `registered_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(225) DEFAULT NULL,
  `password` varchar(225) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `registered_user`
--

LOCK TABLES `registered_user` WRITE;
/*!40000 ALTER TABLE `registered_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `registered_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `unregistered_user`
--

DROP TABLE IF EXISTS `unregistered_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `unregistered_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `unregistered_user`
--

LOCK TABLES `unregistered_user` WRITE;
/*!40000 ALTER TABLE `unregistered_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `unregistered_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'nibble'
--

--
-- Dumping routines for database 'nibble'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-11-19 18:39:29
