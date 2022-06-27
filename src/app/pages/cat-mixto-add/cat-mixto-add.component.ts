import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CatalogosService } from 'src/app/services/catalogos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cat-mixto-add',
  templateUrl: './cat-mixto-add.component.html',
  styles: [
  ]
})
export class CatMixtoAddComponent implements OnInit {
  public frmPwd = this.fb.group({
    nombre:['', [Validators.required, Validators.minLength(3)] ],
    visible:[false]
  });
  constructor(private fb: FormBuilder, 
    private modalService: NgbModal,
    private catServices: CatalogosService) { }

  ngOnInit(): void {
  }
  openModal(targetModal:any) {
    this.modalService.open(targetModal, {
     centered: true,
     windowClass: 'modalTheme',
     backdrop: 'static'
    });
  } 
  nuevaCat(){
    if( this.frmPwd.valid ){
      // console.log(this.frmPwd.value); return;
      
      this.catServices.addCatMixta(this.frmPwd.value)
      .subscribe( (resp: any) =>{ 
        console.log(resp);
        if( resp.ok){
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Categoria agregada correctamente',
            showConfirmButton: false,
            timer: 2500
          })
          this.frmPwd.reset({ visible: false }); 
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
      console.log('frmPwd::',this.frmPwd.value);
    }
    
  }
}
