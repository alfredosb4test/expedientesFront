import { ThisReceiver } from '@angular/compiler';
import { Component } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent   {
  public titulo: string = '';
  constructor(private router:Router) { 
    this.getRuta();
  }
  
  getRuta(){
    this.router.events
    .pipe(
      filter( (event):event is ActivationEnd => event instanceof ActivationEnd ),
      filter( (event:ActivationEnd) => event.snapshot.firstChild === null ), 
      map( (event:ActivationEnd) => event.snapshot.data ), 
    )
    .subscribe( ({titulo}) => { 
      this.titulo = titulo;
      document.title = `Senado - ${titulo}`;
    })

  }

}
