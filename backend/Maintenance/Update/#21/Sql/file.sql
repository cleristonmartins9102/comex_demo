-- MySQL Workbench Synchronization
-- Generated: 2021-07-21 00:46
-- Model: New Model
-- Version: 1.0
-- Project: Name of the project
-- Author: cleriston
SET @OLD_UNIQUE_CHECKS = @@UNIQUE_CHECKS,
  UNIQUE_CHECKS = 0;
SET @OLD_FOREIGN_KEY_CHECKS = @@FOREIGN_KEY_CHECKS,
  FOREIGN_KEY_CHECKS = 0;
SET @OLD_SQL_MODE = @@SQL_MODE,
  SQL_MODE = 'TRADITIONAL,ALLOW_INVALID_DATES';
show CREATE VIEW VwProposta 

alter view VwProposta AS
select `prop`.`id_proposta` AS `id_proposta`,
  `prop`.`id_cliente` AS `id_cliente`,
  `prop`.`id_vendedor` AS `id_vendedor`,
  `prop`.`id_aceite` AS `id_aceite`,
  `prop`.`id_doc_proposta` AS `id_doc_proposta`,
  `regime`.`legenda` AS `regime`,
  `prop`.`created_at` AS `created_at`,
  `prop`.`dta_aceite` AS `dta_aceite`,
  `prop`.`dta_emissao` AS `dta_emissao`,
  `prop`.`dta_validade` AS `dta_validade`,
  `prop`.`numero` AS `numero`,
  `prop`.`prazo_pagamento` AS `prazo_pagamento`,
  `prop`.`status` AS `status`,
  `prop`.`tipo` AS `tipo`,
  `prop`.`updated_at` AS `updated_at`,
  `ind`.`nome` AS `cliente`,
  `coad`.`nome` AS `coadjuvante`,
  `qua`.`nome` AS `qualificacao`,
  if(
    (DATEDIFF(prop.dta_validade, now()) <= 0), 'expirado', if((DATEDIFF(prop.dta_validade, now()) <= 30), 'vencendo', 'válido')
  ) as valid
from (
    (
      (
        (
          `Proposta` `prop`
          left join `Individuo` `ind` on((`ind`.`id_individuo` = `prop`.`id_cliente`))
        )
        left join `Individuo` `coad` on(
          (`coad`.`id_individuo` = `prop`.`id_coadjuvante`)
        )
      )
      left join `Qualificacao` `qua` on(
        (
          `qua`.`id_qualificacao` = `prop`.`id_qualificacao`
        )
      )
    )
    left join `Regime` `regime` on((`regime`.`id_regime` = `prop`.`id_regime`))
  )
SET SQL_MODE = @OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS = @OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS = @OLD_UNIQUE_CHECKS;