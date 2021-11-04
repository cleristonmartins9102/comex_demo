

alter ALGORITHM = UNDEFINED VIEW `VwComissao` AS
select `fatura`.`valor` AS `valor_fatura`,
    `fatura`.`numero` AS `numero`,
    `fatura`.`dta_vencimento` AS `dta_vencimento`,
    `fatura`.`dta_emissao` AS `dta_emissao`,
    `cliente`.`nome` AS `cliente`,
    `despachante`.`nome` AS `comissionado`,
    `comissionariotipo`.`tipo` AS `tipo_comissionado`,
    `unicob`.`unidade` AS `unicob`,
    `comissionario`.`valor_comissao` AS `taxa`,
    if(`lib_documento`.`id_docdi`, 'DI', 'DTA') AS `tipo_documento`,
    `liberacao`.`documento` AS `documento`,
(
        select count(0)
        from `CaptacaoContainer`
        where (
                `CaptacaoContainer`.`id_captacao` = `fatura`.`id_captacao`
            )
    ) AS `qtd_cntr`,
    group_concat(`container`.`codigo` separator '<br>') AS `container`,
    if(
        `comappcob`.`id_comissionarioappcob`,
        `comappcob`.`legenda`,
        NULL
    ) AS `app_cob`,
    if(
        (`unicob`.`unidade` = 'moeda'),
        if(
            (`comappcob`.`legenda` = 'processo'),
            `comissionario`.`valor_comissao`,
(
                (
                    select count(0)
                    from `CaptacaoContainer`
                    where (
                            `CaptacaoContainer`.`id_captacao` = `fatura`.`id_captacao`
                        )
                ) * `comissionario`.`valor_comissao`
            )
        ),
(
            (
                `comissionario`.`valor_comissao` * `fatura`.`valor`
            ) / 100
        )
    ) AS `valor_comissao`,
    `liberacao`.`valor_mercadoria` AS `valor_mercadoria`,
    `fatura`.`created_at` AS `created_at`,
    `fatura`.`updated_at` AS `updated_at`,
    `fatura`.`created_by` AS `created_by`,
    `fatura`.`updated_by` AS `updated_by`
from (
        (
            (
                (
                    (
                        (
                            (
                                (
                                    (
                                        (
                                            (
                                                (
                                                    `Fatura` `fatura`
                                                    left join `Captacao` `captacao` on(
                                                        (
                                                            `captacao`.`id_captacao` = `fatura`.`id_captacao`
                                                        )
                                                    )
                                                )
                                                left join `CaptacaoContainer` `capcontainer` on(
                                                    (
                                                        `capcontainer`.`id_captacao` = `fatura`.`id_captacao`
                                                    )
                                                )
                                            )
                                            left join `Container` `container` on(
                                                (
                                                    `capcontainer`.`id_container` = `container`.`id_container`
                                                )
                                            )
                                        )
                                        left join `Proposta` `proposta` on(
                                            (
                                                `proposta`.`id_proposta` = `captacao`.`id_proposta`
                                            )
                                        )
                                    )
                                    left join `Individuo` `despachante` on(
                                        (
                                            `despachante`.`id_individuo` = `captacao`.`id_despachante`
                                        )
                                    )
                                )
                                left join `Individuo` `cliente` on(
                                    (
                                        `cliente`.`id_individuo` = `proposta`.`id_cliente`
                                    )
                                )
                            )
                            left join `Liberacao` `liberacao` on(
                                (
                                    `liberacao`.`id_captacao` = `fatura`.`id_captacao`
                                )
                            )
                        )
                        left join `LiberacaoDocumento` `lib_documento` on(
                            (
                                `lib_documento`.`id_liberacao` = `liberacao`.`id_liberacao`
                            )
                        )
                    )
                    left join `Comissionario` `comissionario` on(
                        (
                            `comissionario`.`id_comissionado` = `despachante`.`id_individuo`
                        )
                    )
                )
                left join `ComissionarioTipo` `comissionariotipo` on(
                    (
                        `comissionariotipo`.`id_comissionariotipo` = `comissionario`.`id_comissionariotipo`
                    )
                )
            )
            left join `ComissionarioAppCob` `comappcob` on(
                (
                    `comappcob`.`id_comissionarioappcob` = `comissionario`.`id_comissionarioappcob`
                )
            )
        )
        left join `UniCob` `unicob` on(
            (
                `unicob`.`id_unicob` = `comissionario`.`id_unicob`
            )
        )
    )
where (
        (
            `comissionario`.`id_comissionariostatus` = (
                select `ComissionarioStatus`.`id_comissionariostatus`
                from `ComissionarioStatus`
                where (`ComissionarioStatus`.`status` = 'ativo')
            )
        )
        and `fatura`.`id_fatura` in (
            select `FaturaComissoesDesativadas`.`id_fatura`
            from `FaturaComissoesDesativadas`
        ) is false
    )
group by `captacao`.`id_captacao`
union
select `fatura`.`valor` AS `valor_fatura`,
    `fatura`.`numero` AS `numero`,
    `fatura`.`dta_vencimento` AS `dta_vencimento`,
    `fatura`.`dta_emissao` AS `dta_emissao`,
    `cliente`.`nome` AS `cliente`,
    `vendedor`.`nome` AS `comissionado`,
    `comissionariotipo`.`tipo` AS `tipo_comissionado`,
    `unicob`.`unidade` AS `unicob`,
    `comissionario`.`valor_comissao` AS `taxa`,
    if(`lib_documento`.`id_docdi`, 'DI', 'DTA') AS `tipo_documento`,
    `liberacao`.`documento` AS `documento`,
(
        select count(0)
        from `CaptacaoContainer`
        where (
                `CaptacaoContainer`.`id_captacao` = `fatura`.`id_captacao`
            )
    ) AS `qtd_cntr`,
    group_concat(`container`.`codigo` separator '<br>') AS `container`,
    if(
        `comappcob`.`id_comissionarioappcob`,
        `comappcob`.`legenda`,
        NULL
    ) AS `app_cob`,
    if(
        (`unicob`.`unidade` = 'moeda'),
        if(
            (`comappcob`.`legenda` = 'processo'),
            `comissionario`.`valor_comissao`,
(
                (
                    select count(0)
                    from `CaptacaoContainer`
                    where (
                            `CaptacaoContainer`.`id_captacao` = `fatura`.`id_captacao`
                        )
                ) * `comissionario`.`valor_comissao`
            )
        ),
(
            (
                `comissionario`.`valor_comissao` * `fatura`.`valor`
            ) / 100
        )
    ) AS `valor_comissao`,
    `liberacao`.`valor_mercadoria` AS `valor_mercadoria`,
    `fatura`.`created_at` AS `created_at`,
    `fatura`.`updated_at` AS `updated_at`,
    `fatura`.`created_by` AS `created_by`,
    `fatura`.`updated_by` AS `updated_by`
from (
        (
            (
                (
                    (
                        (
                            (
                                (
                                    (
                                        (
                                            (
                                                (
                                                    `Fatura` `fatura`
                                                    left join `Captacao` `captacao` on(
                                                        (
                                                            `captacao`.`id_captacao` = `fatura`.`id_captacao`
                                                        )
                                                    )
                                                )
                                                left join `CaptacaoContainer` `capcontainer` on(
                                                    (
                                                        `capcontainer`.`id_captacao` = `fatura`.`id_captacao`
                                                    )
                                                )
                                            )
                                            left join `Container` `container` on(
                                                (
                                                    `capcontainer`.`id_container` = `container`.`id_container`
                                                )
                                            )
                                        )
                                        left join `Proposta` `proposta` on(
                                            (
                                                `proposta`.`id_proposta` = `captacao`.`id_proposta`
                                            )
                                        )
                                    )
                                    left join `Individuo` `vendedor` on(
                                        (
                                            `vendedor`.`id_individuo` = (
                                                select `Vendedor`.`id_individuo`
                                                from `Vendedor`
                                                where (
                                                        `Vendedor`.`id_vendedor` = `proposta`.`id_vendedor`
                                                    )
                                            )
                                        )
                                    )
                                )
                                left join `Individuo` `cliente` on(
                                    (
                                        `cliente`.`id_individuo` = `proposta`.`id_cliente`
                                    )
                                )
                            )
                            left join `Liberacao` `liberacao` on(
                                (
                                    `liberacao`.`id_captacao` = `fatura`.`id_captacao`
                                )
                            )
                        )
                        left join `LiberacaoDocumento` `lib_documento` on(
                            (
                                `lib_documento`.`id_liberacao` = `liberacao`.`id_liberacao`
                            )
                        )
                    )
                    left join `Comissionario` `comissionario` on(
                        (
                            `comissionario`.`id_comissionado` = `vendedor`.`id_individuo`
                        )
                    )
                )
                left join `ComissionarioTipo` `comissionariotipo` on(
                    (
                        `comissionariotipo`.`id_comissionariotipo` = `comissionario`.`id_comissionariotipo`
                    )
                )
            )
            left join `ComissionarioAppCob` `comappcob` on(
                (
                    `comappcob`.`id_comissionarioappcob` = `comissionario`.`id_comissionarioappcob`
                )
            )
        )
        left join `UniCob` `unicob` on(
            (
                `unicob`.`id_unicob` = `comissionario`.`id_unicob`
            )
        )
    )
where (
        (
            `comissionario`.`id_comissionariostatus` = (
                select `ComissionarioStatus`.`id_comissionariostatus`
                from `ComissionarioStatus`
                where (`ComissionarioStatus`.`status` = 'ativo')
            )
        )
        and `fatura`.`id_fatura` in (
            select `FaturaComissoesDesativadas`.`id_fatura`
            from `FaturaComissoesDesativadas`
        ) is false
    )
group by `captacao`.`id_captacao`
union
select `fatura`.`valor` AS `valor_fatura`,
    `fatura`.`numero` AS `numero`,
    `fatura`.`dta_vencimento` AS `dta_vencimento`,
    `fatura`.`dta_emissao` AS `dta_emissao`,
    `cliente`.`nome` AS `cliente`,
    `agente_de_carga`.`nome` AS `comissionado`,
    `comissionariotipo`.`tipo` AS `tipo_comissionado`,
    `unicob`.`unidade` AS `unicob`,
    `comissionario`.`valor_comissao` AS `taxa`,
    if(`lib_documento`.`id_docdi`, 'DI', 'DTA') AS `tipo_documento`,
    `liberacao`.`documento` AS `documento`,
(
        select count(0)
        from `CaptacaoContainer`
        where (
                `CaptacaoContainer`.`id_captacao` = `fatura`.`id_captacao`
            )
    ) AS `qtd_cntr`,
    group_concat(`container`.`codigo` separator '<br>') AS `container`,
    if(
        `comappcob`.`id_comissionarioappcob`,
        `comappcob`.`legenda`,
        NULL
    ) AS `app_cob`,
    if(
        (`unicob`.`unidade` = 'moeda'),
        if(
            (`comappcob`.`legenda` = 'processo'),
            `comissionario`.`valor_comissao`,
(
                (
                    select count(0)
                    from `CaptacaoContainer`
                    where (
                            `CaptacaoContainer`.`id_captacao` = `fatura`.`id_captacao`
                        )
                ) * `comissionario`.`valor_comissao`
            )
        ),
(
            (
                `comissionario`.`valor_comissao` * `fatura`.`valor`
            ) / 100
        )
    ) AS `valor_comissao`,
    `liberacao`.`valor_mercadoria` AS `valor_mercadoria`,
    `fatura`.`created_at` AS `created_at`,
    `fatura`.`updated_at` AS `updated_at`,
    `fatura`.`created_by` AS `created_by`,
    `fatura`.`updated_by` AS `updated_by`
from (
        (
            (
                (
                    (
                        (
                            (
                                (
                                    (
                                        (
                                            (
                                                (
                                                    `Fatura` `fatura`
                                                    left join `Captacao` `captacao` on(
                                                        (
                                                            `captacao`.`id_captacao` = `fatura`.`id_captacao`
                                                        )
                                                    )
                                                )
                                                left join `CaptacaoContainer` `capcontainer` on(
                                                    (
                                                        `capcontainer`.`id_captacao` = `fatura`.`id_captacao`
                                                    )
                                                )
                                            )
                                            left join `Container` `container` on(
                                                (
                                                    `capcontainer`.`id_container` = `container`.`id_container`
                                                )
                                            )
                                        )
                                        left join `Proposta` `proposta` on(
                                            (
                                                `proposta`.`id_proposta` = `captacao`.`id_proposta`
                                            )
                                        )
                                    )
                                    left join `Individuo` `agente_de_carga` on(
                                        (
                                            `agente_de_carga`.`id_individuo` = `captacao`.`id_agentedecarga`
                                        )
                                    )
                                )
                                left join `Individuo` `cliente` on(
                                    (
                                        `cliente`.`id_individuo` = `proposta`.`id_cliente`
                                    )
                                )
                            )
                            left join `Liberacao` `liberacao` on(
                                (
                                    `liberacao`.`id_captacao` = `fatura`.`id_captacao`
                                )
                            )
                        )
                        left join `LiberacaoDocumento` `lib_documento` on(
                            (
                                `lib_documento`.`id_liberacao` = `liberacao`.`id_liberacao`
                            )
                        )
                    )
                    left join `Comissionario` `comissionario` on(
                        (
                            `comissionario`.`id_comissionado` = `agente_de_carga`.`id_individuo`
                        )
                    )
                )
                left join `ComissionarioTipo` `comissionariotipo` on(
                    (
                        `comissionariotipo`.`id_comissionariotipo` = `comissionario`.`id_comissionariotipo`
                    )
                )
            )
            left join `ComissionarioAppCob` `comappcob` on(
                (
                    `comappcob`.`id_comissionarioappcob` = `comissionario`.`id_comissionarioappcob`
                )
            )
        )
        left join `UniCob` `unicob` on(
            (
                `unicob`.`id_unicob` = `comissionario`.`id_unicob`
            )
        )
    )
where (
        (
            `comissionario`.`id_comissionariostatus` = (
                select `ComissionarioStatus`.`id_comissionariostatus`
                from `ComissionarioStatus`
                where (`ComissionarioStatus`.`status` = 'ativo')
            )
        )
        and `fatura`.`id_fatura` in (
            select `FaturaComissoesDesativadas`.`id_fatura`
            from `FaturaComissoesDesativadas`
        ) is false
    )
group by `captacao`.`id_captacao`
-- order by `comissionado`

insert into GrupoAcessoModuloSub VALUES(12,51,5)
