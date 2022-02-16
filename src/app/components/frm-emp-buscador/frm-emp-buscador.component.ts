import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Cempleado } from 'src/app/interfaces/empleado.interface';
import { EmpleadosService } from 'src/app/services/empleados/empleados.service';

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

  
  constructor(private empServ: EmpleadosService, private fb: FormBuilder) { }

  public frmBuscaEmp = this.fb.group({
    buscar: ['', [Validators.required] ]
  });
  ngOnInit(): void {
  }

  busUserEmp(){
    let {buscar} = this.frmBuscaEmp.value;
    if( !buscar.length ){
      return;
    }
    console.log(buscar);
    console.log('campo ', this.campo);
    console.log('tabla ', this.tabla);
    
    this.empServ.buscarCempleado ( buscar, this.tabla, this.campo )
      .subscribe((data:any)=>{
        //console.log(data.data);
        this.valorSalida.emit(data.data);
      })
    // this.route.navigateByUrl('/');
  }
}
