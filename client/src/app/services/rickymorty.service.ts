// Importaciones necesarias para el servicio
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // Este servicio estará disponible en toda la aplicación
})
export class RickymortyService {
  private http = inject(HttpClient); // Instancia del HttpClient para realizar solicitudes HTTP
  private url = 'https://rickandmortyapi.com/api/character/'; // URL base de la API de Rick y Morty

  // Método para obtener información de un personaje por su ID
  sacarPersonajes(id: number): Observable<any> {
    return this.http.get(`${this.url}${id}`); // Realiza una solicitud GET al API con el ID proporcionado
  }

  // Método para procesar la información de un personaje y devolverla en un formato específico
  procesarPersonaje(data: any): any {
    return {
      nombrePersonaje: data.name, // Nombre del personaje
      idPersonaje: data.id, // ID del personaje
      status: data.status, // Estado del personaje (vivo, muerto, desconocido)
      species: data.species, // Especie del personaje
      imagenPersonaje: data.image, // URL de la imagen del personaje
    };
  }
}
