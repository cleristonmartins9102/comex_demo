import { AccessType } from "src/app/shared/report/security/acess-type";

interface MenuProp {
    displayName: string;
    iconName: string;
    event: string;
    children?: any;
    expression?: any;
}

export class Menu extends AccessType {
    limiteTentativa = 2;
    getWindowMenu() {
        return [
            {
                displayName: this.btn_form_access,
                iconName: 'close',
                event: this.typePermission,
                expression: (dados, logged): boolean => {
                    const eventos = dados.complementos.eventos;
                    let response = true;
                    return response;
                }
            },
            {
                displayName: 'Gerar Liberação',
                iconName: 'add_comment',
                event: 'gerar_liberacao',
                expression: (dados) => {
                    const status = dados.status;
                    const eventos = dados.complementos.eventos;
                    let response = this.typePermission === 'r' ? false : true;
                    if (response && (typeof(eventos) !== 'undefined' && eventos.length > 0)) {
                        eventos.forEach((evento) => {
                            if (evento.evento === 'g_liberacao' || status !== 'Atracado') {
                                response = false;
                            }
                        });
                    } else {
                        if (status !== 'Atracado') {
                           response = false;
                        }
                    }
                    return response;
                }
            },
            {
                displayName: 'Add Ocorrência',
                iconName: 'add_comment',
                children: [
                    {
                        displayName: 'Geral',
                        iconName: 'question_answer',
                        event: 'ocorrencia',
                        expression: () => {
                            return true;
                        }
                    },
                ],
                expression: () => {
                    return this.typePermission === 'r' ? false : true;
                }
            },
            {
                displayName: 'Tracking',
                children: [
                    {
                        displayName: 'Solicitar o Cadastro',
                        iconName: 'group',
                        event: 'alertar_parceiro',
                        expression: (dados: { bl: string, complementos: {container: any[]}, }): boolean => {
                          return false;
                        }
                    },
                    {
                        displayName: 'Solicitar BL',
                        iconName: 'question_answer',
                        event: 'solicitar_bl',
                        expression: (dados: { dta_prevista_atracacao: string, terminal_atracacao: string, bl: string, complementos: { documentos: any[], eventos: {evento: string}[], container: any[]}, }): boolean => {
                            const lenSolBlSend = dados.complementos.eventos.filter( evento => evento.evento === 'solicitado_bl').length;
                            const lenDocBl = dados.complementos.documentos.filter( doc => doc.tipodocumento === 'bl').length;
                                let resp = true;
                            if (lenDocBl  > 0 || lenSolBlSend >= this.limiteTentativa ) {
                                resp = false;
                            } else if (dados.complementos.container.length === 0) {
                                resp = false;
                            } else if (!dados.bl) {
                                resp = false;
                            } else if (!dados.terminal_atracacao) {

                                resp = false;
                            } else if (!dados.dta_prevista_atracacao) {
                                resp = false;
                            }
                            return resp;
                        }
                    },
                    {
                        displayName: 'Confirmar Recebimento BL',
                        iconName: 'thumb_up_alt',
                        event: 'confrecbl',
                        expression: (dados: { dta_prevista_atracacao: string, terminal_atracacao: string, bl: string, complementos: {container: any[], eventos: any[]} }): boolean => {
                            const lenContainer = dados.complementos.container.length;
                            let resp = true;
                            if (lenContainer === 0) {
                                resp = false;
                            } else if (!dados.bl) {
                                resp = false;
                            } else if (!dados.terminal_atracacao) {
                                resp = false;
                            } else if (!dados.dta_prevista_atracacao) {
                                resp = false;
                            }
                            return resp;
                        }
                    },
                    {
                        displayName: 'Informar Solicitação de Cadastro no Terminal',
                        iconName: 'emoji_people',
                        event: 'confcliente',
                        expression: (dados: { dta_prevista_atracacao: string, terminal_atracacao: string, bl: string, complementos: {container: any[], eventos: any[]} }): boolean => {
                            const lenConfirRecBL = dados.complementos.eventos.filter( evento => evento.evento === "confrecbl").length;
                            const lenContainer = dados.complementos.container.length;
                            
                            let resp = true;
                             if (lenContainer === 0) {
                                resp = false;
                            } else if (!dados.bl) {
                                resp = false;
                            } else if (!dados.terminal_atracacao) {
                                resp = false;
                            } else if (!dados.dta_prevista_atracacao) {
                                resp = false;
                            }
                            return resp;
                        }
                    },
                    {
                        displayName: 'Solicitar CE',
                        iconName: 'question_answer',
                        event: 'solicitar_ce',
                        expression: (dados: { dta_prevista_atracacao: string, terminal_atracacao: string, bl: string, complementos: {documentos: any[], container: any[]}, }): boolean => {
                            let resp = true;
                            const lenDocCe = dados.complementos.documentos.filter( doc => doc.tipodocumento === 'bl').length;
                            if (lenDocCe === 0 && dados.complementos.container.length === 0) {
                                resp = false;
                            } else if (!dados.bl) {
                                resp = false;
                            } else if (!dados.terminal_atracacao) {
                                resp = false;
                            } else if (!dados.dta_prevista_atracacao) {
                                resp = false;
                            }
                            return resp;
                        }
                    },
                    {
                        displayName: 'Alteração Data de Atracação',
                        iconName: 'event_note',
                        event: 'altdtaatracacao',
                        expression: (dados: { dta_prevista_atracacao: string, terminal_atracacao: string, bl: string, previous_dta_prevista_atracacao: string | boolean, complementos: {container: any[]}, }): boolean => {
                            let resp = true;
                            if (dados.complementos.container.length === 0) {
                                resp = false;
                            } else if (!dados.bl) {
                                resp = false;
                            } else if (!dados.terminal_atracacao) {
                                resp = false;
                            } else if (!dados.dta_prevista_atracacao) {
                                resp = false;
                            } else if (!dados.previous_dta_prevista_atracacao) {
                                resp = false;
                            }
                            return resp;
                        }
                    },
                    {
                        displayName: 'Confirmação de Atracação',
                        iconName: 'nature',
                        event: 'confatracacao',
                        expression: (dados: { dta_prevista_atracacao: string, terminal_atracacao: string, bl: string, previous_dta_prevista_atracacao: string | boolean, complementos: { documentos: any, container: any[]}, }): boolean => {
                            const lenIserv = dados.complementos.documentos.filter( doc => doc.tipodocumento === 'iserv').length;
                            let resp = true;
                            if (dados.complementos.container.length === 0) {
                                resp = false;
                            } else if (lenIserv === 0) {
                                resp = false;
                            } else if (!dados.bl) {
                                resp = false;
                            } else if (!dados.terminal_atracacao) {
                                resp = false;
                            } else if (!dados.dta_prevista_atracacao) {
                                resp = false;
                            }
                            return resp;
                        }
                    },
                    {
                        displayName: 'Informar Presença de Carga',
                        iconName: 'all_out',
                        event: 'presencacarga',
                        expression: (dados: { dta_prevista_atracacao: string, terminal_atracacao: string, bl: string, notify_pres_carga: boolean, previous_dta_prevista_atracacao: string | boolean, complementos: {container: any[]}, }): boolean => {
                            let resp = true;
                            if (!dados.notify_pres_carga) {
                                resp = false;
                            } else if (dados.complementos.container.length === 0) {
                                resp = false;
                            } else if (!dados.bl) {
                                resp = false;
                            } else if (!dados.terminal_atracacao) {
                                resp = false;
                            } else if (!dados.dta_prevista_atracacao) {
                                resp = false;
                            } else if (!dados.previous_dta_prevista_atracacao) {
                                resp = false;
                            }
                            return resp;
                        }
                    },
                    {
                        displayName: 'Validar Recebimento BL',
                        iconName: 'feedback',
                        expression: () => {
                            return false;
                        }
                    }
                ],
                expression: (dados) => {
                    return this.typePermission === 'r' ? false : true;
                }
            },
        ];
    }
}

