import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { ExpedienteBuscar } from 'src/app/models/expediente.models';
import { ExpedienteService } from 'src/app/services/expedientes.service';

@Component({
  selector: 'app-busca-exp',
  templateUrl: './busca-exp.component.html',
  styles: [
  ]
})
export class BuscaExpComponent implements OnInit {
  catExp: ExpedienteBuscar[] = [];
  encontrado: boolean = true;
  buscar: string;
  load: boolean = true;
  constructor(  private activateRouter:ActivatedRoute,
                private router: Router,
                private expService: ExpedienteService  ) { }

  ngOnInit(): void {
    this.load = true;
    this.activateRouter.params.subscribe( paramas =>{
      this.buscar = paramas.texto;
      this.expService.buscarExpediente( this.buscar )
      .subscribe( resp =>{
          console.log(resp);
          this.encontrado = true;
          this.load = false;
          this.catExp = resp.catExp;
          if( !this.catExp.length )
            this.encontrado = false;
          
        })
      
    })
  }

  delDocumento( id_expediente, numero ){
    
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
