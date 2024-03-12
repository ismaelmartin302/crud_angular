// Importación de componentes y servicios necesarios desde Angular Core
import { Component, inject } from '@angular/core';

// Importación del servicio ClimaService
import { ClimaService } from '../../services/clima.service';

// Importación de FormsModule y CommonModule para el manejo de formularios y funcionalidades comunes
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Decorador Componente que define metadatos para el componente ClimaComponent
@Component({
  // Selector CSS que identifica al componente en el HTML
  selector: 'app-clima',
  // Ruta del archivo HTML que define el diseño del componente
  templateUrl: './clima.component.html',
  // Rutas de los archivos de estilos para el componente
  styleUrls: ['./clima.component.scss'],
  // Propiedad que indica que el componente es independiente y no requiere otros componentes
  standalone: true,
  // Importación de módulos necesarios para el componente
  imports: [FormsModule, CommonModule],
})
// Clase que define la lógica del componente ClimaComponent
export class ClimaComponent  {

  // Variable que almacena el nombre de la ciudad ingresada por el usuario
  ciudad: string = '';

  // Inyección del servicio ClimaService
  private _climaService = inject(ClimaService);

  // Variable para almacenar los datos del clima obtenidos del servicio
  datosClima:any;

  // Método que se ejecuta al hacer clic en el botón de búsqueda de la ciudad
  buscarCiudad() {
    // Llamada al método buscarClima del servicio ClimaService y suscripción al resultado
    this._climaService.buscarClima(this.ciudad).subscribe(
      // Función de retorno que procesa los datos del clima recibidos del servicio
      (data) => {
        this.datosClima = this._climaService.procesarDatosClima(data);
      });
  }
}
