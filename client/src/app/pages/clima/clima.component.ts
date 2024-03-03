import { Component, inject } from '@angular/core';
import { ClimaService } from '../../services/clima.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-clima',
  templateUrl: './clima.component.html',
  styleUrls: ['./clima.component.scss'],
  standalone: true,
  imports: [FormsModule,CommonModule],
})
export class ClimaComponent  {


  ciudad: string = '';
  private _climaService = inject(ClimaService);
  datosClima:any;


  buscarCiudad() {
    this._climaService.buscarClima(this.ciudad).subscribe(
      (data) => {
        this.datosClima = this._climaService.procesarDatosClima(data);
      });
  }
 
  
}


/* import { Component, inject } from '@angular/core';
import { ClimaService } from '../../services/clima.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-clima',
  templateUrl: './clima.component.html',
  styleUrls: ['./clima.component.css'],
  imports: [FormsModule,CommonModule],
  standalone: true,
})
export class ClimaComponent {


  ciudad: string = '';
  datosClima: any;


  constructor(private climaService: ClimaService) { }


  buscarCiudad() {
    this.climaService.buscarClima(this.ciudad)
      .subscribe((data: any) => {
        this.datosClima = this.climaService.procesarDatosClima(data);
      });
  }
}
 */
