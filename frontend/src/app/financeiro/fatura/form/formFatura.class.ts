import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

export class FormFatura {
    constructor(parameters) {
        
    }

      /**
   * Metodo para observar as alterações do status
   */
  private changeStatusObserver(component: any) {
    (component.formulario.get('id_status') as FormControl).valueChanges.subscribe( status => {
      console.log(status)
        if (status === '5') {
        } else {
          // this.setValidator(component);
        }
      }
    );
  }
}