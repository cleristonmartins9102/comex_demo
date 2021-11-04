
alter ALGORITHM = UNDEFINED VIEW `VwComissao` AS
select fatura.numero,
    fatura.valor valor_fatura,
    fatura.dta_vencimento dta_vencimento,
    fatura.dta_emissao dta_emissao,
    cliente.nome cliente,
    cap.numero captacao,
    desp.nome comissionado,
    despachante.valor_comissao taxa,
    unicob.unidade unicob,
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
            `despachante`.`valor_comissao`,
            (
                (
                    select count(0)
                    from `CaptacaoContainer`
                    where (
                            `CaptacaoContainer`.`id_captacao` = `fatura`.`id_captacao`
                        )
                ) * `despachante`.`valor_comissao`
            )
        ),
        (
            (
                `despachante`.`valor_comissao` * `fatura`.`valor`
            ) / 100
        )
    ) AS `valor_comissao`,
    `liberacao`.`valor_mercadoria` AS `valor_mercadoria`,
    `fatura`.`created_at` AS `created_at`,
    `fatura`.`updated_at` AS `updated_at`,
    `fatura`.`created_by` AS `created_by`,
    `fatura`.`updated_by` AS `updated_by`,
    'despachante' tipo_comissionado
from Fatura fatura
    left join Captacao cap on cap.id_captacao = fatura.id_captacao
    left join Proposta prop on prop.id_proposta = cap.id_proposta
    inner join Individuo cliente on cliente.id_individuo = prop.id_cliente
    inner join Comissionario despachante on despachante.id_comissionado = cap.id_despachante  and despachante.id_comissionariotipo = 1
    inner join Individuo desp on desp.id_individuo = despachante.id_comissionado
    inner join UniCob unicob on unicob.id_unicob = despachante.id_unicob
    inner join Liberacao liberacao on liberacao.id_captacao = fatura.id_captacao
    inner join LiberacaoDocumento lib_documento on lib_documento.id_liberacao = liberacao.id_liberacao
    left join CaptacaoContainer capcontainer on capcontainer.id_captacao=fatura.id_captacao
    left join Container container on capcontainer.id_container=container.id_container
    left join ComissionarioAppCob comappcob on comappcob.id_comissionarioappcob=despachante.id_comissionarioappcob
where (
        (
            `despachante`.`id_comissionariostatus` = (
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
group by `cap`.`id_captacao`
union all
select fatura.numero,
    fatura.valor valor_fatura,
    fatura.dta_vencimento dta_vencimento,
    fatura.dta_emissao dta_emissao,
    cliente.nome cliente,
    cap.numero captacao,
    ag.nome comissionado,
    agente.valor_comissao taxa,
    unicob.unidade unicob,
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
            `agente`.`valor_comissao`,
            (
                (
                    select count(0)
                    from `CaptacaoContainer`
                    where (
                            `CaptacaoContainer`.`id_captacao` = `fatura`.`id_captacao`
                        )
                ) * `agente`.`valor_comissao`
            )
        ),
        (
            (
                `agente`.`valor_comissao` * `fatura`.`valor`
            ) / 100
        )
    ) AS `valor_comissao`,
    `liberacao`.`valor_mercadoria` AS `valor_mercadoria`,
    `fatura`.`created_at` AS `created_at`,
    `fatura`.`updated_at` AS `updated_at`,
    `fatura`.`created_by` AS `created_by`,
    `fatura`.`updated_by` AS `updated_by`,
    'agente' tipo_comissionado
from Fatura fatura
    left join Captacao cap on cap.id_captacao = fatura.id_captacao
    left join Comissionario agente on agente.id_comissionado = cap.id_agentedecarga and agente.id_comissionariotipo = 3
    left join Individuo ag on ag.id_individuo = agente.id_comissionado
    left join UniCob unicob on unicob.id_unicob = agente.id_unicob
    left join Liberacao liberacao on liberacao.id_captacao = fatura.id_captacao
    left join LiberacaoDocumento lib_documento on lib_documento.id_liberacao = liberacao.id_liberacao
    left join CaptacaoContainer capcontainer on capcontainer.id_captacao=fatura.id_captacao
    left join Container container on capcontainer.id_container=container.id_container
    left join ComissionarioAppCob comappcob on comappcob.id_comissionarioappcob=agente.id_comissionarioappcob
    left join Proposta prop on prop.id_proposta = cap.id_proposta
    inner join Individuo cliente on cliente.id_individuo = prop.id_cliente
where (
        (
            `agente`.`id_comissionariostatus` = (
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
group by `cap`.`id_captacao`
union all
select fatura.numero,
    fatura.valor valor_fatura,
    fatura.dta_vencimento dta_vencimento,
    fatura.dta_emissao dta_emissao,
    cliente.nome cliente,
    cap.numero captacao,
    vend.nome comissionado,
    comVendedor.valor_comissao taxa,
    unicob.unidade unicob,
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
            `comVendedor`.`valor_comissao`,
            (
                (
                    select count(0)
                    from `CaptacaoContainer`
                    where (
                            `CaptacaoContainer`.`id_captacao` = `fatura`.`id_captacao`
                        )
                ) * `comVendedor`.`valor_comissao`
            )
        ),
        (
            (
                `comVendedor`.`valor_comissao` * `fatura`.`valor`
            ) / 100
        )
    ) AS `valor_comissao`,
    `liberacao`.`valor_mercadoria` AS `valor_mercadoria`,
    `fatura`.`created_at` AS `created_at`,
    `fatura`.`updated_at` AS `updated_at`,
    `fatura`.`created_by` AS `created_by`,
    `fatura`.`updated_by` AS `updated_by`,
    'vendedor' tipo_comissionado
from Fatura fatura
    left join Captacao cap on cap.id_captacao = fatura.id_captacao
    left join Proposta prop on prop.id_proposta = cap.id_proposta
    left join Vendedor vend on vend.id_vendedor = prop.id_vendedor
    left join Individuo vendedor on vendedor.id_individuo = vend.id_individuo
    inner join Comissionario comVendedor on comVendedor.id_comissionado = vendedor.id_individuo and comVendedor.id_comissionariotipo = 2
    left join UniCob unicob on unicob.id_unicob = comVendedor.id_unicob
    left join Liberacao liberacao on liberacao.id_captacao = fatura.id_captacao
    left join LiberacaoDocumento lib_documento on lib_documento.id_liberacao = liberacao.id_liberacao
    left join CaptacaoContainer capcontainer on capcontainer.id_captacao=fatura.id_captacao
    left join Container container on capcontainer.id_container=container.id_container
    left join ComissionarioAppCob comappcob on comappcob.id_comissionarioappcob=comVendedor.id_comissionarioappcob
    inner join Individuo cliente on cliente.id_individuo = prop.id_cliente
where (
        (
            `comVendedor`.`id_comissionariostatus` = (
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
group by `cap`.`id_captacao`
-- order by `comissionado`

insert into GrupoAcessoModuloSub VALUES(12,51,5)
