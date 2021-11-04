drop database zoho;
create database zoho CHARACTER SET utf8 COLLATE utf8_general_ci;
SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));

select * from LiberacaoHistorico where id_liberacao=(select id_liberacao from Liberacao where id_captacao=4672) and tipo='ocacional' 

select * from Predicado where id_predicado=62

select * from Processo where id_captacaolote=36
select * from ProcessoPredicado where id_processo=1113 and id_captacao=5071
delete from ProcessoPredicado where id_processopredicado=7323

select * from FaturaItemValorLoteIntegraleRateado
delete from FaturaItemValorLoteIntegraleRateado where id_predicado=44

SELECT * FROM CaptacaoContainer WHERE (id_captacao = '3740')
insert into CaptacaoContainer VALUES(2000, 3740, null, null, null, null)
delete from Fatura where numero>='805'
delete from FaturaPredicado where 1
delete from Processo where 1
delete from ProcessoPredicado where 1
delete from CaptacaoLote where numero=336
delete from FaturaItemValorLoteIntegral where 1
delete from CaptacaoLoteEvento where 1

select * from Comissionario
select * from Individuo where id_individuo = 16283272860
delete from Comissionario where id_comissionado = 16283272860

select * from Fatura where id_fatura=1

select * from CaptacaoLoteEvento
select * from ProcessoPredicado
SELECT * FROM ProcessoPredicado WHERE (id_processo=466)
select * from VwOperacao
select * from VwProcesso
select * from VwCaptacaoLote
select * from VwCaptacaoLoteCaptacao


select * from  order by numero desc
select max(id_contato) from Contato 
select * from LiberacaoEvento
delete from LiberacaoEvento where 1
select * from EmailCredencial
select * from PredProAppValor

SELECT `column_comment` FROM `information_schema`.`COLUMNS` WHERE `table_name`='Fatura' and column_name='id_faturamodelo'

select * from FaturaItemValorLoteIntegrale
select * from Predicado where id_predicado=54

select * from EmailCredencial

update EmailCredencial set email='operacao@gralsin.com.br' where email='liberacao@gralsin.com.br'

insert into AplicacaoModulo VALUES(5, 9, null, 1, null, null, null, null)
update EmailCredencial set senha='Capta@2019' where email='captacao@gralsin.com.br'
select * from EmailCredencial
insert into EmailCredencial VALUES(1, 'liberacao@gralsin.com.br', 'Gralsin@2019', 'Liberação - Gralsin'),(2, 'captacao@gralsin.com.br', 'Capta@2019', 'Captação - Gralsin')
insert into EmailCredencial VALUES(3, 'financeiro@gralsin.com.br', 'Gralsin@2019', 'Financeiro - Gralsin')
insert into AplicacaoModulo VALUES(2, 3, null, 3, null, null, null, null)
insert into UsuarioGrupoAcesso VALUE(8, 3, now(), null, null, null)
insert into Usuario VALUE(8,2, 'Mariana de Souza', 'operacao@gralsin.com.br', '$argon2i$v=19$m=1024,t=2,p=2$VE5PcG9DM1BGa0ZnaC5aMQ$WkLDXZdni0RCunRbQxLJ/n/PgOGZpVO/QFSfjofuu0E', null, null, null, null)

select * from UsuarioGrupoAcesso
update UsuarioGrupoAcesso set id_grupoacesso=7 where id_usuario=8
update AplicacaoModulo set id_emailcredencial=2 where id_modulo=1

delete from CaptacaoLoteEvento where id_captacaolote=24
select * from CaptacaoLoteEvento where id_captacaolote=24
select * from CaptacaoLote

select * from AplicacaoModulo 
select * from EmailCredencial



delete from FaturaItemValorLoteIntegral


select * from FaturaItemValorLoteIntegral
select * from TipoDocumento
-- Inserir


insert into TipoDocumento VALUES(12, 'Fatura', 'fatura', null, null, null, null)
insert into EmailCredencial VALUES(3, 'faturamento@gralsin.com.br', 'Gralsin@2019', 'Faturamento - Gralsin')
insert into AplicacaoModulo VALUES(2, 3, null, 3, null, null, null, null)

select * from Aplicacao 2, 3
select * from AplicacaoModulo
select * from EmailCredencial
select * from CaptacaoEvento where id_captacao=4225

-- insert into Margem VALUES(1, 'direita')
-- insert into Margem VALUES(2, 'esquerda')
-- insert into Margem VALUES(3, 'ambas')
-- update PropostaPredicado set id_margem=3
-- insert into FaturaItemValorLoteIntegral VALUES(63)
-- insert into FaturaItemValorLoteIntegral VALUES(64)
-- insert into FaturaItemValorLoteIntegral VALUES(54)
-- insert into FaturaItemValorLoteIntegral VALUES(23)
-- insert into ModuloSub VALUES(40, 1, 1, 'sub_btn', 'cadastrar lote', 'cadastrar lote', '/movimentacao/captacaolote/cadastro', 'cadastro de lote', null, null, null, null)
-- insert into ModuloSub VALUES(41, 1, 2, 'sub_btn', 'lista de lote', 'lista de lote', '/movimentacao/captacaolote/lista', 'lista de lote', null, null, null, null)
-- insert into ModuloSub VALUES(42, 3, 2, 'sub_btn', 'relatório faturas', 'relatório faturas', '/financeiro/fatura/rel_fatura', 'relatório faturas', null, null, null, null)
-- insert into ModuloSub VALUES(43, 17, 2, 'sub_btn', 'relatório de comissionários', 'relatório de comissionários', '/comercial/comissionario/rel_comissionario', 'relatório de comissionários', null, null, null, null)
-- insert into ModuloSub VALUES(44, 17, 2, 'sub_btn', 'comissionários', 'comissionários', '/comercial/comissionario/lista', 'comissionários', null, null, null, null)
-- insert into ModuloSub VALUES(45, 4, 2, 'sub_btn', 'relatório de processos', 'relatório de processos', '/financeiro/processo/rel_processo', 'relatório de processos', null, null, null, null)
-- insert into ModuloSub VALUES(46, 5, 2, 'sub_btn', 'relatório de operações', 'relatório de operações', '/financeiro/operacoes/rel_operacao', 'relatório de operações', null, null, null, null)
insert into ModuloSub VALUES(47, 11, 2, 'sub_btn', 'relatório de empresas', 'relatório de empresas', '/empresa/empresa/rel_empresas', 'relatório de empresas', null, null, null, null)
insert into ModuloSub VALUES(48, 10, 2, 'sub_btn', 'relatório grupos de contato', 'relatório grupos de contato', '/empresa/grupodecontato/rel_grupo_de_contato', 'relatório grupos de contato', null, null, null, null)
insert into ModuloSub VALUES(49, 8, 2, 'sub_btn', 'relatório de propostas', 'relatório de propostas', '/comercial/proposta/rel_propostas', 'relatório de propostas', null, null, null, null)
insert into ModuloSub VALUES(50, 6, 2, 'sub_btn', 'relatório de vendedores', 'relatório de vendedores', '/comercial/vendedor/rel_vendedores', 'relatório de vendedores', null, null, null, null)
insert into EmailCredencial VALUES(3, 'financeiro@gralsin.com.br', 'Gralsin@2019', 'Financeiro - Gralsin')
insert into ModuloSub VALUES(51, 17, 2, 'sub_btn', 'relatório de comissões', 'relatório de comissão', '/comercial/comissionario/rel_comissoes', 'relatório de comissões', null, null, null, null)

update Vendedor set id_vendedorstatus=1
insert into VendedorStatus VALUES(1, 'ativo'),(2, 'inativo')

insert into AplicacaoModulo VALUES(2, 3, null, 3, null, null, null, null)
select * from EmailCredencial
delete from Processo where id_processo=472

select * from Modulo
select * from Aplicacao
update EmailCredencial set senha='Gralsin@2019', email='faturamento@gralsin.com.br'
insert into FaturaItemCustom VALUES(62, ' (, [dimensao],)	', null, null, null, null)
insert into FaturaItemCustom VALUES(164, ' (, [dimensao],)	', null, null, null, null)
insert into FaturaItemCustom VALUES(298, ' (, [dimensao],)	', null, null, null, null)

select * from GrupoAcesso
--NOVO
-- insert into FaturaItemValorLoteIntegraleRateado VALUES( 1, 23),(2, 44)
-- insert into FaturaItemValorLoteIntegraleRateado VALUES( 1, 23)
-- insert into ModuloSub VALUES(51, 17, 2, 'sub_btn', 'relatório de comissões', 'relatório de comissão', '/comercial/comissionario/rel_comissoes', 'relatório de comissões', null, null, null, null)
-- insert into ModuloSub VALUES(52, 9, 2, 'sub_btn', 'relatório de liberações', 'relatório de liberação', '/liberacao/liberacao/rel_liberacao', 'relatório de liberações', null, null, null, null)
-- insert into ModuloSub VALUES(53, 1, 2, 'sub_btn', 'relatório de captações', 'relatório de captações', '/movimentacao/captacao/rel_captacao', 'relatório de captações', null, null, null, null)
insert into Modulo VALUES(18, 1, 'depot', 'depot', 'btn_main', null, null, now(), null)
insert into ModuloSub VALUES(56, 18, 1, 'sub_btn', 'cadastro', 'cadastro', '/movimentacao/depot/cadastro', 'cadastro', null, null, null, null)
insert into ModuloSub VALUES(57, 18, 2, 'sub_btn', 'lista de depots', 'lista de depots', '/movimentacao/depot/lista', 'lista de depots', null, null, null, null)
insert into GrupoAcessoModuloSub VALUES(4,56,5) 
insert into GrupoAcessoModuloSub VALUES(4,57,5) 
insert into GrupoAcessoModuloSub VALUES(9,56,5) 
insert into GrupoAcessoModuloSub VALUES(9,57,5) 
update PredProAppValor set nome='unidade e periodo' where nome='unidade'
-- insert into GrupoAcessoModuloSub VALUES(4,53,5) 
-- insert into ComissionarioAppCob VALUES(1, 'container', 'contêiner'),(2, 'processo', 'processo')

-- delete from ModuloSub where id_modulosub=53
-- delete from GrupoAcessoModuloSub where id_modulosub=53
select * from Departamento
select * from Usuario
select * from UsuarioGrupoAcesso
select * from GrupoAcesso
select * from TerminalStatus
select * from ModuloSub 
select * from Modulo

select id_proposta from Proposta where numero LIKE '%294.2%'
update Captacao set id_proposta=372 where id_captacao=4926

--Novo 10-09-2020
-- insert into DepotStatus VALUES(1, 'ativado'),(2, 'desativado')
-- insert into Modulo VALUES(18, 1, 'depot', 'depot', 'btn_main', null, null, now(), null)
-- insert into ModuloSub VALUES(54, 18, 1, 'sub_btn', 'cadastro', 'cadastro', '/movimentacao/depot/cadastro', 'cadastro', null, null, null, null)
-- insert into ModuloSub VALUES(55, 18, 1, 'sub_btn', 'lista', 'lista de depots', '/movimentacao/depot/lista', 'lista de depots', null, null, null, null)
-- insert into ItemClassificacao VALUES(9, 'retirada_container_vazio_depot', null, null, now(), null)
-- insert into ItemClassificacao VALUES(10, 'recebimento_container_cheio', null, null, now(), null)
-- insert into ItemClassificacao VALUES(11, 'advalore_ambas_dimensoes', null, null, now(), null)
-- insert into ItemPadrao VALUES(10, 10, 75, 4, NULL, NULL, 9, null, null, null, now(), null, null)
-- insert into ItemPadrao VALUES(11, 9, 291, 4, NULL, NULL, 9, null, null, null, now(), null, null)
-- insert into ItemPadrao VALUES(12, 11, 69, 4, NULL, NULL, 9, null, null, null, now(), null, null)
-- insert into ItemMaster VALUES(245, 75, null, null, now(), null)
-- insert into ItemMaster VALUES(45, 291, null, null, now(), null)
-- PRECISA ALTERAR DENTRO DO PACOTE DE REDEX 'Cadastro BL' PARA RETIRADA DE CONTAINER CHEIO
-- update Predicado set id_regime=2 where id_predicado=69
-----------

-- NOVO 20-10-2020

-- insert into GrupoAcesso VALUES(8, 'comercial', null, null, now(), null)
-- insert into GrupoAcesso VALUES(9, 'acesso completo', null, null, now(), null)
-- insert into GrupoAcesso VALUES(10, 'apoio financeiro', null, null, now(), null)
-- insert into GrupoAcesso VALUES(11, 'acesso consulta/relatório', null, null, now(), null)

-- insert into Departamento VALUES(6, 'comercial', null, null, now(), null)
-- insert into Departamento VALUES(7, 'diretoria', null, null, now(), null)
-- insert into Departamento VALUES(8, 'presidencia', null, null, now(), null)
-- insert into Usuario VALUES(9, 7, 'Paulo Vitor', 'pvitor@gralsin.com.br', '$argon2i$v=19$m=1024,t=2,p=2$VE5PcG9DM1BGa0ZnaC5aMQ$WkLDXZdni0RCunRbQxLJ/n/PgOGZpVO/QFSfjofuu0E', now(), null, null, null)
-- insert into Usuario VALUES(10, 7, 'Adriana Santos', 'asantos@gralsin.com.br', '$argon2i$v=19$m=1024,t=2,p=2$VE5PcG9DM1BGa0ZnaC5aMQ$WkLDXZdni0RCunRbQxLJ/n/PgOGZpVO/QFSfjofuu0E', now(), null, null, null)
-- insert into Usuario VALUES(11, 3, 'Amós Santana', 'financeiro@gralsin.com.br', '$argon2i$v=19$m=1024,t=2,p=2$VE5PcG9DM1BGa0ZnaC5aMQ$WkLDXZdni0RCunRbQxLJ/n/PgOGZpVO/QFSfjofuu0E', now(), null, null, null)
-- insert into Usuario VALUES(12, 6, 'Thays Nascimento', 'tnascimento@gralsin.com.br', '$argon2i$v=19$m=1024,t=2,p=2$VE5PcG9DM1BGa0ZnaC5aMQ$WkLDXZdni0RCunRbQxLJ/n/PgOGZpVO/QFSfjofuu0E', now(), null, null, null)
-- insert into Usuario VALUES(13, 6, 'Rodrigo Mendes', 'tnascimento@gralsin.com.br', '$argon2i$v=19$m=1024,t=2,p=2$VE5PcG9DM1BGa0ZnaC5aMQ$WkLDXZdni0RCunRbQxLJ/n/PgOGZpVO/QFSfjofuu0E', now(), null, null, null)
-- insert into Usuario VALUES(14, 8, 'Simone Felix', 'sfelix@gralsin.com.br', '$argon2i$v=19$m=1024,t=2,p=2$VE5PcG9DM1BGa0ZnaC5aMQ$WkLDXZdni0RCunRbQxLJ/n/PgOGZpVO/QFSfjofuu0E', now(), null, null, null)
-- SImone
-- insert into UsuarioGrupoAcesso VALUES(14, 9, null, null, null, null)
-- Paulo
-- insert into UsuarioGrupoAcesso VALUES(9, 11, null, null, null, null)
-- Adriana
-- insert into UsuarioGrupoAcesso VALUES(10, 11, null, null, null, null)
-- AMos
-- insert into UsuarioGrupoAcesso VALUES(11, 10, null, null, null, null)
-- Thays
-- insert into UsuarioGrupoAcesso VALUES(12, 6, null, null, null, null)
-- Rodrigo
-- insert into UsuarioGrupoAcesso VALUES(13, 6, null, null, null, null)

select * from Servico;
select * from Predicado where id_servico=21
select * from Predicado where id_predicado=61
select * from PropostaPredicado where id_predicado=79 and id_predproappvalor=1
select * from PredProAppValor

select * from Proposta where id_proposta=261

update Modulo set nome='despacho' where nome='depacho'
delete from UsuarioGrupoAcesso where id_usuario = 9

show tables
select * from GrupoAcesso 



select * from Modulo

select * from Aplicacao
select * from AplicacaoModulo
select * from Modulo where nome='liberacao' 

SELECT numero FROM VwCaptacao WHERE (id_captacao NOT IN (SELECT id_captacao FROM CaptacaoEvento where evento="g_liberacao" or evento="g_processo" or evento="g_fatura")) order by numero desc

SELECT count(*) FROM VwCaptacao WHERE (id_captacao IN (SELECT id_captacao FROM CaptacaoEvento where evento="g_liberacao"))

SELECT * FROM PacotePredicado WHERE descricao LIKE %'Posicionamento'%
SELECT * FROM VwCaptacao WHERE ((id_captacao IN (SELECT id_captacao FROM CaptacaoEvento where evento=="g_liberacao"))) ORDER BY created_at desc LIMIT 10
SELECT * FROM VwCaptacao WHERE ((id_captacao NOT IN (SELECT id_captacao FROM CaptacaoEvento))) ORDER BY created_at desc LIMIT 10

select * from Modulo
select * from ModuloSub
select * from ProcessoPredicado
select * from FaturaItem where id_fatura=4
SELECT * FROM FaturaItem WHERE (id_processopredicado = '200' AND id_fatura = '4')

update Fatura set numero='10.1' where numero='10-1'

select * from Predicado where id_predicado=164
select * from PredProAppValor
select * from CaptacaoEvento
select * from PredProAppValor
select * from Papel;
select * from UniCob;
select * from FaturaComissoesDesativadas;
select * from TipoDocumento
select * from CaptacaoUpload

select * from FaturaDocumento
select * from Cext
select * from PredProAppValor
select * from FaturaModelo
select * from ProcessoHistorico
select * from FaturaStatus
select * from Aplicacao


select * from GrupoAcesso
select * from Modulo where id_modulo=(select id_modulo from ModuloSub where id_modulosub=1)
select * from ModuloSub 
select * from UsuarioGrupoAcesso
select * from Permissao
select * from Usuario
select * from ModuloSubUsuario
select * from GrupoAcessoModuloSub where id_grupoacesso=5
select * from FaturaItemCustom

select count(*) from Proposta
select * from Contato where nome LIKE '%cleriston%';

select nome from Individuo where id_individuo=13583323000105;

select * from GrupoDeContato where (id_adstrito = '13583323000105' AND id_coadjuvante = '58130089000190')
select * from GrupoDeContato where id_adstrito = 13583323000105
select * from ModuloSub

1	administrador			2019-06-02 18:38:16	NULL	
2	gerente operacional			2019-06-02 18:38:16	NULL	
3	operacional			2019-06-02 18:38:16	NULL	
4	gerente financeiro			2019-06-02 18:38:16	NULL	  
5	financeiro			2019-06-02 18:38:16	NULL	
6	captacao	NULL	NULL	2019-09-11 08:51:26	NULL	
7	liberacao	NULL	NULL	2019-09-11 08:51:26	NULL	

insert into Permissao VALUES(5, 'crud', null, null, null, null)
delete from GrupoAcessoModuloSub where 1
select * from VwCaptacao where lote > 0

INSERT INTO `GrupoAcessoModuloSub` VALUES (8,2,2),(8,4,2),(8,6,2),(8,7,2),(8,9,2),(8,10,2),(8,12,2),(8,14,2),(8,15,2),(8,17,2),(8,18,2),(8,20,2),(8,22,2),(8,24,2),(8,25,2),(8,27,2),(8,28,2),(8,30,2),(8,32,2),(8,34,2),(8,39,2),(8,41,2),(8,44,2),(10,25,2),(10,28,2),(10,30,2),(9,2,5),(9,3,5),(9,4,5),(9,5,5),(9,6,5),(9,7,5),(9,8,5),(9,9,5),(9,10,5),(9,11,5),(9,12,5),(9,13,5),(9,14,5),(9,15,5),(9,16,5),(9,17,5),(9,18,5),(9,19,5),(9,20,5),(9,21,5),(9,22,5),(9,23,5),(9,24,5),(9,25,5),(9,26,5),(9,27,5),(9,28,5),(9,29,5),(9,30,5),(9,31,5),(9,32,5),(9,33,5),(9,34,5),(9,35,5),(9,36,5),(9,37,5),(9,38,5),(9,39,5),(9,40,5),(9,41,5),(9,42,5),(9,43,5),(9,44,5),(9,45,5),(9,46,5),(9,47,5),(9,48,5),(9,49,5),(9,50,5),(9,51,5),(9,52,5),(9,53,5);

select id_captacaolote from CaptacaoLoteCaptacao where id_captacao = 3898 limit 1
select l.id_captacaolote, l.id_captacao, group_concat(l.id_captacao) captacoes from CaptacaoLoteCaptacao as l where l.id_captacaolote = (select id_captacaolote from CaptacaoLoteCaptacao where id_captacao = 3898 limit 1)  group by l.id_captacaolote 

select * from Usuario
select * from GrupoAcesso
select * from ModuloSub
select * from UsuarioGrupoAcesso
select * from Permissao
select * from GrupoAcessoModuloSub where id_grupoacesso=9

update UsuarioGrupoAcesso set id_grupoacesso=9 where id_usuario=3

insert into GrupoAcessoModuloSub VALUES(9,1,5)
//empresa/empresa/cadastro

insert into GrupoAcessoModuloSub VALUES(7,47,5) 
/empresa/empresa/rel_empresa

insert into GrupoAcessoModuloSub VALUES(7,2,5) 
/empresa/empresa/lista

insert into GrupoAcessoModuloSub VALUES(7,3,5) 
/empresa/grupodecontato/cadastro

insert into GrupoAcessoModuloSub VALUES(7,4,5) 
/empresa/grupodecontato/lista

insert into GrupoAcessoModuloSub VALUES(7,48,5) 
/empresa/grupodecontato/rel_grupo_de_contato

insert into GrupoAcessoModuloSub VALUES(9,5,5) 
/comercial/proposta/cadastro

insert into GrupoAcessoModuloSub VALUES(11,6,5) 
/comercial/proposta/lista

insert into GrupoAcessoModuloSub VALUES(11,49,5) 
/comercial/proposta/rel_proposta

insert into GrupoAcessoModuloSub VALUES(11,7,5) 
/comercial/proposta/lista-modelo-propostaB

insert into GrupoAcessoModuloSub VALUES(9,8,5) 
/comercial/servico/cadastro

insert into GrupoAcessoModuloSub VALUES(11,9,5)
 /comercial/servico/lista

insert into GrupoAcessoModuloSub VALUES(11,10,5) 
/comercial/servico/predicado/lista

insert into GrupoAcessoModuloSub VALUES(9,11,5) 
/comercial/servico/pacote/cadastro

insert into GrupoAcessoModuloSub VALUES(11,12,5) 
/comercial/servico/pacote/lista	lista de pacotes

insert into GrupoAcessoModuloSub VALUES(9,13,5) 
/comercial/vendedor/cadastro

insert into GrupoAcessoModuloSub VALUES(11,14,5) 
/comercial/vendedor/lista

insert into GrupoAcessoModuloSub VALUES(11,50,5) 
/comercial/vendedor/rel_vendedores

insert into GrupoAcessoModuloSub VALUES(11,15,5) 
/liberacao/liberacao/lista

insert into GrupoAcessoModuloSub VALUES(7,52,5) 
/liberacao/liberacao/rel_liberacao

insert into GrupoAcessoModuloSub VALUES(7,16,5) 
/movimentacao/captacao/cadastro

insert into GrupoAcessoModuloSub VALUES(7,17,5) 
/movimentacao/captacao/lista-mon

insert into GrupoAcessoModuloSub VALUES(7,18,5) 
/movimentacao/captacao/lista-obs

insert into GrupoAcessoModuloSub VALUES(7,53,5) 
/movimentacao/captacao/rel_liberacao

insert into GrupoAcessoModuloSub VALUES(9,19,5) 
/movimentacao/despacho/cadastro

insert into GrupoAcessoModuloSub VALUES(11,20,5) 
/movimentacao/despacho/lista-mon

insert into GrupoAcessoModuloSub VALUES(9,21,5)
 /movimentacao/terminal/cadastro

insert into GrupoAcessoModuloSub VALUES(11,22,5) 
/movimentacao/terminal/lista

insert into GrupoAcessoModuloSub VALUES(9,23,5) 
/movimentacao/porto/cadastro

insert into GrupoAcessoModuloSub VALUES(11,24,5) 
/movimentacao/porto/lista


insert into GrupoAcessoModuloSub VALUES(9,54,5) 
/movimentacao/depot/cadastro

insert into GrupoAcessoModuloSub VALUES(9,55,5) 
/movimentacao/depot/lista


insert into GrupoAcessoModuloSub VALUES(5,45,5) 
/financeiro/processo/rel_processo

insert into GrupoAcessoModuloSub VALUES(11,25,5) 
/financeiro/processo/lista

insert into GrupoAcessoModuloSub VALUES(9,26,5) 
/financeiro/fatura/cadastro

insert into GrupoAcessoModuloSub VALUES(11,27,5) 
/financeiro/fatura/lista


-- select * from GrupoAcessoModuloSub where id_grupoacesso=9
-- select * from GrupoAcesso
-- select * from Permissao

insert into GrupoAcessoModuloSub VALUES(11,46,5)
/financeiro/operacoes/rel_operacao

insert into GrupoAcessoModuloSub VALUES(9,28,5) 
/financeiro/operacoes/lista

insert into GrupoAcessoModuloSub VALUES(9,29,5) 

insert into GrupoAcessoModuloSub VALUES(5,42,5) 
/financeiro/fatura/rel_fatura

insert into GrupoAcessoModuloSub VALUES(11,30,5) 
/financeiro/fatura/listafaturatotal

insert into GrupoAcessoModuloSub VALUES(9,31,5) 
/financeiro/cadastro/imposto

insert into GrupoAcessoModuloSub VALUES(11,32,5) 
/financeiro/cadastro/listaimpostos

insert into GrupoAcessoModuloSub VALUES(9,33,5) 
/financeiro/cext/cadastro

insert into GrupoAcessoModuloSub VALUES(11,34,5) 
/financeiro/cext/lista

insert into GrupoAcessoModuloSub VALUES(9,35,5) 
/comercial/comissionario/cadastro

insert into GrupoAcessoModuloSub VALUES(11,44,5) 
/comercial/comissionario/lista

insert into GrupoAcessoModuloSub VALUES(11,43,5) 
/comercial/comissionario/rel_comissionario

insert into GrupoAcessoModuloSub VALUES(11,51,5)
/comercial/comissionario/rel_comissoes


insert into GrupoAcessoModuloSub VALUES(9,36,5) 
/comercial/servico/itempadrao/cadastro

insert into GrupoAcessoModuloSub VALUES(9,37,5) 
/financeiro/itempadrao/cadastro

insert into GrupoAcessoModuloSub VALUES(11,38,5) 
/comercial/servico/itempadrao/lista

insert into GrupoAcessoModuloSub VALUES(11,39,5) 
/financeiro/itempadrao/lista	

insert into GrupoAcessoModuloSub VALUES(9,40,5) 
/movimentacao/captacaolote/cadastro

insert into GrupoAcessoModuloSub VALUES(11,41,5)
/movimentacao/captacaolote/lista


select * from GrupoAcesso

insert into GrupoAcesso VALUES(8, 'captação senior')

insert into ModuloSubUsuario VALUES(4, 2, 1)
delete from ModuloSubUsuario where 1
delete from GrupoAcessoModuloSub where id_grupoacesso=5

update UsuarioGrupoAcesso set id_grupoacesso=5 where id_usuario=6
update UsuarioGrupoAcesso set id_grupoacesso=4 where id_usuario=4

SELECT count(*) FROM VwFatura WHERE (id_faturastatus <> '3') ORDER BY created_at desc LIMIT 10

SELECT id_individuo FROM IndividuoPapel WHERE (id_papel = '5') GROUP BY(id_individuo) order by id_individuo desc 
SELECT id_individuo FROM IndividuoPapel WHERE (id_papel = '1' OR id_papel = '3' OR id_papel = '4') 

describe Fatura;
SELECT * FROM Proposta WHERE (status = 'ativa' AND tipo <> 'modelo' AND id_regime = '1')
select * from Regime

insert into Papel VALUES(8, 'colaborador', now(), now(), null, null)
insert into ItemClassificacao VALUES(7, 'reefer', null,null,null,null)
insert into ItemClassificacao VALUES(8, 'remocao_container', null,null,null,null)

insert into ItemPadrao VALUES(8, 7, 3, 29, 4, null, 12, 7, null, null, null, null, null)
insert into ItemPadrao VALUES(9, 8, 3, 35, 4, null, 1, 8, null, null, null, null, null, null)

update ItemPadrao set id_predicado=68 where id_itempadrao = 9;
update ItemClassificacao set 'classificacao'='remocao_container'
update Captacao set imo='sim' where id_captacao = 79
c
insert into TipoDocumento VALUES(8, 'boleto', 'fatura', null, null, null, null);
insert into TipoDocumento VALUES(9, 'NF', 'fatura', null, null, null, null);

select id_predicado, dimensao from PropostaPredicado where id_proposta = 77 order by id_predicado asc
insert into ComissionarioTipo VALUES(1, 'despachante');
insert into ComissionarioTipo VALUES(2, 'vendedor');

insert into ComissionarioStatus VALUES(1, 'ativo')
insert into ComissionarioStatus VALUES(2, 'inativo')

insert into FaturaComplementar VALUES(1, 2)

-- Update no produção
update ItemPadrao set valor_custo=14.25 where id_itempadrao=4
--

delete from Liberacao where id_liberacaostatus=(select id_liberacaostatus from LiberacaoStatus where status='concluido')
delete from ItemNecessita where 1
delete from ProcessoPredicado where id_processo=23
delete from Comissionario where 1
delete from Fatura where id_fatura = 2
delete from FaturaComplementar where 1;

delete from Liberacao where 1 
delete from Processo where 1 
delete from Upload where 1 
delete from CaptacaoEvento where evento<>'g_liberacao' and evento<>'g_processo' and evento<>'g_fatura'

delete from FaturaComissoesDesativadas where 1;


CREATE TABLE Departamento (
  id_departamento INT UNSIGNED NOT NULL PRIMARY KEY,
  departamento VARCHAR(100) NOT NULL
) 

CREATE TABLE Usuario (
  id_usuario INT UNSIGNED NOT NULL PRIMARY KEY,
  id_departamento INT UNSIGNED NOT NULL,
  nome VARCHAR(200) NOT NULL,
  email VARCHAR(200) NOT NULL,
  senha VARCHAR(200) NOT NULL,
  CONSTRAINT fk_usuario_departamento FOREIGN KEY (id_departamento) REFERENCES Departamento(id_departamento)
)

CREATE TABLE Token (
    id_token INT UNSIGNED NOT NULL PRIMARY KEY,
    id_usuario INT UNSIGNED NOT NULL,
    token VARCHAR(1000) NOT NULL,
    refresh_token VARCHAR(1000) NOT NULL,
    expired_at DATETIME NOT NULL,
    active TINYINT UNSIGNED NOT NULL DEFAULT 1,
    CONSTRAINT fk_token_usuario FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario) 
)

ALTER TABLE `Token` ADD COLUMN `activated` INT DEFAULT 1

INSERT INTO
  `zoho`.`Departamento` (departamento, id_departamento)
VALUES
  (
    'Comercial',
    1
  );
)

INSERT INTO
  `zoho`.`Usuario` (email, id_departamento, id_usuario, nome, senha)
VALUES
  (
    'cleriston.mari@gmail.com',
    1,
    1,
    'Cleriston Martins',
    'sw12digit'
  );



DROP TABLE Usuarios;

DELETE FROM Departamento WHERE 1


select * from Fatura where id_fatura = 308
select * from CaptacaoContainer where id_captacao = 3997


select * from Comissionario
select * from UniCob
select * from Vendedor
select * from ComissionarioTipo
select * from VwComissoes
select * from LiberacaoDocumento

select 
  fatura.valor valor_fatura,
  fatura.numero numero,
  fatura.dta_vencimento,
  fatura.dta_emissao,
  cliente.nome cliente,
  despachante.nome comissionado,
  comissionariotipo.tipo tipo_comissionado,
  unicob.unidade unicob,
  comissionario.valor_comissao taxa,
  if ( lib_documento.id_docdi,
        'DI',
        'DTA' 
  ) tipo_documento,
  liberacao.documento documento,
  (select count(*) from CaptacaoContainer where id_captacao = fatura.id_captacao) qtd_cntr,
  group_concat(`container`.`codigo` separator '<br>') AS `container`,
  if ( comappcob.id_comissionarioappcob,
        comappcob.legenda,
        null
  ) app_cob,
  if ( unicob.unidade = 'moeda',  
        if ( comappcob.legenda = 'processo', comissionario.valor_comissao, ((select count(*) from CaptacaoContainer where id_captacao = fatura.id_captacao) * comissionario.valor_comissao )), 
        ( comissionario.valor_comissao * fatura.valor ) / 100 
  ) valor_comissao,
  liberacao.valor_mercadoria,
  fatura.created_at,
  fatura.updated_at,
  fatura.created_by,
  fatura.updated_by
  from Fatura fatura 
    left join Captacao captacao on captacao.id_captacao = fatura.id_captacao
    left join CaptacaoContainer capcontainer on capcontainer.id_captacao = fatura.id_captacao
    left join Container container on capcontainer.id_container = container.id_container
    left join Proposta proposta on proposta.id_proposta = captacao.id_proposta
    left join Individuo despachante on despachante.id_individuo = captacao.id_despachante
    left join Individuo cliente on cliente.id_individuo = proposta.id_cliente
    left join Liberacao liberacao on liberacao.id_captacao = fatura.id_captacao
    left join LiberacaoDocumento lib_documento on lib_documento.id_liberacao = liberacao.id_liberacao
    left join Comissionario comissionario on comissionario.id_comissionado = despachante.id_individuo
    left join ComissionarioTipo comissionariotipo on comissionariotipo.id_comissionariotipo = comissionario.id_comissionariotipo
    left join ComissionarioAppCob comappcob on comappcob.id_comissionarioappcob = comissionario.id_comissionarioappcob
    left join UniCob unicob on unicob.id_unicob = comissionario.id_unicob
where comissionario.id_comissionariostatus = (select id_comissionariostatus from ComissionarioStatus where status='ativo') and fatura.id_fatura NOT IN(select id_fatura from FaturaComissoesDesativadas) GROUP BY captacao.id_captacao
UNION
select 
  fatura.valor valor_fatura,
  fatura.numero numero,
  fatura.dta_vencimento,
  fatura.dta_emissao,
  cliente.nome cliente,
  vendedor.nome comissionado,
  comissionariotipo.tipo tipo_comissionado,
  unicob.unidade unicob,
  comissionario.valor_comissao taxa,
  if ( lib_documento.id_docdi,
        'DI',
        'DTA' 
  ) tipo_documento,
  liberacao.documento documento,
  (select count(*) from CaptacaoContainer where id_captacao = fatura.id_captacao) qtd_cntr,
  group_concat(`container`.`codigo` separator '<br>') AS `container`,
  if ( comappcob.id_comissionarioappcob,
        comappcob.legenda,
        null
  ) app_cob,
  if ( unicob.unidade = 'moeda',  
        if ( comappcob.legenda = 'processo', comissionario.valor_comissao, ((select count(*) from CaptacaoContainer where id_captacao = fatura.id_captacao) * comissionario.valor_comissao )), 
        ( comissionario.valor_comissao * fatura.valor ) / 100 
  ) valor_comissao,
  liberacao.valor_mercadoria,
  fatura.created_at,
  fatura.updated_at,
  fatura.created_by,
  fatura.updated_by
  from Fatura fatura 
    left join Captacao captacao on captacao.id_captacao = fatura.id_captacao
    left join CaptacaoContainer capcontainer on capcontainer.id_captacao = fatura.id_captacao
    left join Container container on capcontainer.id_container = container.id_container
    left join Proposta proposta on proposta.id_proposta = captacao.id_proposta
    left join Individuo vendedor on vendedor.id_individuo = (select id_individuo from Vendedor where id_vendedor = proposta.id_vendedor)
    left join Individuo cliente on cliente.id_individuo = proposta.id_cliente
    left join Liberacao liberacao on liberacao.id_captacao = fatura.id_captacao
    left join LiberacaoDocumento lib_documento on lib_documento.id_liberacao = liberacao.id_liberacao
    left join Comissionario comissionario on comissionario.id_comissionado = vendedor.id_individuo
    left join ComissionarioTipo comissionariotipo on comissionariotipo.id_comissionariotipo = comissionario.id_comissionariotipo
    left join ComissionarioAppCob comappcob on comappcob.id_comissionarioappcob = comissionario.id_comissionarioappcob
    left join UniCob unicob on unicob.id_unicob = comissionario.id_unicob
where comissionario.id_comissionariostatus = (select id_comissionariostatus from ComissionarioStatus where status='ativo') and fatura.id_fatura NOT IN(select id_fatura from FaturaComissoesDesativadas) GROUP BY captacao.id_captacao
ORDER BY comissionado ASC







select 
  fatura.valor valor_fatura,
  fatura.numero numero,
  fatura.dta_vencimento,
  vendedor.nome comissionado,
  comissionariotipo.tipo tipo_comissionado,
  unicob.unidade unicob,
  comissionario.valor_comissao taxa,
  (select count(*) from CaptacaoContainer where id_captacao = fatura.id_captacao) qtd_cntr,
  if ( comappcob.id_comissionarioappcob,
        comappcob.legenda,
        null
  ) app_cob,
  if ( unicob.unidade = 'moeda',  
        if ( comappcob.legenda = 'processo', comissionario.valor_comissao, ((select count(*) from CaptacaoContainer where id_captacao = fatura.id_captacao) * comissionario.valor_comissao )), 
        (comissionario.valor_comissao * fatura.valor ) / 100 
  ) valor_comissao,
  fatura.created_at,
  fatura.updated_at,
  fatura.created_by,
  fatura.updated_by
  from Fatura fatura 
    left join Captacao captacao on captacao.id_captacao = fatura.id_captacao
    left join Proposta proposta on proposta.id_proposta = captacao.id_proposta
    left join Individuo vendedor on vendedor.id_individuo = (select id_individuo from Vendedor where id_vendedor = proposta.id_vendedor)
    left join Comissionario comissionario on comissionario.id_comissionado = vendedor.id_individuo
    left join ComissionarioTipo comissionariotipo on comissionariotipo.id_comissionariotipo = comissionario.id_comissionariotipo
    left join ComissionarioAppCob comappcob on comappcob.id_comissionarioappcob = comissionario.id_comissionarioappcob
    left join UniCob unicob on unicob.id_unicob = comissionario.id_unicob
where comissionario.id_comissionariostatus = (select id_comissionariostatus from ComissionarioStatus where status='ativo') and comissionario.id_comissionario NOT IN(select id_comissionario from FaturaComissoesDesativadas)

select
   `zoho`.`depot`.`id_depot` AS `id_depot`,
   `zoho`.`depot`.`id_depotstatus` AS `id_depotstatus`,
   `zoho`.`depot`.`id_margem` AS `id_margem`,
   `zoho`.`depot`.`id_individuo` AS `id_individuo`,
   `zoho`.`depot`.`nome` AS `nome`,
   depotstatus.status status,
   margem.margem,
   depot.created_at,
   depot.updated_at,
   depot.created_by,
   depot.updated_by
from
   `zoho`.`Depot` depot
   left join Individuo individuo on individuo.id_individuo=depot.id_individuo
   left join DepotStatus depotstatus on depotstatus.id_status=depot.id_depotstatus
   left join Margem margem on margem.id_margem=depot.id_margem

