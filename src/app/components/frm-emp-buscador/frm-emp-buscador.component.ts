import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Cempleado } from 'src/app/interfaces/empleado.interface';
 
@Component({
  selector: 'app-frm-emp-buscador',
  templateUrl: './frm-emp-buscador.component.html',
  styles: [
  ]
})
export class FrmEmpBuscadorComponent implements OnInit {
  @Input() buscar: string = '';
  @Input() placeholder: string = '';
  @Input() tabla: string = '';
  @Input() campo: string = '';
  @Output() valorSalida: EventEmitter<Cempleado> = new EventEmitter();

  
  constructor(  private fb: FormBuilder) { }

  public frmBuscaEmp = this.fb.group({
    buscar: ['', [Validators.required] ]
  });
  ngOnInit(): void {
  }

  busUserEmp(){
  }
}
