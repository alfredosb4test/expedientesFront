import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { ExpedienteService } from 'src/app/services/expedientes.service';

@Component({
  selector: 'app-frm-expediente',
  templateUrl: './frm-expediente.component.html',
  styles: [
  ]
})
export class FrmExpedienteComponent implements OnInit {
  @Input() datos:{};
  @Input() tipoForm: string;
  @Output() statusForm: EventEmitter<string> = new EventEmitter();

  editExpForm: FormGroup;
  isSubmitted: boolean;
  public btn_txt: string = 'Guardar';
  constructor(  public fb: FormBuilder,
                private expService: ExpedienteService,  ) { }

  ngOnInit(): void {

    this.editExpForm = this.fb.group({
      id_expediente: [],
      numero: [, [Validators.required] ],
      estatus: ['NA', [] ],
      tramite: ['NA', [] ],
      fraccion: ['NA', []],
    });
    console.log( this.datos );
    if ( this.tipoForm == 'nuevo' ) {
      this.btn_txt = 'Guardar';      
    }else{
      this.editExpForm.patchValue(this.datos);
      this.btn_txt = 'Actualizar Expediente';
    }
  }


  onSubmit(){
    this.isSubmitted = true;
    if (!this.editExpForm.valid) {
      false;
    } else {
      console.log( this.editExpForm.value );
      if ( this.tipoForm == 'nuevo' ) {
        
        this.expService.insertarExpediente( this.editExpForm.value )
          .subscribe( (resp: any) =>{
            //console.log(resp);
            if( resp.ok ){
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: resp.msg,
                showConfirmButton: false,
                timer: 2500
              }); 
              this.editExpForm.reset();
              this.editExpForm.controls['estatus'].setValue( "NA" );
              this.editExpForm.controls['tramite'].setValue( "NA" );
              this.editExpForm.controls['fraccion'].setValue( "NA" );
              this.isSubmitted = false;
              this.statusForm.emit('ok');
            }else{
              Swal.fire({
                title: 'Error!',
                text: 'Problemas con el servidor.',
                icon: 'error',
              })
            }            
          }); 
      } else {
        this.expService.editExpediente( this.editExpForm.value )
          .subscribe( (resp: any) =>{
            if( resp.ok ){
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: resp.msg,
                showConfirmButton: false,
                timer: 2500
              }); 
              this.editExpForm.reset();
              this.editExpForm.controls['estatus'].setValue( "NA" );
              this.editExpForm.controls['tramite'].setValue( "NA" );
              this.editExpForm.controls['fraccion'].setValue( "NA" );
              this.isSubmitted = false;
              this.statusForm.emit('ok');
            }else{
              Swal.fire({
                title: 'Error!',
                text: 'Problemas con el servidor.',
                icon: 'error',
              })
            }
            
          });         
      }
    }
  }


  campoNoValido(campo: string): boolean{ 
    if ( this.editExpForm.get(campo).invalid && this.isSubmitted ) {
      return true;
    } else {
      return false;
    } 
  }

}
