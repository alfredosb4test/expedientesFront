import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module';
import { MaterialModule } from './material.module';
//import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AuthModule } from './auth/auth.module';
import { RouterModule } from '@angular/router';  
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

 
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';

 
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthGuard } from './guards/auth.guard';
import { DatePipe, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { PagesRoutingModule } from './pages/pages.routing';
import { SharedModule } from './shared/shared.module';
import { ChartModule } from 'angular-highcharts';

@NgModule({
  declarations: [
    AppComponent,
    NopagefoundComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    RouterModule,
    AppRoutingModule,
    PagesModule, 
    PagesRoutingModule,
    AuthModule, 
    NgbDatepickerModule,
    ReactiveFormsModule,
    SharedModule,
    ChartModule
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy,  }, AuthGuard,DatePipe],
 
  bootstrap: [AppComponent]
})
export class AppModule { }
