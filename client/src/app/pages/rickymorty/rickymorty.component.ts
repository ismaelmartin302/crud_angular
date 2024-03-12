// Importación de los módulos y servicios necesarios desde Angular
import { Component, inject } from '@angular/core';
import { RickymortyService } from '../../services/rickymorty.service';
import { FormsModule } from '@angular/forms';

// Decorador que define las propiedades del componente
@Component({
  // Selector que representa este componente en el HTML
  selector: 'app-rickymorty',
  // Definición de que el componente es independiente y no necesita otros módulos
  standalone: true,
  // Importación del módulo FormsModule necesario para el formulario en este componente
  imports: [FormsModule],
  // Ruta al archivo HTML que define la estructura del componente
  templateUrl: './rickymorty.component.html',
  // Ruta al archivo SCSS que define los estilos del componente
  styleUrl: './rickymorty.component.scss'
})
// Definición de la clase del componente
export class RickymortyComponent {
  // Inyección del servicio RickymortyService mediante inyección de dependencias
  private rickService = inject(RickymortyService);
  // Variable para almacenar los datos del personaje
  personaje: any;
  // Variable para almacenar el ID del personaje que se va a generar
  id: number = 0;

  // Método para generar un personaje aleatorio
  generarPersonaje() {
    // Genera un ID aleatorio dentro del rango de IDs disponibles (0-671)
    this.id = Math.round(Math.random()*671);
    
    // Llama al método 'sacarPersonajes' del servicio para obtener los datos del personaje
    this.rickService.sacarPersonajes(this.id).subscribe(
      // Callback que procesa los datos obtenidos
      (data) => {
        // Procesa los datos del personaje usando el método 'procesarPersonaje' del servicio
        this.personaje = this.rickService.procesarPersonaje(data);
      });
  }
}
