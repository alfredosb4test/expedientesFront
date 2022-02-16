import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator'; 
import { MatDialogModule } from '@angular/material/dialog'; 
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatNativeDateModule } from '@angular/material/core';



@NgModule({
  declarations: [
    
  ],
  imports: [
    MatButtonModule,
    MatMenuModule,    
    MatIconModule, 
    MatFormFieldModule,
    MatDividerModule,
    MatInputModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatProgressBarModule,
    MatSelectModule,
    MatRadioModule,
    MatChipsModule,
    MatDatepickerModule,
    MatNativeDateModule, 
    MatSlideToggleModule,

  ],
  exports: [
    MatButtonModule,
    MatMenuModule,    
    MatIconModule,  
    MatFormFieldModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatProgressBarModule,
    MatSelectModule,
    MatRadioModule,
    MatTabsModule,
    MatChipsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,

  ]
})
export class MaterialModule { }
