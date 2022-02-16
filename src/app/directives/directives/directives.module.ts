import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbdSortableHeader } from '../table-sortable.directive';



@NgModule({
  declarations: [NgbdSortableHeader],
  imports: [
    CommonModule
  ],
  exports:[NgbdSortableHeader]
})
export class DirectivesModule { }
