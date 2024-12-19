CREATE DATABASE  IF NOT EXISTS "testing" /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `testing`;
-- MySQL dump 10.13  Distrib 8.1.0, for Win64 (x86_64)
--
-- Host: hairsalon-hoapri123-95dd.b.aivencloud.com    Database: testing
-- ------------------------------------------------------
-- Server version	8.0.30

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
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '7fbf54aa-bdf9-11ef-bd1e-e6de3384be71:1-431';

--
-- Table structure for table `appointments`
--

DROP TABLE IF EXISTS `appointments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appointments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `date` datetime NOT NULL,
  `start_time` datetime NOT NULL,
  `estimated_end_time` datetime NOT NULL,
  `final_price` int NOT NULL,
  `status` enum('pending','confirmed','completed','cancelled') NOT NULL DEFAULT 'pending',
  `voucher_id` int DEFAULT NULL,
  `user_id` int NOT NULL,
  `employee_id` int NOT NULL,
  `branch_id` int NOT NULL,
  `service_id` int NOT NULL,
  `feedback_id` int DEFAULT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  KEY `FK_7753c5ccee755df99641e7c8dff` (`voucher_id`),
  KEY `FK_66dee3bea82328659a4db8e54b7` (`user_id`),
  KEY `FK_f4e3a19c74dac65a223368fa9a0` (`employee_id`),
  KEY `FK_fc5d925c8972ba27457e23e7c09` (`branch_id`),
  KEY `FK_2a2088e8eaa8f28d8de2bdbb857` (`service_id`),
  CONSTRAINT `FK_2a2088e8eaa8f28d8de2bdbb857` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`),
  CONSTRAINT `FK_66dee3bea82328659a4db8e54b7` FOREIGN KEY (`user_id`) REFERENCES `customers` (`user_id`),
  CONSTRAINT `FK_7753c5ccee755df99641e7c8dff` FOREIGN KEY (`voucher_id`) REFERENCES `vouchers` (`id`),
  CONSTRAINT `FK_f4e3a19c74dac65a223368fa9a0` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`),
  CONSTRAINT `FK_fc5d925c8972ba27457e23e7c09` FOREIGN KEY (`branch_id`) REFERENCES `branches` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointments`
--

LOCK TABLES `appointments` WRITE;
/*!40000 ALTER TABLE `appointments` DISABLE KEYS */;
INSERT INTO `appointments` VALUES (1,'Combo 5xx','2021-09-01 00:00:00','2021-09-01 08:00:00','2021-09-01 09:00:00',99000,'cancelled',1,13,1,1,1,1,'2024-12-19 13:02:56.033710','2024-12-19 16:15:19.000000'),(2,'Cat toc','2024-12-19 13:05:16','2024-12-19 14:00:00','2024-12-19 14:30:00',100000,'cancelled',NULL,12,1,1,1,NULL,'2024-12-19 13:04:42.039827','2024-12-19 13:04:42.039000'),(3,'Chăm sóc tóc chuyên sâu','2024-12-19 13:07:05','2024-12-19 13:40:00','2024-12-19 14:55:00',300000,'completed',NULL,12,3,1,8,NULL,'2024-12-19 13:07:33.006357','2024-12-19 13:38:49.000000'),(4,'Cắt tóc nam','2024-12-19 13:09:12','2024-12-19 14:00:00','2024-12-19 14:30:00',69000,'completed',NULL,12,14,2,2,NULL,'2024-12-19 13:08:37.743085','2024-12-19 13:38:55.000000'),(5,'Cat toc','2024-12-19 13:13:11','2024-12-19 14:00:00','2024-12-19 14:30:00',100000,'completed',NULL,12,13,2,1,NULL,'2024-12-19 13:12:31.709976','2024-12-19 13:38:59.000000'),(6,'Cat toc','2024-12-19 13:13:28','2024-12-19 13:20:00','2024-12-19 13:50:00',100000,'cancelled',NULL,12,13,2,1,NULL,'2024-12-19 13:12:50.686537','2024-12-19 15:52:41.000000'),(7,'Cat toc','2024-12-20 06:00:00','2024-12-20 06:00:00','2024-12-20 06:30:00',90000,'cancelled',11,13,3,1,1,NULL,'2024-12-19 13:51:56.361820','2024-12-19 18:29:00.000000'),(8,'Cat toc','2024-12-20 01:00:00','2024-12-20 00:20:00','2024-12-20 00:50:00',100000,'cancelled',NULL,17,3,1,1,NULL,'2024-12-19 14:39:13.558854','2024-12-19 16:05:43.000000'),(9,'Uốn tóc','2024-12-20 01:00:00','2024-12-20 03:00:00','2024-12-20 05:00:00',350000,'cancelled',NULL,14,15,2,3,NULL,'2024-12-19 14:47:38.328623','2024-12-19 16:23:03.000000'),(10,'Nhuộm tóc','2024-12-20 01:00:00','2024-12-20 03:20:00','2024-12-20 04:50:00',280000,'confirmed',NULL,17,3,1,4,NULL,'2024-12-19 14:49:34.315376','2024-12-19 17:26:24.000000'),(11,'Cắt tóc nam','2024-12-20 01:00:00','2024-12-20 01:20:00','2024-12-20 01:50:00',69000,'cancelled',NULL,14,3,1,2,NULL,'2024-12-19 15:02:43.368932','2024-12-19 16:11:29.000000'),(12,'Cắt tóc nam','2024-12-20 01:00:00','2024-12-20 14:00:00','2024-12-20 14:30:00',69000,'pending',NULL,14,3,1,2,NULL,'2024-12-19 16:04:04.713858','2024-12-19 16:04:04.713858'),(13,'Cắt tóc nam','2024-12-20 01:00:00','2024-12-20 03:20:00','2024-12-20 03:50:00',0,'cancelled',NULL,14,13,2,2,NULL,'2024-12-19 16:04:31.033000','2024-12-19 16:04:31.033000'),(14,'Cắt tóc nam','2024-12-19 17:39:32','2024-12-20 04:40:00','2024-12-20 05:10:00',69000,'pending',NULL,14,13,2,2,NULL,'2024-12-19 17:38:51.247676','2024-12-19 17:38:51.247676'),(15,'Phục hồi tóc hư tổn','2024-12-19 17:45:16','2024-12-20 00:40:00','2024-12-20 01:45:00',250000,'cancelled',NULL,17,14,2,5,NULL,'2024-12-19 17:45:19.210738','2024-12-19 18:16:20.000000'),(19,'Uốn tóc','2024-12-21 01:00:00','2024-12-21 01:00:00','2024-12-21 03:00:00',280000,'pending',2,13,5,1,3,NULL,'2024-12-19 17:57:07.988828','2024-12-19 17:57:07.988828'),(20,'Cắt tóc nam','2024-12-19 17:58:15','2024-12-20 04:00:00','2024-12-20 04:30:00',69000,'confirmed',NULL,18,13,2,2,NULL,'2024-12-19 17:58:38.879396','2024-12-19 18:01:50.000000'),(21,'Cắt tóc nam','2024-12-20 01:00:00','2024-12-20 04:20:00','2024-12-20 04:50:00',69000,'pending',NULL,20,13,2,2,NULL,'2024-12-19 18:13:22.522444','2024-12-19 18:13:43.000000'),(22,'Phục hồi tóc hư tổn','2024-12-20 01:20:35','2024-12-20 11:00:00','2024-12-20 12:05:00',250000,'cancelled',NULL,17,13,2,5,NULL,'2024-12-19 18:20:41.826235','2024-12-19 18:22:19.000000'),(23,'Cắt tóc nam','2024-12-19 18:21:45','2024-12-20 14:00:00','2024-12-20 14:30:00',62100,'pending',1,13,3,1,2,NULL,'2024-12-19 18:21:49.911173','2024-12-19 18:21:49.911173');
/*!40000 ALTER TABLE `appointments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `branches`
--

DROP TABLE IF EXISTS `branches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `branches` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `status` tinyint NOT NULL,
  `picture_url` varchar(255) DEFAULT NULL,
  `long` decimal(11,8) NOT NULL DEFAULT '1.23456789',
  `lat` decimal(11,8) NOT NULL DEFAULT '1.23456789',
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_8387ed27b3d4ca53ec3fc7b029` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `branches`
--

LOCK TABLES `branches` WRITE;
/*!40000 ALTER TABLE `branches` DISABLE KEYS */;
INSERT INTO `branches` VALUES (1,'Trần Duy Hưng','Số 117 Trần Duy Hưng, quận Cầu Giấy, Hà Nội','0987654321','tranduyhung_4f@mail.com',1,NULL,105.79842400,21.00888500,'2024-12-19 11:52:39.517774','2024-12-19 11:52:39.517774',NULL),(2,'Phố Cổ','Số 36 Hàng Bông, quận Hoàn Kiếm, Hà Nội','0987654322','phoco_4f@mail.com',1,NULL,105.85027300,21.03285600,'2024-12-19 11:52:39.517774','2024-12-19 11:52:39.517774',NULL),(3,'Nguyễn Trãi','Số 335 Nguyễn Trãi, quận Thanh Xuân, Hà Nội','0987654323','nguyentraihanoi_4f@mail.com',1,NULL,105.80848700,20.99457400,'2024-12-19 11:52:39.517774','2024-12-19 11:52:39.517774',NULL),(4,'Kim Mã','Số 543 Kim Mã, quận Ba Đình, Hà Nội','0987654324','kimma_4f@mail.com',1,NULL,105.81775600,21.03265400,'2024-12-19 11:52:39.517774','2024-12-19 11:52:39.517774',NULL),(5,'Cầu Giấy','Số 302 Cầu Giấy, quận Cầu Giấy, Hà Nội','0987654325','caugiay_4f@mail.com',1,NULL,105.79983500,21.03421600,'2024-12-19 11:52:39.517774','2024-12-19 11:52:39.517774',NULL),(6,'Láng Hạ','Số 8 Láng Hạ, quận Ba Đình, Hà Nội','0987654326','langha_4f@mail.com',1,NULL,105.81666600,21.01666600,'2024-12-19 11:52:39.517774','2024-12-19 11:52:39.517774',NULL),(7,'Tràng Tiền','Số 24 Tràng Tiền, quận Hoàn Kiếm, Hà Nội','0987654327','trangtien_4f@mail.com',1,NULL,105.85444600,21.02492700,'2024-12-19 11:52:39.517774','2024-12-19 11:52:39.517774',NULL),(8,'Thái Thịnh','Số 106 Thái Thịnh, quận Đống Đa, Hà Nội','0987654328','thaithinh_4f@mail.com',1,NULL,105.81666600,21.01666600,'2024-12-19 11:52:39.517774','2024-12-19 11:52:39.517774',NULL),(9,'Hoàng Cầu','Số 36 Hoàng Cầu, quận Đống Đa, Hà Nội','0987654329','hoangcau_4f@mail.com',1,NULL,105.82284500,21.01769800,'2024-12-19 11:52:39.517774','2024-12-19 11:52:39.517774',NULL),(10,'Xã Đàn','Số 222 Xã Đàn, quận Đống Đa, Hà Nội','0987654330','xadan_4f@mail.com',1,NULL,105.83333600,21.01666600,'2024-12-19 11:52:39.517774','2024-12-19 11:52:39.517774',NULL);
/*!40000 ALTER TABLE `branches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `gender` enum('Male','Female','Secret') DEFAULT NULL,
  `booking_count` int NOT NULL DEFAULT '0',
  `cancel_count` int NOT NULL DEFAULT '0',
  `points` int NOT NULL DEFAULT '0',
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_8536b8b85c06969f84f0c098b0` (`email`),
  UNIQUE KEY `REL_11d81cd7be87b6f8865b0cf766` (`user_id`),
  CONSTRAINT `FK_11d81cd7be87b6f8865b0cf7661` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (1,'An Nguyễn','vietannv617@gmail.com',NULL,NULL,5,0,0,12),(2,'Lê Vũ Việt Anh','vietanhlevu2004@gmail.com',NULL,NULL,3,2,117399,13),(3,'dfs','example@gmail.com','fsf',NULL,5,0,0,14),(4,'22021217 Lý Hồng Đức','22021217@vnu.edu.vn',NULL,NULL,4,1,9999,17),(5,'Nguyễn Sinh Hùng','monternsh@gmail.com',NULL,NULL,1,0,0,18),(6,'Hoa Bui Van','hoapri123@gmail.com',NULL,NULL,1,0,0,20);
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employees`
--

DROP TABLE IF EXISTS `employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employees` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `work_position` varchar(255) NOT NULL,
  `status` tinyint NOT NULL DEFAULT '1',
  `overall_rating` float NOT NULL DEFAULT '0',
  `number_of_ratings` int NOT NULL DEFAULT '0',
  `big_avatar_url` varchar(255) DEFAULT NULL,
  `small_avatar_url` varchar(255) DEFAULT NULL,
  `branch_id` int NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_457a39c666de2686596e502eb8c` (`branch_id`),
  CONSTRAINT `FK_457a39c666de2686596e502eb8c` FOREIGN KEY (`branch_id`) REFERENCES `branches` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=103 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
INSERT INTO `employees` VALUES (1,'PC01','email@gmail.com','0912487918','stylist',1,0,0,NULL,NULL,2,'2024-12-19 12:03:09.260516','2024-12-19 13:18:52.000000','2024-12-19 13:18:52.000000'),(2,'Lý Hồng Đức','lyduck_4f@gmail.com','0986786321','stylist',1,0,0,NULL,NULL,1,'2024-12-19 12:06:53.646901','2024-12-19 13:19:42.000000','2024-12-19 13:19:42.000000'),(3,'Nguyễn Văn Anh','vananh.nguyen@gmail.com','0987654321','stylist',1,0,0,'https://assets.zyrosite.com/mePnvZ15VEHy7n8p/chinh3-mk39q5PEnxuPj4zq.jpg',NULL,1,'2024-12-19 12:14:09.470622','2024-12-19 17:17:43.997747',NULL),(4,'Trần Đức Bo','ducbo.tran@gmail.com','0912345678','stylist',1,0,0,'https://assets.zyrosite.com/mePnvZ15VEHy7n8p/canh-m5KbLrq72aU69ovZ.jpg',NULL,1,'2024-12-19 12:14:09.470622','2024-12-19 17:19:21.767187',NULL),(5,'Lê Minh Huy','minhhuy.le@gmail.com','0909876543','stylist',1,0,0,'https://assets.zyrosite.com/mePnvZ15VEHy7n8p/vu-d95g7rJv7lcgnOM2.jpg',NULL,1,'2024-12-19 12:14:09.470622','2024-12-19 17:19:21.897832',NULL),(6,'Phạm Hoàng Long','hoanglong.pham@gmail.com','0976543210','stylist',1,0,0,'https://assets.zyrosite.com/mePnvZ15VEHy7n8p/thien-AR0bMVxZ6pIX81xr.jpg',NULL,1,'2024-12-19 12:14:09.470622','2024-12-19 17:19:22.025814',NULL),(7,'Đỗ Duy Mạnh','duymanh.do@gmail.com','0934567890','stylist',1,0,0,'https://assets.zyrosite.com/mePnvZ15VEHy7n8p/thao-mp89q7Z0POTRyoeE.jpg',NULL,1,'2024-12-19 12:14:09.470622','2024-12-19 17:19:22.155345',NULL),(8,'Vũ Văn Thanh','vanthanh.vu@gmail.com','0965432109','stylist',1,0,0,'https://assets.zyrosite.com/mePnvZ15VEHy7n8p/phong-dWxbB07P2kf1aXLn.jpg',NULL,1,'2024-12-19 12:14:09.470622','2024-12-19 17:19:22.292778',NULL),(9,'Bùi Tiến Dũng','tiendung.bui@gmail.com','0923456789','stylist',1,0,0,'https://assets.zyrosite.com/mePnvZ15VEHy7n8p/kien-YX4bazv8xEhzQKLx.jpg',NULL,1,'2024-12-19 12:14:09.470622','2024-12-19 17:19:22.423717',NULL),(10,'Nguyễn Quang Hải','quanghai.nguyen@gmail.com','0954321098','stylist',1,0,0,'https://assets.zyrosite.com/mePnvZ15VEHy7n8p/hung-Y4LJxpzyWKszba0V.jpg',NULL,1,'2024-12-19 12:14:09.470622','2024-12-19 17:19:22.551854',NULL),(11,'Lương Xuân Trường','xuantruong.luong@gmail.com','0913579246','stylist',1,0,0,'https://assets.zyrosite.com/mePnvZ15VEHy7n8p/hoan-dJo45NM72GhGxeoZ.jpg',NULL,1,'2024-12-19 12:14:09.470622','2024-12-19 17:19:22.680415',NULL),(12,'Phan Văn Đức','vanduc.phan@gmail.com','0982468135','stylist',1,0,0,'https://assets.zyrosite.com/mePnvZ15VEHy7n8p/duy-YZ9bxXq4jNSaJzK7.jpg',NULL,1,'2024-12-19 12:14:09.470622','2024-12-19 17:19:22.809765',NULL),(13,'Nguyễn Công Phượng','congphuong.nguyen@gmail.com','0907894561','stylist',1,0,0,NULL,NULL,2,'2024-12-19 12:14:09.470622','2024-12-19 12:14:09.470622',NULL),(14,'Trần Đình Trọng','dinhtrong.tran@gmail.com','0963258741','stylist',1,0,0,NULL,NULL,2,'2024-12-19 12:14:09.470622','2024-12-19 12:14:09.470622',NULL),(15,'Đỗ Hùng Dũng','hungdung.do@gmail.com','0927419856','stylist',1,0,0,NULL,NULL,2,'2024-12-19 12:14:09.470622','2024-12-19 12:14:09.470622',NULL),(16,'Nguyễn Tuấn Anh','tuananh.nguyen@gmail.com','0951896324','stylist',1,0,0,NULL,NULL,2,'2024-12-19 12:14:09.470622','2024-12-19 12:14:09.470622',NULL),(17,'Phạm Đức Huy','duchuy.pham@gmail.com','0916325784','stylist',1,0,0,NULL,NULL,2,'2024-12-19 12:14:09.470622','2024-12-19 12:14:09.470622',NULL),(18,'Hà Đức Chinh','ducchinh.ha@gmail.com','0984753159','stylist',1,0,0,NULL,NULL,2,'2024-12-19 12:14:09.470622','2024-12-19 12:14:09.470622',NULL),(19,'Nguyễn Văn Toàn','vantoan.nguyen@gmail.com','0938159624','stylist',1,0,0,NULL,NULL,2,'2024-12-19 12:14:09.470622','2024-12-19 12:14:09.470622',NULL),(20,'Đoàn Văn Hậu','vanhau.doan@gmail.com','0962487531','stylist',1,0,0,NULL,NULL,2,'2024-12-19 12:14:09.470622','2024-12-19 12:14:09.470622',NULL),(21,'Nguyễn Tiến Linh','tienlinh.nguyen@gmail.com','0925814796','stylist',1,0,0,NULL,NULL,2,'2024-12-19 12:14:09.470622','2024-12-19 12:14:09.470622',NULL),(22,'Nguyễn Hoàng Đức','hoangduc.nguyen@gmail.com','0953698741','stylist',1,0,0,NULL,NULL,2,'2024-12-19 12:14:09.470622','2024-12-19 12:14:09.470622',NULL),(23,'Trần Minh Vương','minhvuong.tran@gmail.com','0918246357','stylist',1,0,0,NULL,NULL,3,'2024-12-19 12:14:09.470622','2024-12-19 12:14:09.470622',NULL),(24,'Bùi Hoàng Việt Anh','vietanh.buihoang@gmail.com','0985713694','stylist',1,0,0,NULL,NULL,3,'2024-12-19 12:14:09.470622','2024-12-19 12:14:09.470622',NULL),(25,'Nguyễn Thành Chung','thanhchung.nguyen@gmail.com','0939486217','stylist',1,0,0,NULL,NULL,3,'2024-12-19 12:14:09.470622','2024-12-19 12:14:09.470622',NULL),(26,'Phan Tuấn Tài','tuantai.phan@gmail.com','0964258713','stylist',1,0,0,NULL,NULL,3,'2024-12-19 12:14:09.470622','2024-12-19 12:14:09.470622',NULL),(27,'Hồ Tấn Tài','tantai.ho@gmail.com','0921745986','stylist',1,0,0,NULL,NULL,3,'2024-12-19 12:14:09.470622','2024-12-19 12:14:09.470622',NULL),(28,'Lý Công Hoàng Anh','hoanganh.lycong@gmail.com','0956321478','stylist',1,0,0,NULL,NULL,3,'2024-12-19 12:14:09.470622','2024-12-19 12:14:09.470622',NULL),(29,'Nguyễn Thanh Bình','thanhbinh.nguyen@gmail.com','0912874563','stylist',1,0,0,NULL,NULL,3,'2024-12-19 12:14:09.470622','2024-12-19 12:14:09.470622',NULL),(30,'Dương Thanh Hào','thanhhao.duong@gmail.com','0983697412','stylist',1,0,0,NULL,NULL,3,'2024-12-19 12:14:09.470622','2024-12-19 12:14:09.470622',NULL),(31,'Trương Văn Thiết','vanthiet.truong@gmail.com','0937145896','stylist',1,0,0,NULL,NULL,3,'2024-12-19 12:14:09.470622','2024-12-19 12:14:09.470622',NULL),(32,'Nguyễn Phong Hồng Duy','hongduy.nguyenphong@gmail.com','0961478523','stylist',1,0,0,NULL,NULL,3,'2024-12-19 12:14:09.470622','2024-12-19 12:14:09.470622',NULL),(33,'Phạm Tuấn Hải','tuanhai.pham@gmail.com','0926847159','stylist',1,0,0,NULL,NULL,4,'2024-12-19 12:14:09.470622','2024-12-19 12:14:09.470622',NULL),(34,'Châu Ngọc Quang','ngocquang.chau@gmail.com','0954789632','stylist',1,0,0,NULL,NULL,4,'2024-12-19 12:14:09.470622','2024-12-19 12:14:09.470622',NULL),(35,'Triệu Việt Hưng','viethung.trieu@gmail.com','0913654789','stylist',1,0,0,NULL,NULL,4,'2024-12-19 12:14:09.470622','2024-12-19 12:14:09.470622',NULL),(36,'Nguyễn Hữu Tuấn','huutuan.nguyen@gmail.com','0982541789','stylist',1,0,0,NULL,NULL,4,'2024-12-19 12:14:09.470622','2024-12-19 12:14:09.470622',NULL),(37,'Mạc Hồng Quân','hongquan.mac@gmail.com','0936874125','stylist',1,0,0,NULL,NULL,4,'2024-12-19 12:14:09.470622','2024-12-19 12:14:09.470622',NULL),(38,'Nguyễn Huy Hùng','huyhung.nguyen@gmail.com','0965238741','stylist',1,0,0,NULL,NULL,4,'2024-12-19 12:14:09.470622','2024-12-19 12:14:09.470622',NULL),(39,'Ngô Hoàng Thịnh','hoangthinh.ngo@gmail.com','0921478569','stylist',1,0,0,NULL,NULL,4,'2024-12-19 12:14:09.470622','2024-12-19 12:14:09.470622',NULL),(40,'Phạm Xuân Mạnh','xuanmanh.pham@gmail.com','0958741236','stylist',1,0,0,NULL,NULL,4,'2024-12-19 12:14:09.470622','2024-12-19 12:14:09.470622',NULL),(41,'Đặng Văn Lâm','vanlam.dang@gmail.com','0917458963','stylist',1,0,0,NULL,NULL,4,'2024-12-19 12:14:09.470622','2024-12-19 12:14:09.470622',NULL),(42,'Trần Nguyên Mạnh','nguyenmanh.tran@gmail.com','0984125874','stylist',1,0,0,NULL,NULL,4,'2024-12-19 12:14:09.470622','2024-12-19 12:14:09.470622',NULL),(43,'Quế Ngọc Hải','ngochai.que@gmail.com','0932658741','stylist',1,0,0,NULL,NULL,5,'2024-12-19 12:14:09.470622','2024-12-19 12:14:09.470622',NULL),(44,'Nguyễn Trọng Hoàng','tronghoang.nguyen@gmail.com','0968471596','stylist',1,0,0,NULL,NULL,5,'2024-12-19 12:14:09.470622','2024-12-19 12:14:09.470622',NULL),(45,'Vũ Minh Tuấn','minhtuan.vu@gmail.com','0923789456','stylist',1,0,0,NULL,NULL,5,'2024-12-19 12:14:09.470622','2024-12-19 12:14:09.470622',NULL),(46,'Nghiêm Xuân Tú','xuantu.nghiem@gmail.com','0951478963','stylist',1,0,0,NULL,NULL,5,'2024-12-19 12:14:09.470622','2024-12-19 12:14:09.470622',NULL),(47,'Đinh Thanh Trung','thanhtrung.dinh@gmail.com','0916842579','stylist',1,0,0,NULL,NULL,5,'2024-12-19 12:14:09.470622','2024-12-19 12:14:09.470622',NULL),(48,'Nguyễn Anh Đức','anhduc.nguyen@gmail.com','0985369741','stylist',1,0,0,NULL,NULL,5,'2024-12-19 12:14:09.470622','2024-12-19 12:14:09.470622',NULL),(49,'Phan Thanh Hậu','thanhhau.phan@gmail.com','0934785214','stylist',1,0,0,NULL,NULL,5,'2024-12-19 12:14:09.470622','2024-12-19 12:14:09.470622',NULL),(50,'Nguyễn Văn Quyết','vanquyet.nguyen@gmail.com','0967145896','stylist',1,0,0,NULL,NULL,5,'2024-12-19 12:14:09.470622','2024-12-19 12:14:09.470622',NULL),(51,'Trần Phi Sơn','phison.tran@gmail.com','0928456321','stylist',1,0,0,NULL,NULL,5,'2024-12-19 12:14:09.470622','2024-12-19 12:14:09.470622',NULL),(52,'Hoàng Vũ Samson','samson.hoangvu@gmail.com','0952789654','stylist',1,0,0,NULL,NULL,5,'2024-12-19 12:14:09.470622','2024-12-19 12:14:09.470622',NULL),(53,'Nguyễn Hải Anh','haianh.nguyen@gmail.com','0913456987','stylist',1,0,0,NULL,NULL,6,'2024-12-19 12:14:09.470622','2024-12-19 12:14:09.470622',NULL),(54,'Bùi Tấn Trường','tantruong.bui@gmail.com','0986741258','stylist',1,0,0,NULL,NULL,6,'2024-12-19 12:14:09.470622','2024-12-19 12:14:09.470622',NULL),(55,'Nguyễn Minh Tùng','minhtung.nguyen@gmail.com','0935896471','stylist',1,0,0,NULL,NULL,6,'2024-12-19 12:14:09.470622','2024-12-19 12:14:09.470622',NULL),(56,'Trần Hữu Đông Triều','dongtrieu.tranhuu@gmail.com','0962147853','stylist',1,0,0,NULL,NULL,6,'2024-12-19 12:14:09.470622','2024-12-19 12:14:09.470622',NULL),(57,'Nguyễn Tuấn Mạnh','tuanmanh.nguyen@gmail.com','0927458963','stylist',1,0,0,NULL,NULL,6,'2024-12-19 12:14:09.470622','2024-12-19 12:14:09.470622',NULL),(58,'Huỳnh Tấn Linh','tanlinh.huynh@gmail.com','0954789632','stylist',1,0,0,NULL,NULL,6,'2024-12-19 12:14:09.470622','2024-12-19 12:14:09.470622',NULL),(59,'Phạm Văn Cường','vancuong.pham@gmail.com','0918654789','stylist',1,0,0,NULL,NULL,6,'2024-12-19 12:14:09.470622','2024-12-19 12:14:09.470622',NULL),(60,'Nguyễn Văn Hoàng','vanhoang.nguyen@gmail.com','0983258741','stylist',1,0,0,NULL,NULL,6,'2024-12-19 12:14:09.470622','2024-12-19 12:14:09.470622',NULL),(61,'Bùi Quang Huy','quanghuy.bui@gmail.com','0936987452','stylist',1,0,0,NULL,NULL,6,'2024-12-19 12:14:09.470622','2024-12-19 12:14:09.470622',NULL),(62,'Nguyễn Văn Biểu','vanbieu.nguyen@gmail.com','0964125879','stylist',1,0,0,NULL,NULL,6,'2024-12-19 12:14:09.470622','2024-12-19 12:14:09.470622',NULL),(63,'Trần Văn Kiên','vankien.tran@gmail.com','0925874136','stylist',1,0,0,NULL,NULL,7,'2024-12-19 12:14:09.470622','2024-12-19 12:14:09.470622',NULL),(64,'Đào Duy Khánh','duykhanh.dao@gmail.com','0953698741','stylist',1,0,0,NULL,NULL,7,'2024-12-19 12:14:09.470622','2024-12-19 12:14:09.470622',NULL),(65,'Nguyễn Đại Đồng','daidong.nguyen@gmail.com','0914785236','stylist',1,0,0,NULL,NULL,7,'2024-12-19 12:14:09.470622','2024-12-19 12:14:09.470622',NULL),(66,'Sầm Ngọc Đức','ngocduc.sam@gmail.com','0981456987','stylist',1,0,0,NULL,NULL,7,'2024-12-19 12:14:09.470622','2024-12-19 12:14:09.470622',NULL),(67,'Phạm Thành Lương','thanhluong.pham@gmail.com','0932789654','stylist',1,0,0,NULL,NULL,7,'2024-12-19 12:14:09.470622','2024-12-19 12:14:09.470622',NULL),(68,'Nguyễn Quốc Long','quoclong.nguyen@gmail.com','0965874123','stylist',1,0,0,NULL,NULL,7,'2024-12-19 12:14:09.470622','2024-12-19 12:14:09.470622',NULL),(69,'Đỗ Sỹ Huy','syhuy.do@gmail.com','0926358741','stylist',1,0,0,NULL,NULL,7,'2024-12-19 12:14:09.470622','2024-12-19 12:14:09.470622',NULL),(70,'Nguyễn Văn Dũng','vandung.nguyen@gmail.com','0957896324','stylist',1,0,0,NULL,NULL,7,'2024-12-19 12:14:09.470622','2024-12-19 12:14:09.470622',NULL),(71,'Hoàng Đình Tùng','dinhtung.hoang@gmail.com','0912458796','stylist',1,0,0,NULL,NULL,7,'2024-12-19 12:14:09.470622','2024-12-19 12:14:09.470622',NULL),(72,'Lê Văn Thắng','vanthang.le@gmail.com','0984753698','stylist',1,0,0,NULL,NULL,7,'2024-12-19 12:14:09.470622','2024-12-19 12:14:09.470622',NULL),(73,'Ngô Tùng Quốc','tungquoc.ngo@gmail.com','0931852963','stylist',1,0,0,NULL,NULL,8,'2024-12-19 12:14:09.470622','2024-12-19 12:14:09.470622',NULL),(74,'Trần Bửu Ngọc','buungoc.tran@gmail.com','0968417539','stylist',1,0,0,NULL,NULL,8,'2024-12-19 12:14:09.470622','2024-12-19 12:14:09.470622',NULL),(75,'Cao Văn Triền','vantrien.cao@gmail.com','0924785691','stylist',1,0,0,NULL,NULL,8,'2024-12-19 12:14:09.470622','2024-12-19 12:14:09.470622',NULL),(76,'Nguyễn Trung Đại Dương','daiduong.nguyen@gmail.com','0953621487','stylist',1,0,0,NULL,NULL,8,'2024-12-19 12:14:09.470622','2024-12-19 12:14:09.470622',NULL),(77,'Nguyễn Hữu Sơn','huuson.nguyen@gmail.com','0917458963','stylist',1,0,0,NULL,NULL,8,'2024-12-19 12:14:09.470622','2024-12-19 12:14:09.470622',NULL),(78,'Lê Đức Lương','ducluong.le@gmail.com','0982369741','stylist',1,0,0,NULL,NULL,8,'2024-12-19 12:14:09.470622','2024-12-19 12:14:09.470622',NULL),(79,'Nguyễn Rodgers','rodgers.nguyen@gmail.com','0935874129','stylist',1,0,0,NULL,NULL,8,'2024-12-19 12:14:09.470622','2024-12-19 12:14:09.470622',NULL),(80,'Trần Đình Hoàng','dinhhoang.tran@gmail.com','0964789632','stylist',1,0,0,NULL,NULL,8,'2024-12-19 12:14:09.470622','2024-12-19 12:14:09.470622',NULL),(81,'Nguyễn Văn Đức','vanduc.nguyen@gmail.com','0921456987','stylist',1,0,0,NULL,NULL,8,'2024-12-19 12:14:09.470622','2024-12-19 12:14:09.470622',NULL),(82,'Lê Quốc Phương','quocphuong.le@gmail.com','0958741369','stylist',1,0,0,NULL,NULL,8,'2024-12-19 12:14:09.470622','2024-12-19 12:14:09.470622',NULL),(83,'Hoàng Văn Khánh','vankhanh.hoang@gmail.com','0913654789','stylist',1,0,0,NULL,NULL,9,'2024-12-19 12:14:09.470622','2024-12-19 12:14:09.470622',NULL),(84,'Nguyễn Xuân Nam','xuannam.nguyen@gmail.com','0986471258','stylist',1,0,0,NULL,NULL,9,'2024-12-19 12:14:09.470622','2024-12-19 12:14:09.470622',NULL),(85,'Trần Mạnh Cường','manhcuong.tran@gmail.com','0932587419','stylist',1,0,0,NULL,NULL,9,'2024-12-19 12:14:09.470622','2024-12-19 12:14:09.470622',NULL),(86,'Nguyễn Văn Mạnh','vanmanh.nguyen@gmail.com','0967896324','stylist',1,0,0,NULL,NULL,9,'2024-12-19 12:14:09.470622','2024-12-19 12:14:09.470622',NULL),(87,'Võ Ngọc Toàn','ngoctoan.vo@gmail.com','0924159786','stylist',1,0,0,NULL,NULL,9,'2024-12-19 12:14:09.470622','2024-12-19 12:14:09.470622',NULL),(88,'Trần Trung Hiếu','trunghieu.tran@gmail.com','0951847369','stylist',1,0,0,NULL,NULL,9,'2024-12-19 12:14:09.470622','2024-12-19 12:14:09.470622',NULL),(89,'Nguyễn Hạ Long','halong.nguyen@gmail.com','0916325874','stylist',1,0,0,NULL,NULL,9,'2024-12-19 12:14:09.470622','2024-12-19 12:14:09.470622',NULL),(90,'Lê Sỹ Minh','symyinh.le@gmail.com','0985214796','stylist',1,0,0,NULL,NULL,9,'2024-12-19 12:14:09.470622','2024-12-19 12:14:09.470622',NULL),(91,'Nguyễn Thế Hưng','thehung.nguyen@gmail.com','0938745691','stylist',1,0,0,NULL,NULL,9,'2024-12-19 12:14:09.470622','2024-12-19 12:14:09.470622',NULL),(92,'Trần Hữu Đông','huudong.tran@gmail.com','0962487531','stylist',1,0,0,NULL,NULL,9,'2024-12-19 12:14:09.470622','2024-12-19 12:14:09.470622',NULL),(93,'Nguyễn Đức Chiến','ducchien.nguyen@gmail.com','0927145896','stylist',1,0,0,NULL,NULL,10,'2024-12-19 12:14:09.470622','2024-12-19 12:14:09.470622',NULL),(94,'Trần Thái Học','thaihoc.tran@gmail.com','0953698741','stylist',1,0,0,NULL,NULL,10,'2024-12-19 12:14:09.470622','2024-12-19 12:14:09.470622',NULL),(95,'Lê Ngọc Nam','ngocnam.le@gmail.com','0918246357','stylist',1,0,0,NULL,NULL,10,'2024-12-19 12:14:09.470622','2024-12-19 12:14:09.470622',NULL),(96,'Nguyễn Văn Việt','vanviet.nguyen@gmail.com','0984753159','stylist',1,0,0,NULL,NULL,10,'2024-12-19 12:14:09.470622','2024-12-19 12:14:09.470622',NULL),(97,'Đinh Viết Tú','viettu.dinh@gmail.com','0939486217','stylist',1,0,0,NULL,NULL,10,'2024-12-19 12:14:09.470622','2024-12-19 12:14:09.470622',NULL),(98,'Nguyễn Trọng Đại','trongdai.nguyen@gmail.com','0961478523','stylist',1,0,0,NULL,NULL,10,'2024-12-19 12:14:09.470622','2024-12-19 12:14:09.470622',NULL),(99,'Lê Phạm Thành Long','thanhlong.lepham@gmail.com','0926847159','stylist',1,0,0,NULL,NULL,10,'2024-12-19 12:14:09.470622','2024-12-19 12:14:09.470622',NULL),(100,'Nguyễn Đức Cường','duccuong.nguyen@gmail.com','0954789632','stylist',1,0,0,NULL,NULL,10,'2024-12-19 12:14:09.470622','2024-12-19 12:14:09.470622',NULL),(101,'Trần Đình Khương','dinhkhuong.tran@gmail.com','0913654789','stylist',1,0,0,NULL,NULL,10,'2024-12-19 12:14:09.470622','2024-12-19 12:14:09.470622',NULL),(102,'Nguyễn Văn Ngọ','vanngo.nguyen@gmail.com','0982541789','stylist',1,0,0,NULL,NULL,10,'2024-12-19 12:14:09.470622','2024-12-19 12:14:09.470622',NULL);
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedbacks`
--

DROP TABLE IF EXISTS `feedbacks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedbacks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `branch_rating` int NOT NULL,
  `branch_feedback` varchar(255) DEFAULT NULL,
  `employee_rating` int NOT NULL,
  `employee_feedback` varchar(255) DEFAULT NULL,
  `overall_rating` int NOT NULL,
  `suggestion` varchar(255) DEFAULT NULL,
  `appointment_id` int NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_729ed648f9b89722ab206e5eb0` (`appointment_id`),
  CONSTRAINT `FK_729ed648f9b89722ab206e5eb05` FOREIGN KEY (`appointment_id`) REFERENCES `appointments` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedbacks`
--

LOCK TABLES `feedbacks` WRITE;
/*!40000 ALTER TABLE `feedbacks` DISABLE KEYS */;
INSERT INTO `feedbacks` VALUES (1,5,NULL,5,NULL,5,'Quá tuyệt',1,'2024-12-19 13:39:16.214244','2024-12-19 13:39:16.214244');
/*!40000 ALTER TABLE `feedbacks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `services` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `estimate_time` int NOT NULL,
  `price` int NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services`
--

LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
INSERT INTO `services` VALUES (1,'Cat toc','Cat toc gia re voi cac stylist co trinh do chuyen nghiep',30,100000,'2024-12-19 12:18:38.229869','2024-12-19 14:57:07.000000','2024-12-19 14:57:07.000000'),(2,'Cắt tóc nam','Dịch vụ cắt tóc nam chuyên nghiệp, cập nhật xu hướng mới nhất, phù hợp mọi phong cách từ lịch lãm đến cá tính. Đảm bảo mang lại vẻ ngoài tự tin và nổi bật.',30,69000,'2024-12-19 12:20:32.059699','2024-12-19 17:29:57.808356',NULL),(3,'Uốn tóc','Sở hữu mái tóc xoăn bồng bềnh, quyến rũ với công nghệ uốn tiên tiến, không gây hư tổn. Giữ nếp lâu dài, tạo độ phồng tự nhiên.',120,350000,'2024-12-19 12:26:38.533086','2024-12-19 12:26:38.533086',NULL),(4,'Nhuộm tóc','Thay đổi diện mạo với màu tóc thời thượng, phù hợp với xu hướng. Sử dụng sản phẩm nhuộm cao cấp, bảo vệ tóc khỏi hư tổn.',90,280000,'2024-12-19 12:26:38.533086','2024-12-19 12:26:38.533086',NULL),(5,'Phục hồi tóc hư tổn','Hồi sinh mái tóc khô xơ, chẻ ngọn với liệu trình phục hồi chuyên sâu. Cung cấp dưỡng chất thiết yếu, giúp tóc chắc khỏe, bóng mượt.',65,250000,'2024-12-19 12:26:38.533086','2024-12-19 13:08:50.000000',NULL),(6,'Duỗi thẳng','Sở hữu mái tóc thẳng mượt tự nhiên, vào nếp dễ dàng. Sử dụng công nghệ duỗi hiện đại, giảm thiểu hư tổn cho tóc.',150,400000,'2024-12-19 12:26:38.533086','2024-12-19 12:26:38.533086',NULL),(7,'Tạo kiểu tóc dự tiệc','Tỏa sáng trong các buổi tiệc với kiểu tóc sang trọng, lộng lẫy. Được tạo kiểu bởi các chuyên gia hàng đầu, mang đến vẻ ngoài hoàn hảo.',90,200000,'2024-12-19 12:26:38.533086','2024-12-19 12:26:38.533086',NULL),(8,'Chăm sóc tóc chuyên sâu','Liệu trình chăm sóc tóc chuyên sâu, giúp tóc chắc khỏe từ gốc đến ngọn. Cung cấp dưỡng chất và độ ẩm cần thiết, cho mái tóc suôn mượt, óng ả.',75,300000,'2024-12-19 12:26:38.533086','2024-12-19 12:26:38.533086',NULL),(9,'Gội đầu dưỡng sinh','Thư giãn và tận hưởng dịch vụ gội đầu dưỡng sinh, kết hợp massage da đầu. Giúp giảm stress, kích thích mọc tóc, cho mái tóc khỏe mạnh.',60,120000,'2024-12-19 12:26:38.533086','2024-12-19 12:26:38.533086',NULL),(10,'Nhuộm highlight','Nhuộm highlight tạo điểm nhấn nổi bật cho mái tóc. Sử dụng kỹ thuật nhuộm hiện đại, tạo hiệu ứng màu sắc ấn tượng.',120,320000,'2024-12-19 12:26:38.533086','2024-12-19 12:26:38.533086',NULL),(11,'Uốn phồng chân tóc','Tạo độ phồng tự nhiên cho mái tóc, giúp tóc trông dày hơn. Sử dụng kỹ thuật uốn hiện đại, không gây hư tổn cho tóc.',90,220000,'2024-12-19 12:26:38.533086','2024-12-19 12:26:38.533086',NULL),(12,'Duỗi cúp','Tạo kiểu tóc cúp nhẹ nhàng, nữ tính. Phù hợp với mọi khuôn mặt, mang đến vẻ ngoài trẻ trung, dịu dàng.',120,380000,'2024-12-19 12:26:38.533086','2024-12-19 12:26:38.533086',NULL),(13,'Nhuộm ombre','Tạo hiệu ứng màu sắc chuyển đổi tự nhiên, ấn tượng với kỹ thuật nhuộm ombre. Mang đến vẻ ngoài thời thượng, cá tính.',150,450000,'2024-12-19 12:26:38.533086','2024-12-19 12:26:38.533086',NULL),(14,'Phục hồi tóc hư tổn nặng','Liệu trình phục hồi chuyên sâu dành cho tóc hư tổn nặng. Giúp tái tạo cấu trúc tóc, phục hồi độ bóng mượt, chắc khỏe.',90,400000,'2024-12-19 12:26:38.533086','2024-12-19 12:26:38.533086',NULL),(15,'Tẩy tóc','Tẩy tóc an toàn, hiệu quả, chuẩn bị cho việc nhuộm màu sáng. Sử dụng sản phẩm tẩy tóc cao cấp, hạn chế hư tổn.',60,180000,'2024-12-19 12:26:38.533086','2024-12-19 12:26:38.533086',NULL),(16,'Hấp dầu','Cung cấp dưỡng chất và độ ẩm cho tóc, giúp tóc mềm mượt, óng ả. Sử dụng sản phẩm hấp dầu cao cấp, phù hợp với từng loại tóc.',45,100000,'2024-12-19 12:26:38.533086','2024-12-19 12:26:38.533086',NULL),(17,'Cắt tóc nam','Tạo kiểu tóc nam tính, lịch lãm, phù hợp với xu hướng. Tư vấn kiểu tóc phù hợp với khuôn mặt và phong cách.',30,60000,'2024-12-19 12:26:38.533086','2024-12-19 12:26:38.533086',NULL),(18,'Cắt tóc nữ','Tạo kiểu tóc nữ tính, dịu dàng, phù hợp với mọi lứa tuổi. Tư vấn kiểu tóc phù hợp với khuôn mặt và sở thích.',45,80000,'2024-12-19 12:26:38.533086','2024-12-19 12:26:38.533086',NULL),(19,'Uốn setting','Tạo kiểu tóc xoăn sóng nước bồng bềnh, quyến rũ. Giữ nếp lâu, dễ dàng tạo kiểu tại nhà.',180,500000,'2024-12-19 12:26:38.533086','2024-12-19 12:26:38.533086',NULL),(20,'Nhuộm tóc thời trang','Nhuộm tóc với những màu sắc thời trang, cá tính. Sử dụng kỹ thuật nhuộm hiện đại, tạo hiệu ứng màu sắc độc đáo.',150,420000,'2024-12-19 12:26:38.533086','2024-12-19 12:26:38.533086',NULL),(21,'Đá trứng cút','Dịch vụ cho khách hàng thân thiết',30,1000000,'2024-12-19 16:06:11.962863','2024-12-19 16:11:42.000000',NULL);
/*!40000 ALTER TABLE `services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `specific_off_days`
--

DROP TABLE IF EXISTS `specific_off_days`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `specific_off_days` (
  `id` int NOT NULL AUTO_INCREMENT,
  `employee_id` int NOT NULL,
  `date` datetime NOT NULL,
  `reason` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`,`employee_id`,`date`),
  KEY `FK_52839987b1813eff4bf9d2cfc41` (`employee_id`),
  CONSTRAINT `FK_52839987b1813eff4bf9d2cfc41` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `specific_off_days`
--

LOCK TABLES `specific_off_days` WRITE;
/*!40000 ALTER TABLE `specific_off_days` DISABLE KEYS */;
/*!40000 ALTER TABLE `specific_off_days` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `google_id` varchar(255) DEFAULT NULL,
  `role` enum('customer','manager','admin') NOT NULL DEFAULT 'customer',
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `picture_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_97672ac88f789774dd47f7c8be` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin@mail.com','$2b$10$ZG8j4/1d3wpZPAaOKN9X5eigjiqfOWfICBy5HMscExQb8utmYaRcu',NULL,'admin','2024-12-19 11:52:39.385898','2024-12-19 11:52:39.385898',NULL,NULL),(2,'tranduyhung_4f@mail.com','$2b$10$ZG8j4/1d3wpZPAaOKN9X5eigjiqfOWfICBy5HMscExQb8utmYaRcu',NULL,'manager','2024-12-19 11:52:39.452701','2024-12-19 11:52:39.452701',NULL,NULL),(3,'phoco_4f@mail.com','$2b$10$ZG8j4/1d3wpZPAaOKN9X5eigjiqfOWfICBy5HMscExQb8utmYaRcu',NULL,'manager','2024-12-19 11:52:39.452701','2024-12-19 11:52:39.452701',NULL,NULL),(4,'nguyentraihanoi_4f@mail.com','$2b$10$ZG8j4/1d3wpZPAaOKN9X5eigjiqfOWfICBy5HMscExQb8utmYaRcu',NULL,'manager','2024-12-19 11:52:39.452701','2024-12-19 11:52:39.452701',NULL,NULL),(5,'kimma_4f@mail.com','$2b$10$ZG8j4/1d3wpZPAaOKN9X5eigjiqfOWfICBy5HMscExQb8utmYaRcu',NULL,'manager','2024-12-19 11:52:39.452701','2024-12-19 11:52:39.452701',NULL,NULL),(6,'caugiay_4f@mail.com','$2b$10$ZG8j4/1d3wpZPAaOKN9X5eigjiqfOWfICBy5HMscExQb8utmYaRcu',NULL,'manager','2024-12-19 11:52:39.452701','2024-12-19 11:52:39.452701',NULL,NULL),(7,'langha_4f@mail.com','$2b$10$ZG8j4/1d3wpZPAaOKN9X5eigjiqfOWfICBy5HMscExQb8utmYaRcu',NULL,'manager','2024-12-19 11:52:39.452701','2024-12-19 11:52:39.452701',NULL,NULL),(8,'trangtien_4f@mail.com','$2b$10$ZG8j4/1d3wpZPAaOKN9X5eigjiqfOWfICBy5HMscExQb8utmYaRcu',NULL,'manager','2024-12-19 11:52:39.452701','2024-12-19 11:52:39.452701',NULL,NULL),(9,'thaithinh_4f@mail.com','$2b$10$ZG8j4/1d3wpZPAaOKN9X5eigjiqfOWfICBy5HMscExQb8utmYaRcu',NULL,'manager','2024-12-19 11:52:39.452701','2024-12-19 11:52:39.452701',NULL,NULL),(10,'hoangcau_4f@mail.com','$2b$10$ZG8j4/1d3wpZPAaOKN9X5eigjiqfOWfICBy5HMscExQb8utmYaRcu',NULL,'manager','2024-12-19 11:52:39.452701','2024-12-19 13:24:27.000000',NULL,NULL),(11,'xadan_4f@mail.com','$2b$10$ZG8j4/1d3wpZPAaOKN9X5eigjiqfOWfICBy5HMscExQb8utmYaRcu',NULL,'manager','2024-12-19 11:52:39.452701','2024-12-19 11:52:39.452701',NULL,NULL),(12,'vietannv617@gmail.com',NULL,'103942233854022862223','customer','2024-12-19 12:52:11.220338','2024-12-19 12:52:11.220338',NULL,'https://lh3.googleusercontent.com/a/ACg8ocJF2nw6PfQXdvOK2xZiwP3jjM3AuNffyGMFHZoGWPr1QdfiGBM=s96-c'),(13,'vietanhlevu2004@gmail.com',NULL,'101960976480723561917','customer','2024-12-19 13:02:07.548500','2024-12-19 13:02:07.548500',NULL,'https://lh3.googleusercontent.com/a/ACg8ocIbyvxD3JLcWp6lF_TRs102Uvohiui6neVeMf1jAabXIi9nROk3=s96-c'),(14,'example@gmail.com','$2b$10$15XRkX2t/tK6CgFGCPjzUOQV.2ixdOSXlpmH7pxA39Xqz3jkGy84e',NULL,'customer','2024-12-19 13:13:39.637701','2024-12-19 13:13:39.637701',NULL,NULL),(15,'example2@gmail.com','$2b$10$migW11vO4FB3MPWh1tsXJ.Z3vdx6E72BQXPNo4k3HvOeR.4ORd7PO',NULL,'customer','2024-12-19 14:07:30.821406','2024-12-19 14:07:30.821406',NULL,NULL),(16,'admin2@mail.com','$2b$10$bH3qjEDLlLteCgtwqE.l3.qKitx1fn6dwo1gm3ShoSYiQNdhVycIK',NULL,'manager','2024-12-19 14:16:10.307871','2024-12-19 14:16:22.000000',NULL,NULL),(17,'22021217@vnu.edu.vn',NULL,'114856841896613032735','customer','2024-12-19 14:20:53.288503','2024-12-19 14:20:53.288503',NULL,'https://lh3.googleusercontent.com/a/ACg8ocJCWn5kDhNR-s8WkihaCm3TTe5YECHP_JI9z9kTh-VVzohV8y8=s96-c'),(18,'monternsh@gmail.com',NULL,'112514259160552541273','customer','2024-12-19 14:40:53.632266','2024-12-19 14:40:53.632266',NULL,'https://lh3.googleusercontent.com/a/ACg8ocJHjuNQ8OOriQ3q9QFg62INjQi8WuGbkhVaOmw1qKkdH8dyAao=s96-c'),(19,'mohai@mail.com','$2b$10$u6wY8//N0bP5YYhEzN/doOirFa.8Hl.gXnvm2yQ33UsdeWrg8.W/a',NULL,'customer','2024-12-19 15:12:24.614031','2024-12-19 15:12:24.614031',NULL,NULL),(20,'hoapri123@gmail.com',NULL,'103222730548076409646','customer','2024-12-19 18:11:49.135045','2024-12-19 18:11:49.135045',NULL,'https://lh3.googleusercontent.com/a/ACg8ocJ1HP9lbaaKf8WyVYU58xdBdN1qxUOGqGkU1Rd5a79_OPb_bg=s96-c');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `voucher_history`
--

DROP TABLE IF EXISTS `voucher_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `voucher_history` (
  `id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int NOT NULL,
  `voucher_id` int NOT NULL,
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  KEY `FK_b420f93b5bbb3a61d8462354d95` (`customer_id`),
  KEY `FK_c3bd4e9333a37f768f094a69e6b` (`voucher_id`),
  CONSTRAINT `FK_b420f93b5bbb3a61d8462354d95` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`),
  CONSTRAINT `FK_c3bd4e9333a37f768f094a69e6b` FOREIGN KEY (`voucher_id`) REFERENCES `vouchers` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `voucher_history`
--

LOCK TABLES `voucher_history` WRITE;
/*!40000 ALTER TABLE `voucher_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `voucher_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vouchers`
--

DROP TABLE IF EXISTS `vouchers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vouchers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `imageUrl` varchar(255) NOT NULL,
  `discount_type` enum('percentage','fixed') NOT NULL DEFAULT 'percentage',
  `discount_value` int NOT NULL,
  `price_threshold` int NOT NULL,
  `required_point` int NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `branch_id` int NOT NULL,
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vouchers`
--

LOCK TABLES `vouchers` WRITE;
/*!40000 ALTER TABLE `vouchers` DISABLE KEYS */;
INSERT INTO `vouchers` VALUES (1,'DISC10','10% Discount Voucher','https://example.com/image1.jpg','percentage',10,50000,100,'2024-12-19 00:00:00','2024-12-31 00:00:00',1,'2024-12-19 13:46:18.477823','2024-12-19 13:46:18.477823'),(2,'DISC20','20% Discount Voucher','https://example.com/image2.jpg','percentage',20,100000,200,'2024-12-19 00:00:00','2024-12-31 00:00:00',1,'2024-12-19 13:46:18.477823','2024-12-19 13:46:18.477823'),(3,'DISC30','30% Discount Voucher','https://example.com/image3.jpg','percentage',30,150000,300,'2024-12-19 00:00:00','2024-12-31 00:00:00',2,'2024-12-19 13:46:18.477823','2024-12-19 13:46:18.477823'),(4,'FIXED50K','50,000 VND Discount Voucher','https://example.com/image4.jpg','fixed',50000,200000,400,'2024-12-19 00:00:00','2024-12-31 00:00:00',2,'2024-12-19 13:46:18.477823','2024-12-19 13:46:18.477823'),(5,'FIXED100K','100,000 VND Discount Voucher','https://example.com/image5.jpg','fixed',100000,300000,500,'2024-12-19 00:00:00','2024-12-31 00:00:00',3,'2024-12-19 13:46:18.477823','2024-12-19 13:46:18.477823'),(6,'SUMMER10','10% Summer Voucher','https://example.com/image6.jpg','percentage',10,70000,150,'2024-12-19 00:00:00','2024-12-31 00:00:00',3,'2024-12-19 13:46:18.477823','2024-12-19 13:46:18.477823'),(7,'SUMMER20','20% Summer Voucher','https://example.com/image7.jpg','percentage',20,80000,250,'2024-12-19 00:00:00','2024-12-31 00:00:00',4,'2024-12-19 13:46:18.477823','2024-12-19 13:46:18.477823'),(8,'SPRING15','15% Spring Voucher','https://example.com/image8.jpg','percentage',15,120000,300,'2024-12-19 00:00:00','2024-12-31 00:00:00',4,'2024-12-19 13:46:18.477823','2024-12-19 13:46:18.477823'),(9,'SPRING25','25% Spring Voucher','https://example.com/image9.jpg','percentage',25,150000,400,'2024-12-19 00:00:00','2024-12-31 00:00:00',5,'2024-12-19 13:46:18.477823','2024-12-19 13:46:18.477823'),(10,'BONUS5K','5,000 VND Discount Voucher','https://example.com/image10.jpg','fixed',5000,20000,50,'2024-12-19 00:00:00','2024-12-31 00:00:00',5,'2024-12-19 13:46:18.477823','2024-12-19 13:46:18.477823'),(11,'NEXT10','10% Discount Voucher for Next Month','https://example.com/image11.jpg','percentage',10,50000,100,'2025-01-01 00:00:00','2025-01-31 00:00:00',1,'2024-12-19 13:46:18.477823','2024-12-19 13:46:18.477823'),(12,'NEXT20','20% Discount Voucher for Next Month','https://example.com/image12.jpg','percentage',20,100000,200,'2025-01-01 00:00:00','2025-01-31 00:00:00',1,'2024-12-19 13:46:18.477823','2024-12-19 13:46:18.477823'),(13,'NEXT30','30% Discount Voucher for Next Month','https://example.com/image13.jpg','percentage',30,150000,300,'2025-01-01 00:00:00','2025-01-31 00:00:00',2,'2024-12-19 13:46:18.477823','2024-12-19 13:46:18.477823'),(14,'FIXED60K','60,000 VND Discount Voucher for Next Month','https://example.com/image14.jpg','fixed',60000,250000,400,'2025-01-01 00:00:00','2025-01-31 00:00:00',2,'2024-12-19 13:46:18.477823','2024-12-19 13:46:18.477823'),(15,'FIXED120K','120,000 VND Discount Voucher for Next Month','https://example.com/image15.jpg','fixed',120000,350000,500,'2025-01-01 00:00:00','2025-01-31 00:00:00',3,'2024-12-19 13:46:18.477823','2024-12-19 13:46:18.477823'),(16,'WINTER10','10% Winter Voucher','https://example.com/image16.jpg','percentage',10,90000,150,'2025-01-01 00:00:00','2025-01-31 00:00:00',3,'2024-12-19 13:46:18.477823','2024-12-19 13:46:18.477823'),(17,'WINTER20','20% Winter Voucher','https://example.com/image17.jpg','percentage',20,95000,250,'2025-01-01 00:00:00','2025-01-31 00:00:00',4,'2024-12-19 13:46:18.477823','2024-12-19 13:46:18.477823'),(18,'AUTUMN15','15% Autumn Voucher','https://example.com/image18.jpg','percentage',15,125000,300,'2025-01-01 00:00:00','2025-01-31 00:00:00',4,'2024-12-19 13:46:18.477823','2024-12-19 13:46:18.477823'),(19,'AUTUMN25','25% Autumn Voucher','https://example.com/image19.jpg','percentage',25,160000,400,'2025-01-01 00:00:00','2025-01-31 00:00:00',5,'2024-12-19 13:46:18.477823','2024-12-19 13:46:18.477823'),(20,'BONUS10K','10,000 VND Discount Voucher for Next Month','https://example.com/image20.jpg','fixed',10000,30000,50,'2025-01-01 00:00:00','2025-01-31 00:00:00',5,'2024-12-19 13:46:18.477823','2024-12-19 13:46:18.477823');
/*!40000 ALTER TABLE `vouchers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `working_schedule_templates`
--

DROP TABLE IF EXISTS `working_schedule_templates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `working_schedule_templates` (
  `id` int NOT NULL AUTO_INCREMENT,
  `employee_id` int NOT NULL,
  `monday` tinyint NOT NULL,
  `tuesday` tinyint NOT NULL,
  `wednesday` tinyint NOT NULL,
  `thursday` tinyint NOT NULL,
  `friday` tinyint NOT NULL,
  `saturday` tinyint NOT NULL,
  `sunday` tinyint NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_cf26614d50d337c04af832f4bd` (`employee_id`),
  CONSTRAINT `FK_cf26614d50d337c04af832f4bd8` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=104 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `working_schedule_templates`
--

LOCK TABLES `working_schedule_templates` WRITE;
/*!40000 ALTER TABLE `working_schedule_templates` DISABLE KEYS */;
INSERT INTO `working_schedule_templates` VALUES (1,1,0,0,0,0,0,0,0,'2024-12-19 12:03:09.537470','2024-12-19 13:18:52.000000','2024-12-19 13:18:52.000000'),(2,2,1,1,1,1,1,1,1,'2024-12-19 12:32:27.929664','2024-12-19 15:28:56.000000','2024-12-19 13:19:42.000000'),(4,3,1,1,1,0,1,0,0,'2024-12-19 12:39:06.301014','2024-12-19 16:29:58.000000',NULL),(5,4,1,1,1,0,1,1,0,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(6,5,0,1,1,1,0,1,1,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(7,6,1,1,0,1,1,1,1,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(8,7,1,0,1,1,1,0,0,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(9,8,1,1,1,1,0,0,1,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(10,9,0,1,0,1,1,1,1,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(11,10,1,1,1,0,0,1,0,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(12,11,1,0,1,1,1,1,1,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(13,12,0,1,0,0,1,0,1,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(14,13,1,1,1,1,1,1,0,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(15,14,1,0,0,1,0,1,1,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(16,15,1,1,1,1,1,0,1,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(17,16,0,0,1,0,1,1,1,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(18,17,1,1,0,1,1,1,0,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(19,18,1,1,1,0,1,0,1,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(20,19,0,1,1,1,0,1,1,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(21,20,1,0,1,1,1,0,0,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(22,21,1,1,0,0,1,1,1,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(23,22,0,1,1,1,0,0,1,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(24,23,1,0,1,0,1,1,1,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(25,24,1,1,1,1,0,1,0,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(26,25,0,0,0,1,1,0,1,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(27,26,1,1,1,0,1,1,1,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(28,27,1,0,1,1,0,0,1,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(29,28,0,1,0,1,1,1,0,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(30,29,1,1,1,0,0,1,1,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(31,30,1,0,0,1,1,0,1,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(32,31,0,1,1,1,1,1,0,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(33,32,1,0,1,0,0,1,1,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(34,33,1,1,0,1,1,0,1,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(35,34,0,1,1,0,1,1,1,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(36,35,1,0,0,1,0,1,0,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(37,36,1,1,1,1,1,0,1,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(38,37,0,0,1,0,1,1,1,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(39,38,1,1,0,1,0,0,1,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(40,39,1,0,1,1,1,1,0,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(41,40,0,1,0,0,1,0,1,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(42,41,1,1,1,1,0,1,1,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(43,42,1,0,0,1,1,1,0,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(44,43,0,1,1,0,0,1,1,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(45,44,1,0,1,1,1,0,0,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(46,45,1,1,0,1,0,1,1,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(47,46,0,0,1,0,1,1,0,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(48,47,1,1,1,1,0,0,1,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(49,48,1,0,0,0,1,1,1,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(50,49,0,1,1,1,1,0,1,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(51,50,1,0,1,0,0,1,0,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(52,51,1,1,0,1,1,1,1,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(53,52,0,1,1,0,1,0,0,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(54,53,1,0,0,1,0,1,1,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(55,54,1,1,1,0,1,1,0,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(56,55,0,0,1,1,1,0,1,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(57,56,1,1,0,0,0,1,1,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(58,57,1,0,1,1,1,1,0,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(59,58,0,1,0,1,0,0,1,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(60,59,1,1,1,0,1,1,1,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(61,60,1,0,0,1,1,0,0,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(62,61,0,1,1,0,0,1,1,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(63,62,1,0,1,1,1,0,1,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(64,63,1,1,0,0,1,1,0,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(65,64,0,0,1,1,0,1,1,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(66,65,1,1,1,0,1,0,0,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(67,66,1,0,0,1,1,1,1,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(68,67,0,1,1,0,0,0,1,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(69,68,1,0,1,1,1,1,0,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(70,69,1,1,0,0,1,0,1,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(71,70,0,0,1,1,0,1,1,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(72,71,1,1,1,0,1,0,0,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(73,72,1,0,0,1,1,1,1,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(74,73,0,1,1,0,0,1,0,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(75,74,1,0,1,1,1,0,1,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(76,75,1,1,0,0,0,1,1,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(77,76,0,0,1,1,1,1,0,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(78,77,1,1,1,0,1,0,1,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(79,78,1,0,0,1,0,1,0,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(80,79,0,1,1,0,1,1,1,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(81,80,1,0,1,1,0,0,1,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(82,81,1,1,0,0,1,1,0,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(83,82,0,0,1,1,1,0,1,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(84,83,1,1,1,0,0,1,0,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(85,84,1,0,0,1,1,1,1,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(86,85,0,1,1,0,1,0,0,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(87,86,1,0,1,1,0,1,1,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(88,87,1,1,0,0,1,0,1,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(89,88,0,0,1,1,1,1,0,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(90,89,1,1,1,0,0,0,1,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(91,90,1,0,0,1,1,1,0,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(92,91,0,1,1,0,1,0,1,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(93,92,1,0,1,1,0,1,0,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(94,93,1,1,0,0,1,1,1,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(95,94,0,0,1,1,0,0,1,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(96,95,1,1,1,0,1,1,0,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(97,96,1,0,0,1,0,1,1,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(98,97,0,1,1,0,1,0,0,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(99,98,1,0,1,1,1,1,1,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(100,99,1,1,0,0,0,1,0,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(101,100,0,0,1,1,1,0,1,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(102,101,1,1,1,0,1,1,0,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL),(103,102,0,1,0,1,0,0,1,'2024-12-19 12:39:06.301014','2024-12-19 12:39:06.301014',NULL);
/*!40000 ALTER TABLE `working_schedule_templates` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-20  1:37:48
