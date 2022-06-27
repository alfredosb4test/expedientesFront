import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { Expediente } from 'src/app/models/expediente.models';
import { ExpedienteService } from 'src/app/services/expedientes.service';

@Component({
  selector: 'app-list-expediente',
  templateUrl: './list-expediente.component.html',
  styles: [
  ]
})
export class ListExpedienteComponent implements OnInit {
  page:number = 1;
  pageSize: number;
  totalItems: number = 0;
  previousPage: any;
  load: boolean = true;
  catExp: Expediente[] = [];
  constructor(private expService: ExpedienteService,
              private router: Router ) { }

  ngOnInit(): void {
    this.pageSize = 20;
    this.loadData(1);
  }


  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.loadData(this.previousPage);
    }
  }

  loadData(page) {
    this.load = true;
    this.expService.getExpedientes(page, this.pageSize)
    .subscribe( resp=>{
      console.log('this.catExp', resp);
      this.load = false;
      this.totalItems = resp.total;
      this.pageSize = resp.regsAMostrar;
      this.catExp = resp.catExp;

    });
  }

  delDocumento( id_expediente, numero ){
    console.log(id_expediente);
    Swal.fire({
      title: `Eliminar expediente ${numero}?`, 
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Borrar!',
      cancelButtonText: 'Cerrar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.expService.delExpediente( id_expediente, numero )
          .subscribe( resp =>{
            if (resp.ok) {
              Swal.fire(
                '',
                'Registro eliminado.',
                'success'
              );
              this.router.navigate(['/dashboard/expedientes'])
              .then(() => {
                setTimeout(()=>{ window.location.reload(); }, 1000)
                
              });      
            }else{
              Swal.fire({
                title: 'Error!',
                text: 'Problemas con el servidor',
                icon: 'error',
              });
            }
          });
      }
    });
  }

}
