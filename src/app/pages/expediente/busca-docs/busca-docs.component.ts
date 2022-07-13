import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { delay } from 'rxjs/operators';

import { Documento } from 'src/app/models/documentos.models';
import { ExpedienteService } from 'src/app/services/expedientes.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';


@Component({
  selector: 'app-busca-docs',
  templateUrl: './busca-docs.component.html',
  styles: [
  ]
})
export class BuscaDocsComponent implements OnInit {

  @ViewChild('editExpModal') private editExpModal;

  public documentos: Documento[] = [];
  public id_expediente: number;
  public numero: string;
  private verEditExpModal;
  public datosEdit;
  private isSubmitted: boolean;
  public loadExp: boolean = false;
  public accesoUsr:number;
  constructor(  private activateRouter:ActivatedRoute,
                private expService: ExpedienteService,
                private _location: Location,
                private modalService: NgbModal,
                public fb: FormBuilder,
                private usuarioService:UsuarioService,
                private router: Router  ) { }


    

  ngOnInit(): void {
    this.accesoUsr = this.usuarioService.getAcceso();
    this.activateRouter.params.subscribe( paramas =>{
      this.id_expediente = paramas.id_expediente;
      this.numero = paramas.numero.replace(' ', '_');
      this.expService.buscarExpedienteDocs( this.id_expediente )
        .subscribe( resp =>{
          this.loadExp = true;
          this.documentos = resp.expDoc;
         // console.log( 'docs', this.documentos );
        }, err => {
          console.log(err);
          
        });      
    }); 
  }

  backClicked() {
    this._location.back();
  }

  openModal( targetModal:any, texto: string ) {
    const modalRef = this.modalService.open(targetModal, {
      centered: true,
      windowClass: 'modalTheme',
      scrollable : true,
      size: 'xl'
      });
      
      let div = document.querySelector('.txtDOF');
     
      div.innerHTML = texto;
      
  } 

  editarDoc( item, numero ){
    this.router.navigate(['/dashboard/editDoc'], { queryParams: { doc: JSON.stringify(item), numero},skipLocationChange: true, replaceUrl: true} ); // skipLocationChange no muestra los datos en la URL
    // this.router.navigate(['/dashboard/editDoc'], { queryParams: { doc: JSON.stringify(item), numero}, skipLocationChange: true  } ); // skipLocationChange no muestra los datos en la URL
  }
  insertarDoc(id_expediente, numero){
    this.router.navigate(['/dashboard/insertDoc'], { queryParams: { accion: 'insertar', id_expediente, numero }  } );
  }

  delDocumento( id_documento, numero ){
    console.log(id_documento);
    console.log('numero', numero);
    Swal.fire({
      title: 'Eliminar documento?', 
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Borrar!',
      cancelButtonText: 'Cerrar'
    }).then((result) => {
      if (result.isConfirmed) {

        this.expService.delDocumento( id_documento, numero )
          .subscribe( resp =>{
            if (resp.ok) {
              Swal.fire(
                '',
                'Registro eliminado.',
                'success'
              );
              this.router.navigate(['/dashboard/buscarDocs', this.id_expediente, this.numero])
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

  duplicaDocumento( id_documento ){
    
    Swal.fire({
      title: 'Duplicar documento?', 
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#7cbc0a',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Duplicar!',
      cancelButtonText: 'Cerrar'
    }).then((result) => {
      if (result.isConfirmed) {

        this.expService.duplicaDoc( id_documento )
          .subscribe( resp =>{
            if (resp.ok) {
              Swal.fire(
                '',
                'Documento duplicado.',
                'success'
              );
              this.router.navigate(['/dashboard/buscarDocs', this.id_expediente, this.numero])
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
  editarExpeModal( id_expediente, numero ){
    this.expService.getExpediente( id_expediente )
    .subscribe( resp =>{
      console.log(resp.expediente[0]);
      this.datosEdit = resp.expediente[0];
      if( resp.ok ){
        this.verEditExpModal = this.modalService.open( this.editExpModal, {
          centered: true,
          windowClass: 'modalTheme',
          size: 'lg',
          backdrop: 'static'
          });
          //, { centered: true, size: 'lg'  });
      }
    }); 
  }
  statusFrmExpediente( statusFrm: string ){
    if ( statusFrm == 'ok') {
      this.verEditExpModal.close();
    }else{
      Swal.fire({
        title: 'Error!',
        text: 'Problemas con el servidor',
        icon: 'error',
      })
    }
  }
}
