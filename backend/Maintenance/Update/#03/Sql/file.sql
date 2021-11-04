-- MySQL Workbench Synchronization
-- Generated: 2021-07-21 00:46
-- Model: New Model
-- Version: 1.0
-- Project: Name of the project
-- Author: cleriston
ALTER TABLE `zoho`.`Predicado` 
CHARACTER SET = utf8 , COLLATE = utf8_general_ci ,
CHANGE COLUMN `updated_at` `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP ;


show CREATE VIEW VwProcesso

ALTER ALGORITHM = UNDEFINED DEFINER = `root` @`localhost` SQL SECURITY DEFINER VIEW `VwProcesso` AS 
select 
  if(
    `processo`.`id_despacho`, 
    `despacho`.`numero`, 
    if(
      `captacao`.`id_captacao`, 
      `captacao`.`id_captacao`, 
      group_concat(
        `lote`.`id_captacao` separator '<br>'
      )
    )
  ) AS `identificador`, 
  if(
    `processo`.`id_despacho`, 
    (
      select 
        `Proposta`.`numero` 
      from 
        `Proposta` 
      where 
        (
          `Proposta`.`id_proposta` = `despacho`.`id_proposta`
        )
    ), 
    if(
      `captacao`.`id_captacao`, 
      `proposta`.`numero`, 
      group_concat(
        `lote`.`proposta_numero` separator '<br>'
      )
    )
  ) AS `proposta_numero`, 
  if(
    `processo`.`id_despacho`, 
    (
      select 
        `Individuo`.`nome` 
      from 
        `Individuo` 
      where 
        (
          `Individuo`.`id_individuo` = (
            select 
              `Proposta`.`id_cliente` 
            from 
              `Proposta` 
            where 
              (
                `Proposta`.`id_proposta` = `despacho`.`id_proposta`
              )
          )
        )
    ), 
    if(
      `captacao`.`id_captacao`, 
      `cliente`.`nome`, 
      group_concat(
        `lote`.`cliente_nome` separator '<br>'
      )
    )
  ) AS `cliente_nome`, 
  if(
    `captacao`.`id_captacao`, 
    `captacao`.`ref_importador`, 
    group_concat(
      `lote`.`ref_importador` separator '<br>'
    )
  ) AS `ref_importador`, 
  if(
    `captacao`.`id_captacao`, `captacao`.`id_captacao`, 
    NULL
  ) AS `id_captacao`, 
  if(
    (
      (
        0 <> `processo`.`id_captacaolote`
      ) 
      or (`regime`.`regime` = 'importacao')
    ), 
    'Importação', 
    'Exportação'
  ) AS `regime_legenda`, 
  if(
    `captacao`.`id_captacao`, 
    `captacao`.`imo`, 
    convert(
      group_concat(
        if(
          (`lote`.`imo` = 'nao'), 
          'Não', 
          'Sim'
        ) separator '<br>'
      ) using utf8
    )
  ) AS `imo`, 
  `liberacao`.`documento` AS `documento`, 
  `processo`.`id_processo` AS `id_processo`, 
  `processo`.`id_captacaolote` AS `id_captacaolote`, 
  `processo`.`id_despacho` AS `id_despacho`, 
  `processo`.`numero` AS `processo_numero`, 
  if (processo.id_captacaolote, null, if (`processo`.`valor_mercadoria`, processo.valor_mercadoria, (select valor_mercadoria from Liberacao where id_captacao=processo.id_captacao))) AS `valor_mercadoria`, 
  `processo`.`mercadoria` AS `mercadoria`, 
  `processo_status`.`status` AS `status`, 
  `processo`.`created_at` AS `created_at`, 
  `processo`.`updated_at` AS `updated_at`, 
  group_concat(
    if(
      (`lote`.`tipo_operacao` = 'DDC'), 
      'Sim', 
      'Não'
    ) separator '<br>'
  ) AS `tipo_operacao` 
from 
  (
    (
      (
        (
          (
            (
              (
                (
                  `Processo` `processo` 
                  left join `ProcessoStatus` `processo_status` on(
                    (
                      `processo_status`.`id_processostatus` = `processo`.`id_processostatus`
                    )
                  )
                ) 
                left join `Captacao` `captacao` on(
                  (
                    `captacao`.`id_captacao` = `processo`.`id_captacao`
                  )
                )
              ) 
              left join `Despacho` `despacho` on(
                (
                  `despacho`.`id_despacho` = `processo`.`id_despacho`
                )
              )
            ) 
            left join `Liberacao` `liberacao` on(
              (
                `liberacao`.`id_captacao` = `captacao`.`id_captacao`
              )
            )
          ) 
          left join `Proposta` `proposta` on(
            (
              `proposta`.`id_proposta` = `captacao`.`id_proposta`
            )
          )
        ) 
        left join `Regime` `regime` on(
          (
            `regime`.`id_regime` = `proposta`.`id_regime`
          )
        )
      ) 
      left join `Individuo` `cliente` on(
        (
          `cliente`.`id_individuo` = `proposta`.`id_cliente`
        )
      )
    ) 
    left join `VwCaptacaoLoteCaptacao` `lote` on(
      (
        `lote`.`id_captacaolote` = if(
          `processo`.`id_captacaolote`, 
          (
            select 
              `CaptacaoLoteCaptacao`.`id_captacaolote` 
            from 
              `CaptacaoLoteCaptacao` 
            where 
              (
                `CaptacaoLoteCaptacao`.`id_captacaolote` = `processo`.`id_captacaolote`
              ) 
            limit 
              1
          ), 
          NULL
        )
      )
    )
  ) 
group by 
  `processo`.`id_processo`


select * from VwProcesso
