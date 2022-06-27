import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { map } from 'rxjs/operators'; 
import { ExpedienteBuscar } from 'src/app/models/expediente.models';
 
import { CatalogosService } from 'src/app/services/catalogos.service';
import { ExpedienteService } from 'src/app/services/expedientes.service';

@Component({
  selector: 'app-reporte-expediente',
  templateUrl: './reporte-expediente.component.html',
  styles: [
  ]
})
export class ReporteExpedienteComponent implements OnInit {
  page:number = 1;
  pageSize: number;
  totalItems: number = 0;
  previousPage: any;
  parametrosBuscar;
  busquedaForm: FormGroup;
  catExp: ExpedienteBuscar[] = [];
  load: boolean = false;
  public lstLegislativo = [];
  public isSubmitted: boolean;
  public ocultaBuscador: boolean = false;
  constructor(
               public fb: FormBuilder,
               private expService: ExpedienteService, 
               private catService: CatalogosService,
  ) { }

  ngOnInit(): void {
    this.catService.getCatLegislativas( 1, 1000 ).pipe(
      map( (items:any) => {          
          items = items.catMix.filter( (expe, index, arr)=>  ( expe.activo == 1 ) ? expe : null );
          return items;
      })
    ).subscribe( catLeg =>{
      this.lstLegislativo = catLeg
    });
    this.busquedaForm = this.fb.group({
      id_categoria: [''],
      legislatura: [''],
      annus: [''],
      periodo: [''],
      tipoperiodo: [''],
      desp_desch: [''],
      desch: [''],
      desa: [''],
      fraccion: [''],
    });
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if (!this.busquedaForm.valid) {
      false;
    } else {
      // console.log(this.registrationForm);
      this.parametrosBuscar = this.busquedaForm.value;
      this.loadData(1);
    }
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.loadData(this.previousPage);
    }
  }
  loadData(page) {
    this.load = true;
    console.log(this.parametrosBuscar);
    
    this.expService.buscarReporte(this.parametrosBuscar, this.page)
    .subscribe( resp=>{
      if ( !resp.ok ) {
        return;
      }
      this.ocultaBuscador = true;
      console.log('this.catExp', resp);
      this.load = false;
      this.totalItems = resp.total;
      this.pageSize = resp.regsAMostrar;
      this.catExp = resp.rows;

    });
  }

  regresar(){
    this.ocultaBuscador = false; 
    this.busquedaForm.controls['id_categoria'].setValue('');
    this.busquedaForm.controls['legislatura'].setValue('');
    this.busquedaForm.controls['annus'].setValue('');
    this.busquedaForm.controls['periodo'].setValue('');
    this.busquedaForm.controls['tipoperiodo'].setValue('');
    this.busquedaForm.controls['desp_desch'].setValue('');
    this.busquedaForm.controls['desch'].setValue('');
    this.busquedaForm.controls['desa'].setValue('');
    this.busquedaForm.controls['fraccion'].setValue('');
  }

}
