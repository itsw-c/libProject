-- --------------------------------------------------------
-- 호스트:                          127.0.0.1
-- 서버 버전:                        11.4.2-MariaDB - mariadb.org binary distribution
-- 서버 OS:                        Win64
-- HeidiSQL 버전:                  12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- lib 데이터베이스 구조 내보내기
CREATE DATABASE IF NOT EXISTS `lib` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `lib`;

-- 테이블 lib.board 구조 내보내기
CREATE TABLE IF NOT EXISTS `board` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `content` text NOT NULL,
  `writer` varchar(50) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `views` int(11) DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 테이블 데이터 lib.board:~5 rows (대략적) 내보내기
INSERT INTO `board` (`id`, `title`, `content`, `writer`, `created_at`, `views`) VALUES
	(1, '첫번째 게시글입니다', '첫번째 게시글입니다', '홍길동', '2024-12-12 09:37:18', 9),
	(2, '게시판 이용 안내', '이 게시판은 자유롭게 의견을 나눌 수 있는 공간입니다. 서로 배려하며 사용해주세요.', '김철수', '2024-12-12 09:37:18', 5),
	(3, '게시판 이용 안내', '이 게시판은 자유롭게 의견을 나눌 수 있는 공간입니다. 서로 배려하며 사용해주세요.ㅁㄹㄴㅇㅁㄴㅇㄻㄴㅇㄹㄴㅇ', '김철수', '2024-12-12 09:37:35', 25),
	(6, '자유게시판입니다', '안녕하세요', '강다연', '2024-12-19 01:54:49', 0),
	(7, '자유게시판입니다', '자유롭게 이용가능합니다.', '강다연2', '2024-12-19 02:03:08', 1);

-- 테이블 lib.notice 구조 내보내기
CREATE TABLE IF NOT EXISTS `notice` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `content` text NOT NULL,
  `writer` varchar(50) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `views` int(11) DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 테이블 데이터 lib.notice:~12 rows (대략적) 내보내기
INSERT INTO `notice` (`id`, `title`, `content`, `writer`, `created_at`, `views`) VALUES
	(1, '공지 수정 테스트', '안녕하세요\n공지 테스트 중입니다.\n수정되었을까요?', '관리자', '2024-12-14 20:17:07', 7),
	(8, '첫 번째 공지사항', '이것은 첫 번째 공지사항의 내용입니다.', '관리자', '2024-12-14 21:54:04', 0),
	(9, '두 번째 공지사항', '이것은 두 번째 공지사항의 내용입니다.', '관리자', '2024-12-14 21:54:04', 0),
	(10, '세 번째 공지사항', '이것은 세 번째 공지사항의 내용입니다.', '관리자', '2024-12-14 21:54:04', 0),
	(11, '네 번째 공지사항', '이것은 네 번째 공지사항의 내용입니다.', '관리자', '2024-12-14 21:54:04', 0),
	(12, '다섯 번째 공지사항', '이것은 다섯 번째 공지사항의 내용입니다.', '관리자', '2024-12-14 21:54:04', 1),
	(13, '여섯 번째 공지사항', '이것은 여섯 번째 공지사항의 내용입니다.', '관리자', '2024-12-14 21:54:04', 1),
	(14, '일곱 번째 공지사항', '이것은 일곱 번째 공지사항의 내용입니다.', '관리자', '2024-12-14 21:54:04', 0),
	(15, '여덟 번째 공지사항', '이것은 여덟 번째 공지사항의 내용입니다.', '관리자', '2024-12-14 21:54:04', 5),
	(16, '아홉 번째 공지사항', '이것은 아홉 번째 공지사항의 내용입니다.', '관리자', '2024-12-14 21:54:04', 2),
	(17, '열 번째 공지사항', '이것은 열 번째 공지사항의 내용입니다.', '관리자', '2024-12-14 21:54:04', 5),
	(20, '공지사항은 관리자만 수정/삭제할 수 있습니다.', '공지사항입니다.', '관리자', '2024-12-19 01:57:12', 1);

-- 테이블 lib.users 구조 내보내기
CREATE TABLE IF NOT EXISTS `users` (
  `userid` varchar(255) NOT NULL,
  `userpw` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `birth` date DEFAULT NULL,
  `addr` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`userid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 테이블 데이터 lib.users:~4 rows (대략적) 내보내기
INSERT INTO `users` (`userid`, `userpw`, `name`, `birth`, `addr`) VALUES
	('admin', '1234', '관리자', '2024-11-30', '1234'),
	('dayoun', '1234', '강다연', '1999-08-14', '1234'),
	('kang', '4321', '강다연', '1999-08-13', '1234'),
	('test', '1234', '테스트', '2021-12-05', '1234');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
