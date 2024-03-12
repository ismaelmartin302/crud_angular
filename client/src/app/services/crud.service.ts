import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  private apiUrl = 'http://localhost:3000/crud'; // URL de tu backend Node.js

  constructor(private http: HttpClient) { }

  // Obtener todos los elementos
  getAllTweet(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Crear un nuevo elemento
  createTweet(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  // Actualizar un elemento existente
  updateTweet(id: string, data: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<any>(url, data);
  }

  // Eliminar un elemento
  deleteTweet(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url);
  }
}
