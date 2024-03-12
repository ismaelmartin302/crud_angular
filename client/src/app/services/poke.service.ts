// Importamos los módulos necesarios desde Angular y RxJS
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // Indica que este servicio estará disponible en toda la aplicación
})
export class PokeService {
  private http = inject(HttpClient); // Inyectamos el cliente HTTP para hacer peticiones
  private url = 'https://pokeapi.co/api/v2/pokemon/'; // URL base de la API de Pokémon

  // Método para buscar un Pokémon por su ID
  buscarPokemon(id: number): Observable<any> {
    return this.http.get(`${this.url}${id}`); // Realizamos una petición GET a la API con el ID del Pokémon
  }

  // Método para procesar la respuesta de la API y extraer la información relevante del Pokémon
  procesarPokemon(data: any): any {
    return {
      nombrePoke: data.name, // Nombre del Pokémon
      idPoke: data.id, // ID del Pokémon
      imagenPoke: data.sprites.other?.['official-artwork'].front_default, // URL de la imagen oficial del Pokémon
      tiposPoke: data.types // Tipos del Pokémon
    };
  }
}
