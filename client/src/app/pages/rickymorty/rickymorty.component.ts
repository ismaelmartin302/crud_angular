import { Component, inject } from '@angular/core';
import { RickymortyService } from '../../services/rickymorty.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-rickymorty',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './rickymorty.component.html',
  styleUrl: './rickymorty.component.scss'
})
export class RickymortyComponent {
  private rickService = inject(RickymortyService);
  personaje: any;
  id: number = 0;


  generarPersonaje() {
    this.id = Math.round(Math.random()*671);
    
    this.rickService.sacarPersonajes(this.id).subscribe(
      (data) => {
        this.personaje = this.rickService.procesarPersonaje(data);
      });
  }
}








