import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchResponseGifs, Gifs } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private _historial: string[] = [];
  private apiKey: string = 'TiJLStQSMpft7WA91bSqKeYXrOKqWzfw';
  public resultados: Gifs[] = [];
  public servicioUrl = 'https://api.giphy.com/v1/gifs';

  get historial(){
    return [...this._historial]; //Rompemos la referencia
  }
  

  buscarGifs(query: string = ''){
    query = query.trim().toLocaleLowerCase(); //Limpiamos el query
    if(!this._historial.includes(query)){ //Validacion: Busca coincidencias del query
      this._historial.unshift(query); //Insertamos al inicio.
      this._historial = this._historial.splice(0,10); //Recortamos los primeros 10 primero elementos del arreglo
      localStorage.setItem("historial", JSON.stringify(this._historial)); //Guardamos historial en localstorage
    }
    const params = new HttpParams().set('api_key',this.apiKey)
        .set('q',query)
        .set('limit','10');

    this.http
        .get<SearchResponseGifs>(`${this.servicioUrl}/search`,{params} )
        .subscribe((resp) => {  
          this.resultados  = resp.data; //Guardamos en un arreglo el resultado
          localStorage.setItem('resultados', JSON.stringify(this.resultados)); //Guardamos en local storage el ultimo resultado

        });
  }

  constructor(private http:HttpClient){
    this._historial = JSON.parse(localStorage.getItem("historial")!) || []; //recuperamos el historial de busqueda
    this.resultados = JSON.parse(localStorage.getItem("resultados")!) || [];//recuperamos los resultados de busqueda
  }
}
