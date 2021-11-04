-- MySQL Workbench Synchronization
-- Generated: 2021-07-21 00:46
-- Model: New Model
-- Version: 1.0
-- Project: Name of the project
-- Author: cleriston

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

ALTER TABLE `zoho`.`PropostaParentela` 
DROP FOREIGN KEY `fk_Proposta_has_Proposta_Proposta_filha`;

ALTER TABLE `zoho`.`PropostaParentela` 
ADD CONSTRAINT `fk_Proposta_has_Proposta_Proposta_filha`
  FOREIGN KEY (`id_filho`)
  REFERENCES `zoho`.`Proposta` (`id_proposta`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;


