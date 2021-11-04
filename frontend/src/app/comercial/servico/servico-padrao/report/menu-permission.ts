import { AccessType } from "src/app/shared/report/security/acess-type";

export class Menu extends AccessType {
    getWindowMenu() {
        return [
            {
                displayName: this.btn_form_access,
                iconName: 'close',
                event: this.typePermission,
                expression: () => {
                    return true;
                }
            },
            // {
            //     displayName: 'Add Ocorrência',
            //     iconName: 'add_comment',
            //     event: 'ocorrencia'
            // },
            // {
            //     displayName: 'Notificações',
            //     children: [
            //         {
            //             displayName: 'Alertar Parceiro',
            //             iconName: 'group',
            //             event: 'alertar_parceiro'
            //         },
            //         {
            //             displayName: 'Solicitar BL',
            //             iconName: 'question_answer',
            //         },
            //         {
            //             displayName: 'Validar Recebimento BL',
            //             iconName: 'feedback',
            //         }
            //     ]
            // },

        ];
    }
}

