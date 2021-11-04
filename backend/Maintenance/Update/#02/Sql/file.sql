-- MySQL Workbench Synchronization
-- Generated: 2021-07-21 00:46
-- Model: New Model
-- Version: 1.0
-- Project: Name of the project
-- Author: cleriston
ALTER TABLE `zoho`.`Predicado` 
CHARACTER SET = utf8 , COLLATE = utf8_general_ci ,
CHANGE COLUMN `updated_at` `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP ;

INSERT INTO Predicado VALUES(307, 20, 3, NULL, '2° período - pró rata', '2° período - pró rata', 'no', now(), null, null, null)

-- Creating Rule table
CREATE TABLE Rule
  (
    id_rule INT unsigned NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
  )
--
-- Creating ChargeRule table
CREATE TABLE ChargeRule (
  id_chargerule INT unsigned NOT NULL PRIMARY KEY,
  id_rule INT UNSIGNED NOT NULL,
  id_predicado INT UNSIGNED NOT NULL,
  id_terminal INT UNSIGNED NOT NULL,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIME,
  updated_at TIMESTAMP NULL,
  created_by VARCHAR(150),
  updated_by VARCHAR(150)
)
<<<<<<< HEAD
--
select * from Predicado where nome LIKE '%periodo%'
select * from Servico

--Changed predicado family MEMBER
  -- Creatind PredicadoFamily TABLE
    CREATE TABLE PredicadoFamily (
      id_predicadofamily INT unsigned NOT NULL PRIMARY KEY,
      name VARCHAR(100) NOT NULL
    )
  --

  --Inserting record Segundo Periodo
    INSERT INTO PredicadoFamily VALUES(4, 'seguro')
    INSERT INTO PredicadoFamily VALUES(1, 'segundo periodo')
    INSERT INTO PredicadoFamily VALUES(3, 'pacote de armazenagem')
    INSERT INTO PredicadoFamily VALUES(2, 'general')
<<<<<<< HEAD

=======
    INSERT INTO PredicadoFamily VALUES(5, 'ddc')
    INSERT INTO PredicadoFamily VALUES(6, 'adicional armazenagem')
    INSERT INTO PredicadoFamily VALUES(7, 'pacote importacao')
>>>>>>> 5f693897fa3542ebcd54e614c1c28b0439439e88
  --

  --Creating Foreing KEY on the Predicado TABLE
    ALTER TABLE Predicado ADD COLUMN (
      id_predicadofamily INT UNSIGNED NOT NULL DEFAULT 1,
      CONSTRAINT fk_predicado_family FOREIGN KEY (id_predicadofamily) REFERENCES PredicadoFamily(id_predicadofamily)
    )

    ALTER TABLE Predicado MODIFY 
      id_predicadofamily INT UNSIGNED NOT NULL

    UPDATE Predicado set id_predicadofamily=2
    UPDATE Predicado set id_predicadofamily=3 where nome LIKE '%pacote servicos importacao%'
    UPDATE Predicado set id_predicadofamily=4 where nome LIKE '%seguro%'
    UPDATE Predicado set id_predicadofamily=1 where id_predicado=307 or id_predicado=61
    

    ALTER TABLE Predicado modify
    id_predicadofamily INT UNSIGNED NULL DEFAULT NULL
    
    
  --
--


-- Adding new rule record
INSERT INTO Rule VALUES(1, 'primeiro-periodo-por-terminal')
INSERT INTO Rule VALUES(2, 'segundo-periodo-pro-rata-por-terminal')
--

--Adding new Predicado segundo periodo
INSERT INTO Predicado VALUES(307, 20, 3, null, '2º período pro-rata', '2º período pro-rata', 'no', now(), now(), null, null, 1)
--
describe Predicado
-- Adding new ChargeRule record
INSERT INTO ChargeRule VALUES
(1, 1, 79, 5, 'primeiro periodo', 10, NOW(), null, null,null)

INSERT INTO ChargeRule VALUES
(2, 2, 307, 5, 'segundo periodo', null, NOW(), null, null,null)
--


--Adding new ItemNecessita record 
INSERT INTO ItemNecessita VALUES(7, 307,54,2)
--

--Adding new PredProAppValor record
INSERT INTO PredProAppValor VALUES(17, 'por dia - sobre cif', now(), null, null, null)
--
<<<<<<< HEAD
select * from Predicado 
=======
>>>>>>> parent of 462e4b45... feat: item padrao BTP segundo periodo
=======

=======
>>>>>>> parent of 462e4b45... feat: item padrao BTP segundo periodo

UPDATE Predicado set id_predicadofamily=6 where id_predicado=63 or id_predicado=64
UPDATE Predicado set id_predicadofamily=7 where id_predicado=79
INSERT INTO `ItemCondicional` (`id_predicadomaster`, `id_predicadocondicionado`, `prioridade`, `tipo`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES (307, 64, '1', 'excesso_valormercadoria', '', '', null, NULL);

>>>>>>> 5f693897fa3542ebcd54e614c1c28b0439439e88



