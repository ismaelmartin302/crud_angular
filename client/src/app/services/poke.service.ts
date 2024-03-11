import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeService {
  private http = inject(HttpClient)
  private url = 'https://pokeapi.co/api/v2/pokemon/'

  buscarPokemon(id: number): Observable<any> {
    return this.http.get(`${this.url}${id}`)
  }

  procesarPokemon(data: any): any {
    return {
      nombrePoke: data.name,
      idPoke: data.id,
      imagenPoke: data.sprites.other?.['official-artwork'].front_default,
      tiposPoke: data.types
    };
  }
}
