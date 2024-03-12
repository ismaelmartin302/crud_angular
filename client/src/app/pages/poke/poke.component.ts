// Importaciones necesarias para el componente
import { Component, inject } from '@angular/core'; // Importa los módulos Component e inject de Angular
import { PokeService } from '../../services/poke.service'; // Importa el servicio PokeService desde la ruta relativa '../../services/poke.service'
import { FormsModule } from '@angular/forms'; // Importa el módulo FormsModule de Angular para trabajar con formularios

@Component({
  selector: 'app-poke', // Selector del componente en el HTML
  standalone: true, // Propiedad adicional, no estándar, posiblemente específica para el proyecto
  imports: [FormsModule], // Importa el módulo FormsModule
  templateUrl: './poke.component.html', // Ruta del archivo HTML del componente
  styleUrl: './poke.component.scss' // Ruta del archivo SCSS (hoja de estilos) del componente
})
export class PokeComponent { // Definición de la clase PokeComponent

  pokeID: number = 0; // Variable para almacenar el ID del Pokémon, inicializada en 0
  private _pokeService = inject(PokeService); // Instancia privada del servicio PokeService
  datosPokemon:any; // Variable para almacenar los datos del Pokémon

  // Método para buscar un Pokémon
  buscarPokemon() {
    if (this.pokeID > 0) { // Comprueba si el ID del Pokémon es mayor que 0
      this._pokeService.buscarPokemon(this.pokeID).subscribe( // Llama al método buscarPokemon del servicio y se suscribe a los resultados
        (data) => {
          this.datosPokemon = this._pokeService.procesarPokemon(data); // Almacena los datos del Pokémon obtenidos del servicio después de procesarlos
        });
    }
  }
}
