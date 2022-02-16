import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

 
import { LoginComponent } from './login/login.component';
import { RecuperarPwdComponent } from './recuperar-pwd/recuperar-pwd.component';



@NgModule({
  declarations: [
    LoginComponent, 
    RecuperarPwdComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    LoginComponent, 
  ]
})
export class AuthModule { }
