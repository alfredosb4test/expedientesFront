import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CatLeg } from 'src/app/models/categorias.models';
import { CatalogosService } from 'src/app/services/catalogos.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cat-legislativo',
  templateUrl: './cat-legislativo.component.html',
  styles: [
  ]
})
export class CatLegislativoComponent implements OnInit {

  page:number = 1;
  pageSize: number;
  totalItems: number = 0;
  previousPage: any;
  catMix: CatLeg[] = [];
  accesoUsr = 0;

  public frmAddCat = this.fb.group({
    id_cl:[''],
    categoria:['', [Validators.required, Validators.minLength(3)] ],
    activo:[false]
  });

  constructor(private fb: FormBuilder, 
    private modalService: NgbModal,
    private usuarioService: UsuarioService,
    private catServices: CatalogosService) { }
  ngOnInit(): void {
    this.accesoUsr = this.usuarioService.getAcceso();
    this.loadData(1);
    this.pageSize = 10;
  }


  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.loadData(this.previousPage);
    }
  }

  loadData(page) {
    this.catServices.getCatLegislativas(page, this.pageSize)
    .subscribe( resp=>{ 
      this.totalItems = resp.total;
      this.pageSize = resp.regsAMostrar;
      this.catMix = resp.catMix;
    });
  }


  openModal( targetModal:any, categoriaEdit: CatLeg ) {    
    if( this.accesoUsr !== 5)
      return;
    const modalRef = this.modalService.open(targetModal, {
      centered: true,
      windowClass: 'modalTheme',
      backdrop: 'static'
      });
      console.log('openModal ', categoriaEdit);
      const { categoria, activo, id_cl } = categoriaEdit
      this.frmAddCat.setValue({
        id_cl,
        categoria,
        activo
      })
  } 
  
  editCat(){
    if( this.frmAddCat.valid ){
      this.catServices.editCatLegislativa(this.frmAddCat.value)
      .subscribe( (resp: any) =>{ 
         
        if( resp.ok){
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Categoria actualizada correctamente',
            showConfirmButton: false,
            timer: 2500
          });
          this.loadData(this.page);
          this.frmAddCat.reset({ activo: false }); 
          this.modalService.dismissAll();
          return;
        }
      }, (err)=>{
        Swal.fire({
          title: 'Error!',
          text: 'Problemas con el servidor',
          icon: 'error',
        })
      });
       
    }
    
  }
}
