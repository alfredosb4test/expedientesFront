import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CatMix } from 'src/app/models/categorias.models';
import { CatalogosService } from 'src/app/services/catalogos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cat-mixto',
  templateUrl: './cat-mixto.component.html',
  styles: [
  ]
})


export class CatMixtoComponent implements OnInit {
  page:number = 1;
  pageSize: number;
  totalItems: number = 0;
  previousPage: any;
  catMix: CatMix[] = [];

  public frmAddCat = this.fb.group({
    id_categoria_mixto:[''],
    nombre:['', [Validators.required, Validators.minLength(3)] ],
    visible:[false]
  });

  constructor(private fb: FormBuilder, 
    private modalService: NgbModal,
    private catServices: CatalogosService) { }

  ngOnInit(): void {
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
    this.catServices.getCatMixtas(page, this.pageSize)
    .subscribe( resp=>{ 
      
      this.totalItems = resp.total;
      this.pageSize = resp.regsAMostrar;
      this.catMix = resp.catMix;
      //console.log('catMix:', this.catMix);
      
    });
  }

  openModal( targetModal:any, categoriaEdit: CatMix ) {
    const modalRef = this.modalService.open(targetModal, {
      centered: true,
      windowClass: 'modalTheme',
      backdrop: 'static'
      });
      console.log('openModal ', categoriaEdit);
      const { nombre, visible, id_categoria_mixto } = categoriaEdit
      this.frmAddCat.setValue({
        id_categoria_mixto,
        nombre,
        visible
      })
  } 

  editCat(){
    if( this.frmAddCat.valid ){
      //console.log(this.frmAddCat.value);return;      
      this.catServices.editCatMixta(this.frmAddCat.value)
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
          this.frmAddCat.reset({ visible: false }); 
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
