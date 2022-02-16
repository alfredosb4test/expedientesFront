import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/empleados/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {
  public NombreUsr: string = '';
  constructor( public usrServide: LoginService) { }

  ngOnInit(): void {
    // this.NombreUsr = this.usrServide.Usuario;
    console.log('dash:', this.usrServide.usuario);
    
  }

}
