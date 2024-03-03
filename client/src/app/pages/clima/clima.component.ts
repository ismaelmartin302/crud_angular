import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-clima',
  standalone: true,
  imports: [CommonModule, FormsModule,], // Agregar CommonModule aquí
  templateUrl: './clima.component.html',
  styleUrl: './clima.component.scss'


})


export class ClimaComponent {
  urlBase = 'https://api.openweathermap.org/data/2.5/weather';
  api_key = '605507acf87117e111e54a3ab5238541';
  difKelvin = 273.15;
  datosClima: any = {};
  ciudad: string = ''; // Definición de la propiedad ciudad


  constructor() { }


  buscarClima(ciudad: string) {
    if (ciudad) {
      this.fetchDatosClima(ciudad);
    }
  }


  fetchDatosClima(ciudad: string) {
    fetch(`${this.urlBase}?q=${ciudad}&appid=${this.api_key}`)
      .then(data => data.json())
      .then(data => this.mostrarDatosClima(data));
  }


  mostrarDatosClima(data: any) {
    this.datosClima = {
      ciudadNombre: data.name,
      paisNombre: data.sys.country,
      temperatura: Math.floor(data.main.temp - this.difKelvin),
      humedad: data.main.humidity,
      descripcion: data.weather[0].description,
      icono: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    };
  }
}
