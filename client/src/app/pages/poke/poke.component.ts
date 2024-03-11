import { Component, inject } from '@angular/core';
import { PokeService } from '../../services/poke.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-poke',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './poke.component.html',
  styleUrl: './poke.component.scss'
})
export class PokeComponent {

  pokeID: number = 2;
  private _pokeService = inject(PokeService);
  datosPokemon:any;
  
  
  buscarPokemon() {
    if (this.pokeID > 0) {
      this._pokeService.buscarPokemon(this.pokeID).subscribe(
        (data) => {
          this.datosPokemon = this._pokeService.procesarPokemon(data);
        });
    }
  }
}







  

