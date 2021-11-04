-- MySQL Workbench Synchronization
-- Generated: 2021-07-21 00:46
-- Model: New Model
-- Version: 1.0
-- Project: Name of the project
-- Author: cleriston

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

ALTER TABLE `zoho`.`Processo` 
DROP COLUMN `id_fornecedor`,
ADD COLUMN `id_fornecedor` VARCHAR(50) NOT NULL AFTER `id_processostatus`,
ADD INDEX `fk_Processo_Individuo1_idx` (`id_fornecedor` ASC),
DROP INDEX `fk_Processo_Individuo1_idx` ;
;

ALTER TABLE `zoho`.`Processo` 
ADD CONSTRAINT `fk_Processo_Individuo1`
  FOREIGN KEY (`id_fornecedor`)
  REFERENCES `zoho`.`Individuo` (`id_individuo`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

