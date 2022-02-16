import { Component } from '@angular/core';

@Component({
  selector: 'app-nopagefound',
  templateUrl: './nopagefound.component.html',
  styleUrls: [
    './nopagefound.component.css'
  ]
})
export class NopagefoundComponent {
  constructor() { }
  year = new Date().getFullYear();
  ngOnInit(): void {
    var filtros = document.getElementById('frm_filtros');
    filtros.classList.add('d-none');
  }

}
