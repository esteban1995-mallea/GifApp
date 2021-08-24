import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SourceGIFResponse,Gifs } from '../inteface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial:string[]=[]
  private servicioUrl: string='https://api.giphy.com/v1/gifs'
  private Apikey:string='qS6lXQM55p0JdV9JszclWkcKI75IFkI3';
  public resultados:Gifs[]=[]


  
  get historial(){
    return [...this._historial]
  }

  constructor(private http: HttpClient){
    localStorage.getItem('historial');

    this._historial=JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados=JSON.parse(localStorage.getItem('resultados')!) || [];

    // if(localStorage.getItem('historial')){
    //   this._historial=JSON.parse(localStorage.getItem('historial')!);
    // }

  }

  buscarGifs(Query:string) {

    Query=Query.trim().toLocaleLowerCase();
 
    if(!this._historial.includes(Query)){
      this._historial.unshift(Query);
      this._historial=this._historial.splice(0,10);
      localStorage.setItem('historial',JSON.stringify(this._historial));
      
    }

    const params = new HttpParams()
      .set('api_key',this.Apikey,)
      .set('limit','10')
      .set('q',Query);


    console.log(`/search?api_key=qS6lXQM55p0JdV9JszclWkcKI75IFkI3&q=${{Query}}&limit=10`);

    this.http.get<SourceGIFResponse>(`${this.servicioUrl}/search`,{params})
        .subscribe((resp)=>{
          this.resultados=resp.data;
          localStorage.setItem('resultados',JSON.stringify(this.resultados));
        })


  }

}
