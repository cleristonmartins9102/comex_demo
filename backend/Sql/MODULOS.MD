Modulos
    Empresa
        Empresa (11)
            type: 'btn_main'
            legend: 'empresa'
                Cadastrar 1 [ ]
                    type: 'sub_btn'
                    legend: 'cadastrar'
                    route:  '/empresa/empresa/cadastro'
                Lista 2 [ ]
                    type: 'sub_btn'
                    legend: 'lista'
                    route:  '/empresa/empresa/lista',
        
        Grupo de Contato (10) 
                Cadastrar 1 [*]
                    type: 'sub_btn'
                    legend: 'cadastrar'
                    route:  '/empresa/grupodecontato/cadastro',
                Lista 2 [*],
                    type: 'sub_btn'
                    legend: 'lista'
                    route:  '/empresa/grupodecontato/lista',
    
    Comercial
        Proposta (8)
            type: 'btn_main'
            legend: 'proposta'
                Cadastar 1 [ ]
                    type: 'sub_btn',
                    legend: 'cadastrar',
                    route: '/comercial/proposta/cadastro',
                Propostas 2 [ ]
                    type: 'sub_btn',
                    legend: 'propostas',
                    route: '/comercial/proposta/lista'
                Modelos Propostas 2 [ ]
                    type: 'sub_btn',
                    legend: 'modelos de proposta',
                    oute: '/comercial/proposta/lista-modelo-proposta',
        
        Serviço (7)
            type: 'btn_main'
            legend: 'serviço'
                Cadastrar Serviço F [*]
                    type: 'sub_btn',
                    legend: 'cadastrar serviço',
                    route: '/comercial/servico/cadastro',
                Lista de Serviços 2 [*]
                    type: 'sub_btn',
                    legend: 'lista de serviços',
                    route: '/comercial/servico/lista',
                Lista de Predicados 2 [*]
                    type: 'sub_btn',
                    legend: 'lista de predicados',
                    route: '/comercial/servico/predicado/lista',
                Cadastrar Pacote 2 [*]
                    type: 'sub_btn',
                    legend: 'cadastrar pacote',
                    route: '/comercial/servico/pacote/cadastro',
                Lista de Pacotes 2 [ ]
                    type: 'sub_btn',
                    legend: 'lista de pacotes',
                    route: '/comercial/servico/pacote/lista',
        
        Vendedor (6)
            type: 'btn_main'
            legend: 'vendedor'
                Cadastar 1 [ ]
                    type: 'sub_btn',
                    legend: 'cadastrar',
                    route: '/comercial/vendedor/cadastro',
                Lista 2 [ ]
                    type: 'sub_btn',
                    legend: 'vendedores',
                    route: '/comercial/vendedor/lista'

    Liberação 
        Liberação (9)
            type: 'btn_main',
            legend: 'liberação'
                Lista 2 [ ]
                    type: 'sub_btn',
                    legend: 'lista de liberações',
                    route: '/liberacao/liberacao/lista',

    Movimentação
        Captação (1)
            type: 'btn_main',
            legend: 'captação'
                Cadastrar 1 [*]
                    type: 'sub_btn',
                    legend: 'cadastrar',
                    titleApp: 'cadastro de captação',
                    route: '/movimentacao/captacao/cadastro',
                Lista Monitorada 2 [*]
                    type: 'sub_btn',
                    legend: 'lista monitorada',
                    titleApp: 'lista de captações monitoradas',
                    route: '/movimentacao/captacao/lista-mon',
                Lista Geral 2 [*]
                    type: 'sub_btn',
                    legend: 'lista geral',
                    titleApp: 'lista de captações de consulta',
                    route: '/movimentacao/captacao/lista-obs',

        Despacho (2)
            type: 'btn_main',
            legend: 'despacho'
                Cadastrar 1 [ ]
                    type: 'sub_btn',
                    legend: 'cadastrar',
                    titleApp: 'cadastro de despacho',
                    route: '/movimentacao/despacho/cadastro',
                Lista de Despachos 2 [ ]
                    type: 'sub_btn',
                    legend: 'lista de despachos',
                    titleApp: 'lista de despachos monitorados',
                    route: '/movimentacao/despacho/lista-mon',
        
        Terminal (12)
            type: 'btn_main',
            legend: 'terminal'
                Cadastrar 1 [ ]
                    type: 'sub_btn',
                    legend: 'cadastrar',
                    titleApp: 'cadastro de teminal',
                    route: '/movimentacao/terminal/cadastro',
                Lista de Terminais 2 [ ]
                    type: 'sub_btn',
                    legend: 'listar',
                    titleApp: 'lista de terminais',
                    route: '/movimentacao/terminal/lista',
        
        Porto (13)
            type: 'btn_main',
            legend: 'porto'
                Cadastrar 1 [ ]
                    type: 'sub_btn',
                    legend: 'cadastrar',
                    titleApp: 'cadastro de porto',
                    route: '/movimentacao/porto/cadastro'
                Lista de Portos 2 [ ]
                    type: 'sub_btn',
                    legend: 'listar',
                    titleApp: 'lista de portos',
                    route: '/movimentacao/porto/lista',

    Financeiro
        Processo (4)
            type: 'btn_main',
            legend: 'processo'
                Lista de Processos 2 [ ]
                    type: 'sub_btn',
                    legend: 'processos',
                    titleApp: 'lista de processos',
                    route: '/financeiro/processo/lista',
        
        Fatura (3)
            type: 'btn_main',
            legend: 'fatura'
                Cadastrar 1 [ ]
                    type: 'sub_btn',
                    legend: 'cadastrar',
                    titleApp: 'cadastro de fatura',
                    route: '/financeiro/fatura/cadastro',
                Lista de Faturas 2 [ ]
                    type: 'sub_btn',
                    legend: 'faturas',
                    titleApp: 'lista de faturas',
                    route: '/financeiro/fatura/lista',
        
        Operacao (5)
            type: 'btn_main',
            legend: 'operação'
                Lista de Operacoes 2 [ ]
                    type: 'sub_btn',
                    legend: 'operações',
                    titleApp: 'lista de operações',
                    route: '/financeiro/operacoes/lista',
            
      