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
    usuario:[localStorage.getItem('recordar') || '', [Validators.required, Validators.minLength(3)] ],
    pwd:['', [Validators.required, Validators.minLength(3)] ],
    recordar:[''],
    login:[true]
  });
  public frmPwd = this.fb.group({
    txtCorreo:['', [Validators.required, Validators.minLength(3)] ],
    recuperaPwd:[true]
  });

  public errServ: boolean = false;
  public msgServ: string = '';
  
  constructor(private router: Router, 
              private activeRoute: ActivatedRoute,
              private fb: FormBuilder, 
              public loginServ: LoginService,               
              private modalService: NgbModal) { }

  ngOnInit(): void {
    const recuerda = localStorage.getItem("recordar") || ''
    if( recuerda )
      this.formLogin.controls['recordar'].setValue(true);
  }


  login( ){
    this.formSubmitted = true;
    this.msgServ = '';
    //console.log('formLogin::',this.formLogin.value); return;
    if( this.formLogin.valid ){
      this.loginServ.login(this.formLogin.value)
      .subscribe( (resp: any) =>{ 
        if( !resp.ok ){
          this.errServ = true;
          this.msgServ = resp.msg;
          return
        }

        if( this.formLogin.get('recordar')?.value ){
          localStorage.setItem('recordar', this.formLogin.get('usuario')?.value )
        }else{
          localStorage.removeItem('recordar')
        }
        this.loginServ.usuario = resp.usuario;
        this.router.navigate(["/dashboard/bienvenido"]);
      }, (err)=>{
        //console.log(err);        
        Swal.fire({
          title: 'Error!',
          text: err,
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
