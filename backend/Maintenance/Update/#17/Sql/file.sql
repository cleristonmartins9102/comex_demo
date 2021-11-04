-- MySQL Workbench Synchronization
-- Generated: 2021-07-21 00:46
-- Model: New Model
-- Version: 1.0
-- Project: Name of the project
-- Author: cleriston

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

describe Proposta
describe Terminal

create table PropostaTerminal (
  id_proposta int not null,
  id_terminal int not null,
  CONSTRAINT fk_propostaterminal_prop FOREIGN KEY (id_proposta) REFERENCES Proposta(id_proposta),
  CONSTRAINT fk_propostaterminal_term FOREIGN KEY (id_terminal) REFERENCES Terminal(id_terminal)
)


select * from PropostaTerminal

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

