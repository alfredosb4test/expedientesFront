import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoutingModule } from './auth/authRouting';
import { MaterialModule } from './material.module';

const routes: Routes = [
  { 
    path: '', 
    redirectTo: '/login', 
    pathMatch: 'full'  
  },
]
@NgModule({
  imports: [
    RouterModule.forRoot( routes , {onSameUrlNavigation: 'reload'}),
    AuthRoutingModule,
    MaterialModule,
  ],
  exports:[
    RouterModule,

  ]
})
export class AppRoutingModule { }
