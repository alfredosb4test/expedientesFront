import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { BottonbarComponent } from './bottonbar/bottonbar.component';
import { MaterialModule } from '../material.module';
 

@NgModule({
  declarations: [
    BreadcrumbsComponent,
    SidebarComponent,
    HeaderComponent,
    BottonbarComponent, 

  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  exports:[
    BreadcrumbsComponent,
    SidebarComponent,
    HeaderComponent,
    BottonbarComponent, 
  ]
})
export class SharedModule { }
