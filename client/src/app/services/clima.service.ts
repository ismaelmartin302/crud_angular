import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // Indica que este servicio estará disponible globalmente en la aplicación
})
export class ClimaService {
  private _http = inject(HttpClient); // Se inyecta el HttpClient para hacer solicitudes HTTP
  private urlBase = 'https://api.openweathermap.org/data/2.5/weather'; // URL base de la API del clima
  private apiKey = '605507acf87117e111e54a3ab5238541'; // Clave de API para acceder a OpenWeatherMap
  private difKelvin = 273.15; // Diferencia para convertir de Kelvin a Celsius

  // Método para buscar el clima de una ciudad específica
  buscarClima(ciudad: string): Observable<any> {
    return this._http.get(`${this.urlBase}?q=${ciudad}&appid=${this.apiKey}`);
  }

  // Método para procesar los datos del clima obtenidos de la API
  procesarDatosClima(data: any): any {
    return {
      ciudadNombre: data.name, // Nombre de la ciudad
      paisNombre: data.sys.country, // Nombre del país
      temperatura: Math.floor(data.main.temp - this.difKelvin), // Temperatura en Celsius
      humedad: data.main.humidity, // Humedad
      descripcion: data.weather[0].description, // Descripción del clima
      icono: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png` // URL del icono del clima
    };
  }
}
