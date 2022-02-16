import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginForm } from 'src/app/interfaces/login.interface';
import { Usuario } from 'src/app/models/usuario.model';
import { LoginService } from 'src/app/services/empleados/login.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import 'animate.css';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  formSubmitted:boolean = false;
  public formLogin = this.fb.group({
    usuario:[localStorage.getItem('usuario') || 'eusebio.tovar', [Validators.required, Validators.minLength(3)] ],
    pwd:['t0v4r.VsH2', [Validators.required, Validators.minLength(3)] ],
    recordar:[''],
    login:[true]
  });
  public frmPwd = this.fb.group({
    txtCorreo:['', [Validators.required, Validators.minLength(3)] ],
    recuperaPwd:[true]
  });
  
  constructor(private router: Router, 
              private activeRoute: ActivatedRoute,
              private fb: FormBuilder, 
              public loginServ: LoginService,               
              private modalService: NgbModal) { }

  ngOnInit(): void {
  }


  login( ){

    //  this.loginServ.usuario = new Usuario(
    //    "2",
    //    "Gomez",
    //    "Comercial",
    //    '', 
    //    "luisg@operacionesdelnorte.com",
    //    "Gerentes de Cuenta",
    //    "65",
    //    "199",
    //    "Luis",
    //    '',
    //    '',
    //    "Luis",
    //    '2',
    //    ''
    //  );
     
    //  const element = document.querySelector('#login');
    //  element?.classList.add('animate__animated', 'animate__fadeOut');
 
    //  element?.addEventListener('animationend', () => {
    //    this.router.navigate(["/dashboard/bienvenido"]); return;
    //  });
     
    //  return;

    this.formSubmitted = true;
    console.log('formLogin::',this.formLogin.value);
  //   return;
    if( this.formLogin.valid ){
      this.loginServ.login(this.formLogin.value)
      .subscribe( (resp: any) =>{
        //this.cdepartamento = resp.data;
        console.log("loginServ.login", resp);
        if( resp.data == 'no_existe'){
          Swal.fire({
            title: 'Error!',
            text: 'Usuario no valido',
            icon: 'error',
          });
          return;
        }
        if( this.formLogin.get('recordar')?.value ){
          localStorage.setItem('recordar', this.formLogin.get('usuario')?.value )
        }else{
          localStorage.removeItem('recordar')
        }
        this.loginServ.usuario = resp.usuario;

        console.log( this.loginServ.usuario ); 
        this.router.navigate(["/dashboard/bienvenido"]);
      }, (err)=>{
         
        Swal.fire({
          title: 'Error!',
          text: err.error.msg,
          icon: 'error',
        })
      });

    }
    // this.router.navigateByUrl("/dashboard");
  }

  campoNoValido( campo:string ): boolean{
    if( this.formLogin.get(campo)?.invalid && this.formSubmitted ){
      return true;
    }
    return false;
  }
  openModal(targetModal:any) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static'
    });
  }
 
}
