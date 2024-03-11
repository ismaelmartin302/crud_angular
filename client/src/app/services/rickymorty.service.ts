import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RickymortyService {
  private http = inject(HttpClient)
  private url = 'https://rickandmortyapi.com/api/character/'

  sacarPersonajes(id: number): Observable<any> {
    return this.http.get(`${this.url}${id}`)
  }

  procesarPersonaje(data: any): any {
    return {
      nombrePersonaje: data.name,
      idPersonaje: data.id,
      status: data.status,
      species: data.species,
      imagenPersonaje: data.image,
    };
  }
}



