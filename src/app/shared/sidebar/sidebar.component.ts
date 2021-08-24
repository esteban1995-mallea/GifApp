import { Component, OnInit } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {

    historial_busqueda:string[]=[]

  get historial(){
    return this.gifsServices.historial;
  }

  buscardeHistorial(valor:string){
    console.log("busqueda desde el historial"+valor)
    this.gifsServices.buscarGifs(valor);

  }


  constructor(private gifsServices:GifsService) { }

  ngOnInit(): void {
  }

}
