CREATE DATABASE zoho character set utf8 collate utf8_general_ci

CREATE TABLE FaturaItemValorLoteIntegralERateado (
    id_faturaitemvalorloteIntegralerateado INT UNSIGNED NOT NULL PRIMARY KEY,
    id_predicado INT UNSIGNED NOT NULL,
    CONSTRAINT fk_predicado_valoritempredicado FOREIGN KEY (id_predicado) REFERENCES Predicado(id_predicado)
)

CREATE TABLE ModuloSubTipo (
    id_modulosubtipo INT(11) UNSIGNED NOT NULL PRIMARY KEY,
    tipo VARCHAR(100) NOT NULL
)

CREATE TABLE ModuloSub (
    id_modulosub INT UNSIGNED NOT NULL PRIMARY KEY,
    id_modulo INT UNSIGNED NOT NULL,
    id_modulosubtipo INT UNSIGNED NOT NULL,
    type VARCHAR(100) NOT NULL,
    legend VARCHAR(100) NOT NULL,
    title VARCHAR(100) NOT NULL,
    route VARCHAR(200) NOT NULL,
    CONSTRAINT fk_modulosub_modulo FOREIGN KEY (id_modulo) REFERENCES Modulo(id_modulo),
    CONSTRAINT fk_modulosub_modulosubtipo FOREIGN KEY (id_modulosubtipo) REFERENCES ModuloSubTipo(id_modulosubtipo)
)

CREATE TABLE ModuloSubFeature (
    id_modulosubfeature INT UNSIGNED NOT NULL PRIMARY KEY,
    id_modulosub INT UNSIGNED NOT NULL,
    feature VARCHAR(100) NOT NULL,
    CONSTRAINT fk_modulosubfeature_modulosub FOREIGN KEY (id_modulosub) REFERENCES ModuloSub(id_modulosub)
)

CREATE TABLE Permissao (
    id_permissao INT UNSIGNED NOT NULL PRIMARY KEY,
    permissao VARCHAR(100) NOT NULL
)

CREATE TABLE GrupoAcesso (
    id_grupoacesso INT UNSIGNED NOT NULL PRIMARY KEY,
    grupo VARCHAR(100) NOT NULL
)

CREATE TABLE UsuarioGrupoAcesso (
    id_usuario INT UNSIGNED NOT NULL,
    id_grupoacesso INT UNSIGNED NOT NULL,
    CONSTRAINT fk_usuariogrupoacesso_usuario FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario),
    CONSTRAINT fk_usuariogrupoacesso_grupoacesso FOREIGN KEY (id_grupoacesso) REFERENCES GrupoAcesso(id_grupoacesso)
)

CREATE TABLE GrupoModulo (
    id_modulo INT UNSIGNED NOT NULL PRIMARY KEY,
    id_grupoacesso INT UNSIGNED NOT NULL
    -- CONSTRAINT fk_grupomodulo_modulo FOREIGN KEY (id_modulo) REFERENCES Modulo(id_modulo),
    -- CONSTRAINT fk_grupomodulo_GrupoAcesso FOREIGN KEY (id_grupoacesso) REFERENCES GrupoAcesso(id_grupoacesso)
)

ALTER TABLE GrupoModulo ADD INDEX fk_gruAceModSubPer (id_modulo ASC)
ALTER TABLE GrupoModulo ADD CONSTRAINT fk_grupomodulo_modulo FOREIGN KEY (id_modulo) REFERENCES Modulo(id_modulo)


CREATE TABLE GruAceModSubPer (
    id_modulosub INT UNSIGNED NOT NULL,
    id_grupoacesso INT UNSIGNED NOT NULL,
    id_permissao INT UNSIGNED NOT NULL,
    CONSTRAINT fk_gruacemodsubper_modulosub FOREIGN KEY (id_modulosub) REFERENCES ModuloSub(id_modulosub),
    CONSTRAINT fk_gruacemodsubper_id_grupoacesso FOREIGN KEY (id_grupoacesso) REFERENCES GrupoAcesso(id_grupoacesso),
    CONSTRAINT fk_gruacemodsubper_permissao FOREIGN KEY (id_permissao) REFERENCES Permissao(id_permissao)
)



INSERT INTO ModuloSub 

INSERT INTO Permissao (id_permissao, permissao)VALUES(1, 'c'),
                                                     (2, 'r'),
                                                     (3, 'u'),
                                                     (4, 'd'),
                                                     (5, 'crud')

INSERT INTO ModuloSubTipo VALUES(1, 'form'),
                                (2, 'view'),
                                (3, 'report')

INSERT INTO ModuloSub VALUES
    (1, 11, 1, 'sub_btn', '', 'cadastrar', '/empresa/empresa/cadastro', NULL), 
    (2, 11, 2, 'sub_btn', '', 'lista', '/empresa/empresa/lista', NULL), 
    (3, 10, 1, 'sub_btn', '', 'cadastrar', '/empresa/grupodecontato/cadastro', NULL), 
    (4, 10, 2, 'sub_btn', '', 'lista', '/empresa/grupodecontato/lista', NULL), 
    (5, 8, 1, 'sub_btn', '', 'cadastrar', '/comercial/proposta/cadastro', NULL), 
    (6, 8, 2, 'sub_btn', '', 'propostas', '/comercial/proposta/lista', NULL), 
    (7, 8, 2, 'sub_btn', '', 'modelos de proposta', '/comercial/proposta/lista-modelo-proposta', NULL), 
    (8, 7, 1, 'sub_btn', '', 'cadastrar serviço', '/comercial/servico/cadastro', NULL), 
    (9, 7, 2, 'sub_btn', '', 'lista de serviços', '/comercial/servico/lista', NULL), 
    (10, 7, 2, 'sub_btn', '', 'lista de predicados', '/comercial/servico/predicado/lista', NULL), 
    (11, 7, 1, 'sub_btn', '', 'cadastrar pacote', '/comercial/servico/pacote/cadastro', NULL), 
    (12, 7, 2, 'sub_btn', '', 'lista de pacotes', '/comercial/servico/pacote/lista', NULL), 
    (13, 6, 1, 'sub_btn', '', 'cadastrar', '/comercial/vendedor/cadastro', NULL), 
    (14, 6, 2, 'sub_btn', '', 'vendedores', '/comercial/vendedor/lista', NULL), 
    (15, 9, 2, 'sub_btn', '', 'lista de liberações', '/liberacao/liberacao/lista', NULL), 
    (16, 1, 1, 'sub_btn', '', 'cadastrar', '/movimentacao/captacao/cadastro', NULL), 
    (17, 1, 2, 'sub_btn', '', 'lista monitorada', '/movimentacao/captacao/lista-mon', 'lista de captações monitoradas'), 
    (18, 1, 2, 'sub_btn', '', 'lista geral', '/movimentacao/captacao/lista-obs', 'lista de captações de consulta'), 
    (19, 2, 1, 'sub_btn', '', 'cadastrar', '/movimentacao/despacho/cadastro', 'cadastro de despacho'), 
    (20, 2, 2, 'sub_btn', '', 'lista de despachos', '/movimentacao/despacho/lista-mon', 'lista de despachos monitorados'), 
    (21, 12, 1, 'sub_btn', '', 'cadastrar', '/movimentacao/terminal/cadastro', 'cadastro de teminal'), 
    (22, 12, 2, 'sub_btn', '', 'listar', '/movimentacao/terminal/lista', 'cadastro de teminal'), 
    (23, 13, 1, 'sub_btn', '', 'cadastrar', '/movimentacao/porto/cadastro', 'cadastro de porto'), 
    (24, 13, 2, 'sub_btn', '', 'listar', '/movimentacao/porto/lista', 'lista de portos'), 
    (25, 4, 2, 'sub_btn', '', 'processos', '/financeiro/processo/lista', 'lista de processos'), 
    (26, 3, 1, 'sub_btn', '', 'cadastrar', '/financeiro/fatura/cadastro', 'cadastro de fatura'), 
    (27, 3, 2, 'sub_btn', '', 'faturas', '/financeiro/fatura/lista', 'lista de faturas'), 
    (28, 5, 2, 'sub_btn', '', 'operações', '/financeiro/operacoes/lista', 'lista de operações')

INSERT INTO GrupoAcesso VALUES
    (1 , 'administrador'),
    (2 , 'gerente operacional'),
    (3 , 'operacional'),
    (4 , 'gerente financeiro'),
    (5 , 'financeiro')
SELECT * FROM Modulo
SELECT * FROM Modulo WHERE id_modulo=(SELECT id_modulo FROM GrupoAcessoModulo WHERE id_grupoacessomodulo=5)
INSERT INTO GrupoAcessoModulo VALUES(1, 1, 1),(2, 2, 1)

INSERT INTO GruAceModSubPer VALUES(16, 5, 1),(17, 5, 1),(18, 5, 1)
INSERT INTO GruAceModSubPer VALUES(19, 5, 2),(20, 5, 2)
INSERT INTO GruAceModSubPer VALUES(19, 5, 2),(20, 5, 2)
INSERT INTO GruAceModSubPer VALUES(25, 5, 4),(26, 5, 3),(27, 5, 3),(27, 5, 5)

SELECT * FROM Modulo
DELETE FROM GruAceModSubPer WHERE 1

