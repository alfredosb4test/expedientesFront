import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDateParserFormatter, NgbDateStruct, NgbInputDatepickerConfig,NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';

import {DragDropModule} from '@angular/cdk/drag-drop';
import {CdkDragEnd,CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

import { ExpedienteService } from 'src/app/services/expedientes.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { CatalogosService } from 'src/app/services/catalogos.service';
import { environment } from 'src/environments/environment';
import { SettingsService } from 'src/app/services/settings.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';


const urlLocal = environment.urlLocal;
@Component({
  selector: 'app-frm-doc',
  templateUrl: './frm-doc.component.html',
  providers: [NgbInputDatepickerConfig],
  styleUrls: ['cssFrm.css'],
})

export class FrmDocComponent implements OnInit {
  public base_url: string = urlLocal;
  @ViewChild('procesosModal') private procesosModal;
  @ViewChild('uploadModal') private uploadModal;
 
  aprueba: NgbDateStruct;
  fecha_concluido: NgbDateStruct;
  fechadese: NgbDateStruct;
  entrada: NgbDateStruct;
  profFecha: NgbDateStruct;
  proEditfecha: NgbDateStruct;
  fecha_DOF: NgbDateStruct;
  fechaEditPro: NgbDateStruct;

  isSubmitted = false;
  autores: number = 0;
  n_procesos: number = 0;
  public isCollapsed = true;

  registrationForm: FormGroup;
  procesoForm: FormGroup;
  procesoEditForm: FormGroup;
 

  public lstTodo = [];
  public lstPriSegComi = [];
  public lstLegislativo = [];
  private selectedOptions:any = [];
  public procesos:any = [];
  public archivos:any = [];
  // items que se pasan a seleccionados
  public done = [];

  public fileSubir: File;
  public fileUpload;
  public editar: boolean = false;
  public id_expediente: number;
  public id_documento: number;
  public btn_txt: string = 'Guardar Documento';
  public numero: string;
  public tema: string;
  private editProModal;
  private verProcesosModal;
  private verUploadModal;
  public accesoUsr:number;
  
  constructor( public config: NgbInputDatepickerConfig, 
               public calendar: NgbCalendar, 
               private modalService: NgbModal,
               private route: ActivatedRoute,
               private router: Router,
               private _location: Location,
               public fb: FormBuilder,
               private expService: ExpedienteService,
               private catService: CatalogosService,
               private usuarioService:UsuarioService,
               private fileUploadService: FileUploadService, 
               private settingService: SettingsService) { 
      // customize default values of datepickers used by this component tree
      config.minDate = {year: 1900, month: 1, day: 1};
      config.maxDate = {year: 2099, month: 12, day: 31};
  
      // days that don't belong to current month are not visible
      config.outsideDays = 'hidden';
  
      // weekends are disabled
      config.markDisabled = (date: NgbDate) => calendar.getWeekday(date) >= 6;
  
      // setting datepicker popup to close only on click outside
      config.autoClose = 'outside';
  
      // setting datepicker popup to open above the input
      config.placement = 'top-start';
      config.placement = 'top-end';
      
      this.crearFrm();
  }
    
  ngOnInit(): void {
    this.accesoUsr = this.usuarioService.getAcceso();
    if ( this.settingService.getTema() == 'stylesNegro') {
      this.tema = 'dark-modal';
    }
    
    this.cargaCatalogos();
 
    // Insertar - Editar
    this.route.queryParams.subscribe( (params: Params)  =>{
      this.numero = params.numero;
      this.id_expediente = params.id_expediente;
      if ( params.accion == 'insertar'){
        console.log(params); 
        this.registrationForm.controls['id_expediente'].setValue(this.id_expediente);
        return;
      }

      // Editar           
      //console.log('paramsALL ', JSON.parse( params.doc ) );
      const documento = JSON.parse( params.doc );      
      this.n_procesos = Object.keys(documento.procesos).length;
      //console.log('params ',  documento.primera[0].primera );
      // if(Object.keys(documento.procesos).length)
      //   this.procesos = documento.procesos;
      
      let reforma = parseInt(documento.reforma);
      let desa = parseInt(documento.desa);
      this.id_expediente = documento.id_expediente;
      this.id_documento = documento.id_documento;
      this.registrationForm.controls['tipoFrm'].setValue('nuevo');       
      
      if ( Object.keys(documento).length === 0 )
        return;

      this.editar = true;
      this.btn_txt = 'Actualizar Documento';
      let id_documento = parseInt(documento.id_documento);  
      let id_expediente = parseInt(documento.id_expediente);  

      this.expService.getSenadoresSelect( id_documento )
        .subscribe( resp => {
          if( !resp.ok )
            return;

          this.done = resp.senadores;
          console.log('this.done::', this.done);
          console.log('this.done::', resp.senadores);
          resp.senadores.forEach(element => {
            this.selectedOptions.push({
              id: element.id,
              nombre: element.nombre,
              apellidos: element.apellidos,
            });
            this.autores++;
          });
          // Filtrar el listado de autores omitiendo los que ya esten en los seleccionados
          const idsNoPermitidos = this.done.map(doc => doc.id);
          // Sólo aceptar aquellos que lstTodo no esté en el arreglo de idsNoPermitidos
          this.lstTodo = this.lstTodo.filter(doc => !idsNoPermitidos.includes(doc.id));
          // agregamos al formulario los autores  seleccionados
          this.registrationForm.controls['senadores'].setValue(this.selectedOptions);
        });

      let arrSegunda = [];
      if( Object.keys(documento.segunda).length > 0 ){
        documento.segunda.forEach(element => { 
          arrSegunda.push(  element.segunda.toString() )
        });
      }
      
 
      this.registrationForm.patchValue( documento );
      if( Object.keys(documento.primera).length > 0 )
        this.registrationForm.controls['primera'].setValue(documento.primera[0].primera);

      this.registrationForm.controls['segunda'].setValue(arrSegunda);
      this.registrationForm.controls['reforma'].setValue(reforma);
      this.registrationForm.controls['desa'].setValue(desa);
      this.registrationForm.controls['tipoFrm'].setValue('editar');
      this.registrationForm.controls['id_documento'].setValue(id_documento); 
      
      // Datos para Formulario de agregar Proceso Legislativo
      this.procesoForm.controls['id_expediente'].setValue(id_expediente); 
      this.procesoForm.controls['id_documento'].setValue(id_documento); 

      const obj = { year: null, month: null, day: null };
      //this.aprueba = this.fecha_concluido = this.fechadese = this.entrada = this.fecha_DOF = obj;
      this.registrationForm.controls['aprueba'].setValue('0000-00-00');

      if( documento.apruebaF ){
        let aprueba = documento.aprueba.split("T")[0].split('-');
        const obj1 = { year: parseInt( aprueba[0] ), month: parseInt( aprueba[1] ), day: parseInt( aprueba[2] ) };
        this.aprueba = obj1;
      }
 
      if( documento.fecha_concluidoF ){
        let fecha_concluido = documento.fecha_concluido.split("T")[0].split('-');
        const obj2 = { year: parseInt( fecha_concluido[0] ), month: parseInt( fecha_concluido[1] ), day: parseInt( fecha_concluido[2] ) };
        this.fecha_concluido = obj2;
      }

      if( documento.fechadeseF ){
        let fechadese = documento.fechadese.split("T")[0].split('-');
        const obj3 = { year: parseInt( fechadese[0] ), month: parseInt( fechadese[1] ), day: parseInt( fechadese[2] ) };
        this.fechadese = obj3;
      }

      if( documento.entradaF ){
        let entrada = documento.entrada.split("T")[0].split('-');
        const obj4 = { year: parseInt( entrada[0] ), month: parseInt( entrada[1] ), day: parseInt( entrada[2] ) };
        this.entrada = obj4;
      }

      if( documento.fecha_DOFF ){
        let fecha_DOF = documento.fecha_DOF.split("T")[0].split('-');
        const obj5 = { year: parseInt( fecha_DOF[0] ), month: parseInt( fecha_DOF[1] ), day: parseInt( fecha_DOF[2] ) };
        this.fecha_DOF = obj5;
      }
    });
  }
  backClicked() {
    this._location.back();
  }
  async cargaCatalogos(){
    this.expService.catAutores()
      .subscribe( async resp => {
        //console.log('catAutores', resp);        
        this.lstTodo = await resp.listLegisladores         
    }); 
    this.expService.catPrimeraSegComision()
      .subscribe( resp => {
        this.lstPriSegComi=resp.listLegisladores         
    }); 

    this.catService.getCatLegislativas( 1, 1000 ).pipe(
        map( (items:any) => {          
            items = items.catMix.filter( (expe, index, arr)=>  ( expe.activo == 1 ) ? expe : null );
            return items;
        })
      ).subscribe( catLeg =>{
        this.lstLegislativo = catLeg
      })
  }
 
 
  crearFrm(){
    this.registrationForm = this.fb.group({
      id_expediente: [''],
      id_documento: [''],
      tipoFrm: [''],
      refe: ['', []],
      id_categoria: ['', [Validators.required]],
      asunto: ['', [Validators.required, Validators.minLength(3)]],
      autor: [''],
      legislatura: [1],
      annus: [1],
      periodo: [1],
      tipoperiodo: [1],
      reforma: [''],
      desa: [''],
      turno: [''],
      aprueba: ['0000-00-00'],
      fecha_concluido: ['0000-00-00'],
      fechadese: ['0000-00-00'],
      entrada: ['0000-00-00', [Validators.required]],
      observaciones: [''],
      observaprueba: [''],
      senadores: [''],
      senadores2: [''],
      primera: [''],
      segunda: [''],
      TA: [''],
      EA: [''],
      sinopsis: [''],
      suscritos: [''],
      DOF: [''],
      notas: [''],   
      fecha_DOF: ['0000-00-00'],
      id_gaceta: [''],
      d_debates: [''],
    });     

    this.procesoForm = this.fb.group({
      id: [''],
      id_expediente: [''],
      id_documento: [''],
      proTramite: ['', [Validators.required] ],
      proTexto: ['', []],
      profFecha: ['0000-00-00', []],
    }); 

    this.procesoEditForm = this.fb.group({
      id: [''],
      tramite: ['', [Validators.required] ],
      texto: ['', []],
      fechaF: [''],
    }); 
 
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if (!this.registrationForm.valid) {
      false;
    } else {
      // console.log(this.registrationForm);
      console.log('this.editar::', this.editar);
      if ( this.editar ) {
        this.expService.actualizaDoc( this.registrationForm.value )
          .subscribe( resp =>{
            console.log(resp);
            if( resp.ok ){
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: resp.msg,
                showConfirmButton: false,
                timer: 3500
              });
              //this._location.back();
              this.router.navigate(['/dashboard/buscarDocs', this.id_expediente, this.numero]);
            }else{
              Swal.fire({
                title: 'Error!',
                text: 'Problemas con el servidor',
                icon: 'error',
              })
            }
            
          });        
      }else{
        this.expService.insertarDoc( this.registrationForm.value )
          .subscribe( resp =>{
            console.log(resp);
            if( resp.ok ){
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: resp.msg,
                showConfirmButton: false,
                timer: 3500
              });
              this._location.back();
            }else{
              Swal.fire({
                title: 'Error!',
                text: 'Problemas con el servidor',
                icon: 'error',
              });
            }
          });
      }      
      console.log(JSON.stringify(this.registrationForm.value));
    }
  }
  
  change(options) {

    const select = document.getElementById("listAutor1")
    //this.selectedOptions = select.value

    
      
  }
  enviarAutor(){
    console.log( this.selectedOptions );
    if( this.selectedOptions.length <= 0){      
      return;
    }
    this.selectedOptions.forEach(element => {
      console.log( element );
      
    });
  }

  drop(event: CdkDragDrop<any[]>) {
    console.log('item::',event.previousContainer.data[event.previousIndex]);
    
    const $divi = event.previousContainer.data[event.previousIndex].divi;
    if (event.previousContainer === event.container || $divi) {
      //moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      
      //console.log(  'previousContainer: ', event.previousContainer.element.nativeElement.classList[2] ); 
      const $id = event.previousContainer.data[event.previousIndex].id;
      const $texto = event.previousContainer.data[event.previousIndex].nombre;
      if( event.previousContainer.element.nativeElement.classList[2] == 'lst1' ){
        
        this.selectedOptions.push({
          id: $id,
          nombre: $texto,
        });
        this.autores++;
      }else{
        this.selectedOptions = this.selectedOptions.filter((item) => item.id !== $id);
        this.autores--;
      }
      
      this.registrationForm.controls['senadores'].setValue(this.selectedOptions);
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      // console.log('event.previousContainer', event.previousContainer.data); 
      // console.log('event.container', event.container.data); 
      // console.log('event.previousIndex', event.previousIndex); 
      // console.log('event.currentIndex', event.currentIndex); 
      console.log('selectedOptions', this.selectedOptions); 

    }
  }
  
  verProcesos(){
    this.expService.getProcesosLeg( this.id_documento, this.id_expediente)
      .subscribe( resp => {
        console.log(resp);
        if( resp.ok ){
          this.procesos = resp.procesos;
          this.verProcesosModal = this.modalService.open( this.procesosModal, { centered: true, size: 'lg', modalDialogClass: this.tema  });
        }
      });
  }
  addProceso(): void {
    console.log(this.procesoForm);
    if (!this.procesoForm.valid) {
      false;
    } else {
      console.log(JSON.stringify(this.procesoForm.value));
      this.expService.insertHistorial(this.procesoForm.value)
        .subscribe( (resp:any) =>{
          console.log(resp);
          if( resp.ok ){
            this.n_procesos++;
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Proceso Legislativo agregado.',
              showConfirmButton: false,
              timer: 3500
            }); 
            this.procesoForm.reset();
            this.procesoForm.controls['id_expediente'].setValue( this.id_expediente ); 
            this.procesoForm.controls['id_documento'].setValue( this.id_documento ); 
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
  editaProcesoModal(editProModal, proceso){
    console.log(proceso);
    
    this.procesoEditForm.patchValue( proceso );
    if( proceso.fechaF ){
      console.log('editaProcesoModal', proceso.fecha);
      
      let fecha = proceso.fecha.split('-');
      const obj1 = { year: parseInt( fecha[0] ), month: parseInt( fecha[1] ), day: parseInt( fecha[2] ) };
      this.fechaEditPro = obj1;
      this.procesoEditForm.controls['fechaF'].setValue( this.fechaEditPro );
    }
    this.editProModal = this.modalService.open(editProModal, { centered: true, size: 'xl', backdrop: 'static', modalDialogClass: this.tema });
  }
  actualizaProceso(){
    console.log('ok1');
    
    if (!this.procesoEditForm.valid) {
      console.log('ok2');
      false;
    } else {
      console.log(this.procesoEditForm.value);
      this.expService.actualizaHisto( this.procesoEditForm.value )
        .subscribe( (resp:any) =>{
          console.log(resp);
          if( resp.ok ){
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Datos actualizados',
              showConfirmButton: false,
              timer: 3500
            }); 
            this.editProModal.close();           
            this.verProcesosModal.close();           
          }else{
            Swal.fire({
              title: 'Error!',
              text: 'Problemas con el servidor',
              icon: 'error',
            })
          }
        });
    }
  }
  delHistorial( id ){ 
    Swal.fire({
      title: 'Eliminar proceso?', 
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar!',
      cancelButtonText: 'Cerrar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.expService.deltHistorial( id )
          .subscribe( resp =>{
            if (resp.ok) {
              this.n_procesos--;
              Swal.fire(
                '',
                'Registro eliminado.',
                'success'
              );
              this.procesos = this.procesos.filter((item) => item.id !== id);              
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


  verArchivos(){
    this.fileSubir = null;
    this.expService.getArchivos( this.id_documento )
      .subscribe( resp => {
        console.log(resp);
        if( resp.ok ){
          this.archivos = resp.archivos;
        }
        this.verUploadModal = this.modalService.open( this.uploadModal, { centered: true, size: 'lg', modalDialogClass: this.tema  });
      });
  }
  cargarArchivo( file: any ) {
    this.fileSubir = file.files[0];
    console.log('file::', file.files[0]);
  }
  nuevoArchivo() {
    if( !this.fileSubir )
      return;
    
    this.fileUploadService
      .insertFile( this.fileSubir, 'documentos', this.id_documento, this.numero )
      .then( fileUpload => {
        if( fileUpload.ok ){          
          Swal.fire('Guardado', fileUpload.msg, 'success');
          this.verUploadModal.close();
        }else{
          Swal.fire('Error', fileUpload.msg, 'error');
        }
      }).catch( err => {
        console.log(err);
        Swal.fire('Error', 'No se pudo subir el archivo', 'error');
      });
  }
  delArchivo( id, nombre ){
    Swal.fire({
      title: 'Eliminar documento?', 
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar!',
      cancelButtonText: 'Cerrar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.fileUploadService.delArchivo( this.numero, id, nombre )
          .subscribe( resp =>{
            if (resp.ok) {
              Swal.fire(
                '',
                'Registro eliminado.',
                'success'
              );
              this.archivos = this.archivos.filter((item) => item.id !== id);    
              this.verUploadModal.close();          
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

  campoNoValido(campo: string): boolean{ 
    if ( this.registrationForm.get(campo).invalid && this.isSubmitted ) {
      return true;
    } else {
      return false;
    } 
  }
}


 