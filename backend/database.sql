-- MySQL Script generated by MySQL Workbench
-- Tue Jun 13 14:48:54 2023
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema externatic
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `externatic` ;

-- -----------------------------------------------------
-- Schema externatic
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `externatic` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `externatic` ;

-- -----------------------------------------------------
-- Table `externatic`.`candidate`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `externatic`.`candidate` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `firstname` VARCHAR(45) NOT NULL,
  `birthday` DATE NOT NULL,
  `street` VARCHAR(45) NOT NULL,
  `city` VARCHAR(45) NOT NULL,
  `postalCode` VARCHAR(45) NOT NULL,
  `mail` VARCHAR(45) NOT NULL,
  `phone` VARCHAR(45) NOT NULL,
  `password` VARCHAR(200) NOT NULL,
  `jobSeeker` TINYINT NOT NULL,
  `picture` VARCHAR(200) NULL DEFAULT NULL,
  `resume` VARCHAR(150) NULL DEFAULT NULL,
  `contactPreference` VARCHAR(45) NOT NULL,
  `gender` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `mail_UNIQUE` (`mail` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `externatic`.`region`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `externatic`.`region` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `externatic`.`city`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `externatic`.`city` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `regionId` INT NOT NULL,
  `postalCode` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id`, `regionId`),
  INDEX `fk_city_region1_idx` (`regionId` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `externatic`.`contrat`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `externatic`.`contrat` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `type` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `externatic`.`job_title`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `externatic`.`job_title` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `externatic`.`candidate_filter`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `externatic`.`candidate_filter` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `candidate_id` INT NOT NULL,
  `city_id` INT NOT NULL,
  `job_title_id` INT NOT NULL,
  `contrat_id` INT NOT NULL,
  PRIMARY KEY (`id`, `candidate_id`, `city_id`, `job_title_id`, `contrat_id`),
  INDEX `fk_candidate_filter_candidate1_idx` (`candidate_id` ASC) VISIBLE,
  INDEX `fk_candidate_filter_city1_idx` (`city_id` ASC) VISIBLE,
  INDEX `fk_candidate_filter_job_title1_idx` (`job_title_id` ASC) VISIBLE,
  INDEX `fk_candidate_filter_contrat1_idx` (`contrat_id` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `externatic`.`compagny`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `externatic`.`compagny` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `siretNumber` VARCHAR(60) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `mail` VARCHAR(45) NOT NULL,
  `phone` VARCHAR(45) NOT NULL,
  `password` VARCHAR(200) NOT NULL,
 `Valide` TINYINT(1) NOT NULL DEFAULT '0',
  `Logo` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `externatic`.`consultant`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `externatic`.`consultant` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `firstname` VARCHAR(45) NOT NULL,
  `mail` VARCHAR(45) NOT NULL,
  `phone` VARCHAR(45) NOT NULL,
  `birthday` DATE NOT NULL,
  `password` VARCHAR(200) NOT NULL,
  `street` VARCHAR(45) NOT NULL,
  `city` VARCHAR(45) NOT NULL,
  `postalCode` VARCHAR(45) NOT NULL,
  `picture` VARCHAR(200) NULL DEFAULT NULL,
  `superAdmin` TINYINT NOT NULL,
  `gender` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `mail_UNIQUE` (`mail` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `externatic`.`filter`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `externatic`.`filter` (
  `candidateId` INT NOT NULL,
  `filterType` INT NOT NULL,
  `filterValue` INT NULL DEFAULT NULL,
  PRIMARY KEY (`candidateId`, `filterType`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `externatic`.`recruiter`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `externatic`.`recruiter` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `firstname` VARCHAR(45) NOT NULL,
  `mail` VARCHAR(45) NOT NULL,
  `phone` VARCHAR(45) NOT NULL,
  `birthday` DATE NOT NULL,
  `password` VARCHAR(200) NOT NULL,
  `street` VARCHAR(45) NOT NULL,
  `city` VARCHAR(45) NOT NULL,
  `postalCode` VARCHAR(45) NOT NULL,
  `valide` TINYINT NOT NULL DEFAULT '0',
  `picture` VARCHAR(200) NULL DEFAULT NULL,
  `compagny_id` INT NOT NULL,
  `gender` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`, `compagny_id`),
  UNIQUE INDEX `mail_UNIQUE` (`mail` ASC) VISIBLE,
  INDEX `fk_recruiter_compagny1_idx` (`compagny_id` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `externatic`.`remote`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `externatic`.`remote` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `type` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `externatic`.`offer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `externatic`.`offer` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `salary` VARCHAR(45) NOT NULL,
  `valide` TINYINT NOT NULL DEFAULT '0',
  `teamPicture` VARCHAR(355) NOT NULL,
 `jobOfferPresentation` TEXT NOT NULL,
  `desiredProfile` TEXT NOT NULL,
  `recruitmentProcess` TEXT NOT NULL,
  `numberOfEmployees` VARCHAR(45) NULL DEFAULT NULL,
  `jobTitleDetails` VARCHAR(45) NULL DEFAULT NULL,
  `cityId` INT NOT NULL,
  `consultantId` INT NOT NULL,
  `recruiterId` INT NOT NULL,
  `contratId` INT NOT NULL,
  `jobTitleId` INT NOT NULL,
  `remoteId` INT NOT NULL,
  PRIMARY KEY (`id`, `cityId`, `consultantId`, `recruiterId`, `contratId`, `jobTitleId`, `remoteId`),
  INDEX `fk_offer_city1_idx` (`cityId` ASC) VISIBLE,
  INDEX `fk_offer_consultant1_idx` (`consultantId` ASC) VISIBLE,
  INDEX `fk_offer_recruiter1_idx` (`recruiterId` ASC) VISIBLE,
  INDEX `fk_offer_contrat1_idx` (`contratId` ASC) VISIBLE,
  INDEX `fk_offer_job_title1_idx` (`jobTitleId` ASC) VISIBLE,
  INDEX `fk_offer_remote1_idx` (`remoteId` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `externatic`.`message`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `externatic`.`message` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `candidateId` INT NOT NULL,
  `offerId` INT NOT NULL,
  `date` DATE NOT NULL,
  `hour` TIME NOT NULL,
  `message` VARCHAR(255) NOT NULL,
  `candidateAutor` TINYINT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_messege_offer_idx` (`offerId` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `externatic`.`notification`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `externatic`.`notification` (
  `id` INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `externatic`.`offer_candidate`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `externatic`.`offer_candidate` (
  `offerId` INT NOT NULL,
  `candidateId` INT NOT NULL,
  `offer_statusId` INT NOT NULL,
  `liked` TINYINT NULL DEFAULT NULL,
  PRIMARY KEY (`offerId`, `candidateId`, `offer_statusId`),
  INDEX `fk_offer_has_candidate_candidate1_idx` (`candidateId` ASC) VISIBLE,
  INDEX `fk_offer_has_candidate_offer1_idx` (`offerId` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `externatic`.`offer_status`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `externatic`.`offer_status` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `text` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;



INSERT INTO
  compagny (siretNumber, name, mail, phone, password, Valide, logo)
 VALUES (
    '12342445212',
    'Fuse',
    'Fuse@fuse.fr',
    '0745985623',
    '$argon2id$v=19$m=65536,t=5,p=1$IsNJthLBR1c+C1GPrLR2KA$WLTaTCEOl8miqI7zoC4a4XSCUe5ys3Frm993R1L0wQA',
    '1',
    'default/Entreprise/fuse.png'
  ),
(
    '12342',
    'Instagram',
    'instagram@meta.com',
    '0687456985',
    '$argon2id$v=19$m=65536,t=5,p=1$IsNJthLBR1c+C1GPrLR2KA$WLTaTCEOl8miqI7zoC4a4XSCUe5ys3Frm993R1L0wQA',
    '1',
    'default/Entreprise/instagram.png'
  ),
  (
    '51484154513',
    'Lorem',
    'Lorem@ipsum.com',
    '0958461235',
    '$argon2id$v=19$m=65536,t=5,p=1$IsNJthLBR1c+C1GPrLR2KA$WLTaTCEOl8miqI7zoC4a4XSCUe5ys3Frm993R1L0wQA',
    '1',
    'default/Entreprise/lorem.png'
  ),
  (
  '5143',
  'Externatic',
  'externatic@gmail.com',
  '0974685235',
  '$argon2id$v=19$m=65536,t=5,p=1$IsNJthLBR1c+C1GPrLR2KA$WLTaTCEOl8miqI7zoC4a4XSCUe5ys3Frm993R1L0wQA',
  '1',
  'default/Candidat/favicon.png'
  );
  
  INSERT INTO
  region(name)VALUES("Île-de-France"), ("Rhône-Alpes");
  
  INSERT INTO
  city(name, regionId, postalCode)VALUES("Paris", 1,"75000"),("Versailles", 1,"78000"), ("Lyon", 2,"69000");
  
INSERT INTO consultant (name, firstname, mail, phone, birthday, password, street, city, postalCode, picture, superAdmin, gender)
VALUES ('Dupont', 'Jean', 'jdupont@example.com', '01.23.45.67.89', '1990-01-01', '$argon2id$v=19$m=65536,t=5,p=1$IsNJthLBR1c+C1GPrLR2KA$WLTaTCEOl8miqI7zoC4a4XSCUe5ys3Frm993R1L0wQA', '123 rue de la Paix', 'Paris', '75001', '/default/Consultant/femme.png', 0, 'male'),
('Exter', 'Natic', 'externatic@gmail.com', '0123456789', '1990-01-01', '$argon2id$v=19$m=65536,t=5,p=1$IsNJthLBR1c+C1GPrLR2KA$WLTaTCEOl8miqI7zoC4a4XSCUe5ys3Frm993R1L0wQA', '123 rue du externatic', 'Paris', '75001', '/default/Candidat/favicon.png', 1, 'male');

INSERT INTO recruiter (name, firstname, mail, phone, birthday, password, street, city, postalCode, valide, compagny_id, gender, picture)
VALUES ('Doe', 'John', 'johndoe@example.com', '0123456789', '1980-01-01', '$argon2id$v=19$m=65536,t=5,p=1$IsNJthLBR1c+C1GPrLR2KA$WLTaTCEOl8miqI7zoC4a4XSCUe5ys3Frm993R1L0wQA', '5th Avenue', 'New York', '10001', 1, 2, 'male', '/default/Consultant/marie.jpg'),
  ('Marie', 'Joe', 'mariejoe@example.com', '0123456789', '1980-01-01', '$argon2id$v=19$m=65536,t=5,p=1$IsNJthLBR1c+C1GPrLR2KA$WLTaTCEOl8miqI7zoC4a4XSCUe5ys3Frm993R1L0wQA', '5th Avenue', 'New York', '10001', 1, 1, 'male', '/default/Consultant/femme.png'),
  ('Patrick', 'Parent', 'patrickparent@example.com', '0123456789', '1980-01-01', '$argon2id$v=19$m=65536,t=5,p=1$IsNJthLBR1c+C1GPrLR2KA$WLTaTCEOl8miqI7zoC4a4XSCUe5ys3Frm993R1L0wQA', '5th Avenue', 'New York', '10001', 1, 3, 'male', '/default/Consultant/jo.jpg'),
  ('Exter', 'Natic', 'externatic@gmail.com', '0123456789', '1980-01-01', '$argon2id$v=19$m=65536,t=5,p=1$IsNJthLBR1c+C1GPrLR2KA$WLTaTCEOl8miqI7zoC4a4XSCUe5ys3Frm993R1L0wQA', '5th Avenue', 'New York', '10001', 1, 4, 'male', '/default/Candidat/favicon.png');

INSERT INTO contrat (type) VALUES ('CDI'), ('CDD'), ('Stage'), ('Alternance');

INSERT INTO job_title (name) VALUES ('Assistant Manager'), ('Développeur Web'), ('Développeur App'), ('Développeur Jeux Videos'), ('Game Developper');

INSERT INTO remote (type) VALUES ('Présentiel'), ('Présentiel/Télétravail'), ('Télétravail');

INSERT INTO offer (salary, remoteId, teamPicture, jobOfferPresentation, desiredProfile, recruitmentProcess, numberOfEmployees, jobTitleDetails, cityId, consultantId, recruiterId, contratId, jobTitleId, valide)
 VALUES ("20000", 1, "default/Offre/laptop.jpg", "jobOfferPresentation", "desiredProfile", "Recruitment Process", "23", "Ingénieur réseaux / H/F – Industrie", 1,1,1,2,1,1),
 ("30000", 2, "default/Offre/meeting.jpg", "Job Offer Presentation", "Desired Profile", "Recruitment Process", "50", "Software Engineer", 2, 1, 2, 3, 2, 1),
 ("40000", 1, "default/Offre/start-up.jpg", "Job Offer Presentation", "Desired Profile", "Recruitment Process", "100", "Senior Data Analyst", 3, 1, 1, 1, 3, 1),
 ("25000", 3, "default/Offre/meeting.jpg", "Job Offer Presentation", "Desired Profile", "Recruitment Process", "30", "Marketing Coordinator", 1, 1, 3, 2, 4, 1),
 ("50000", 2, "default/Offre/laptop.jpg", "Job Offer Presentation", "Desired Profile", "Recruitment Process", "70", "Senior Project Manager", 3, 1, 2, 1, 5, 1);


  INSERT INTO candidate
(`id`,
`name`,
`firstname`,
`birthday`,
`street`,
`city`,
`postalCode`,
`mail`,
`phone`,
`password`,
`jobSeeker`,
`picture`,
`resume`,
`contactPreference`,
`gender`
)
VALUES
(1, 'Jean', 'Gabin', '2000-01-10', 'Paul Bert', 'Lyon', '69000', 'Jean.gabin@gmail.com', '0601020304', '$argon2id$v=19$m=65536,t=5,p=1$+NlRs5ZjLo4lx0X2ZY3QpQ$DbFqZGJ0D0ZEmFUmRWWKICyKTyJnz3ZVLlSJ9Mdas/s', '1', '/default/Candidat/chatgpt.jpg', '/default/Candidat/BenjaminCV2.pdf', '2', 'masculin'),
(2, 'Benjamin', 'Chaillan', '2000-01-11', 'Gaston Doumer', 'Marseille', '13000', 'benjaminChaillan@gmail.com', '0605040302', '$argon2id$v=19$m=65536,t=5,p=1$+NlRs5ZjLo4lx0X2ZY3QpQ$DbFqZGJ0D0ZEmFUmRWWKICyKTyJnz3ZVLlSJ9Mdas/s', '1', 'default/Candidat/Benjamin.png', '/candidate/1/Lettrededcharge.pdf', '2','masculin'),
(3, 'Exter', 'Natic', '2000-01-10', 'Externarue', 'Lyon', '69000', 'externatic@gmail.com', '0601020304', '$argon2id$v=19$m=65536,t=5,p=1$IsNJthLBR1c+C1GPrLR2KA$WLTaTCEOl8miqI7zoC4a4XSCUe5ys3Frm993R1L0wQA', '1', '/default/Candidat/favicon.png', '/default/Candidat/BenjaminCV2.pdf', '2', 'masculin');

INSERT INTO offer_status
(`id`,`text`)
VALUES
(1, 'En attente de validation par un consultant'),
(2,'Validé'),
(3,'Terminé');

