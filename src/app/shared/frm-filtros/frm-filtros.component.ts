import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CatalogosService } from 'src/app/services/catalogos.service';

@Component({
  selector: 'app-frm-filtros',
  templateUrl: './frm-filtros.component.html',
  styleUrls: ['./frm-filtros.component.css']
})
export class FrmFiltrosComponent implements OnInit {
  public listClientes;
  public listZona;
  public listSalas;
  public selectList;

  //"0: Object" es para poner el primer objeto como valor
  public formFiltros = this.fb.group({
    listClientes:"0: Object",
    listZona:"0: Object",
    listSalas:"0: Object", 
  });

  constructor( private catService: CatalogosService, private fb: FormBuilder ) { 
    var filtros;
    if(localStorage.getItem('filtros' )){
      filtros= JSON.parse(localStorage.getItem('filtros' ) );
    }
    else{
      filtros={cliente:{id:"0",nombre:"Todos"},zona:{id:"0",nombre:"Todos"},sala:{id:"0",nombre:"Todos"}};
    }
    catService.getClientes().subscribe((data) =>{
      this.listClientes=[{id:"0",nombre:"Todos"}].concat(data);
    });
    catService.getZonas().subscribe((data) =>{
      this.listZona=[{id:"0",nombre:"Todos"}].concat(data);
    });
    var zona;
    var cliente;
    if(filtros.zona.id!="0"){
      zona=filtros.zona.id;
    }
    if(filtros.cliente.id!="0"){
      cliente=filtros.cliente.nombre;
    }
    catService.getSalas(zona,cliente).subscribe((data) =>{
      this.listSalas=[{id:"0",nombre:"Todos"}].concat(data);
    }); 
    
    /*this.listClientes=catService.getClientes();
    this.listZona=catService.getZonas();
    this.listSalas=catService.getSalas();*/
  }

  ngOnInit(): void {
    this.setFiltros();
  }

  //para poder usar setValue con objetos en setFiltros
  compareFiltros(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2; 
  }

  selectLista( e ){
    const lstCliente = this.formFiltros.get('listClientes')?.value ;
    const lstZona = this.formFiltros.get('listZona')?.value ;
    const lstSala = this.formFiltros.get('listSalas')?.value;
    const filtros = {
      cliente: lstCliente,
      zona: lstZona,
      sala:  lstSala,
    }
    localStorage.setItem('filtros', JSON.stringify( filtros ) );
  }

  setFiltros(){
    const filtros = JSON.parse(localStorage.getItem('filtros' ) );
    this.formFiltros.setValue({
      listClientes: filtros.cliente,
      listZona: filtros.zona,
      listSalas: filtros.sala,
    })
  }

  filtraSalas(){
    const filtros = JSON.parse(localStorage.getItem('filtros' ) );
    var zona;
    var cliente;
    if(filtros.zona.id!="0"){
      zona=filtros.zona.id;
    }
    if(filtros.cliente.id!="0"){
      cliente=filtros.cliente.nombre;
    }
    this.catService.getSalas(zona,cliente).subscribe((data) =>{
      this.listSalas=[{id:"0",nombre:"Todos"}].concat(data);
    });
  }

}
