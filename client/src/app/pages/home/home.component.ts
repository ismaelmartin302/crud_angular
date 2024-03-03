import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  visitCount: number = 0;
  appName: string = 'MiApp';


  constructor() { }


  ngOnInit(): void {
    // No incrementamos el contador al inicializar el componente
  }


  incrementVisitCount() {
    // Incrementamos el contador de visitas al hacer clic en el botón
    this.visitCount += 1;
 }
}
