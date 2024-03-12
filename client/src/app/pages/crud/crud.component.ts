// Importaciones necesarias para el componente CRUD
import { Component, OnInit } from '@angular/core';
import { TweetComponent } from './tweet/tweet.component'; // Importa el componente Tweet
import { FormsModule } from '@angular/forms'; // Importa FormsModule para manejar formularios en Angular
import { CrudService } from '../../services/crud.service'; // Importa el servicio CrudService

@Component({
  // Define el selector del componente
  selector: 'app-crud',
  // Define el modo independiente del componente
  standalone: true,
  // Importa los componentes y módulos necesarios para este componente
  imports: [TweetComponent, FormsModule],
  // Define la ubicación del archivo HTML que contiene el template del componente
  templateUrl: './crud.component.html',
  // Define la ubicación del archivo SCSS que contiene los estilos del componente
  styleUrl: './crud.component.scss'
})
export class CrudComponent implements OnInit {
  // Array para almacenar los tweets
  tweets: any[] = [];
  
  // Constructor del componente, inyecta el servicio CrudService
  constructor(private crudService: CrudService) {}

  // Objeto para almacenar el nuevo tweet
  nuevoTweet = {
    usuario: "",
    contenido: "",
  }
  
  // Bandera para indicar si hay un error
  error: boolean = false;
  
  // Variable para almacenar el índice del tweet a editar
  editar?: number;

  // Método para establecer el índice del tweet a editar
  editarTweet(index: number) {
    console.log(index)
    this.editar = index;
  }
  
  // Método que se ejecuta al iniciar el componente
  ngOnInit() {
    // Carga los tweets al iniciar el componente
    this.mostrarTweets()
  }
  
  // Método para obtener y mostrar los tweets
  mostrarTweets() {
    this.crudService.getAllTweet().subscribe(
      // Éxito al obtener los tweets
      (data: any) => {
        this.tweets = data.items;
      },
      // Error al obtener los tweets
      (error: any) => {
        console.error('Error al obtener tweets', error);
      }
    );
  }

  // Método para crear un nuevo tweet
  createTweet() {
    if (this.nuevoTweet.usuario != "" && this.nuevoTweet.contenido != "") {
      // No hay error, procede a crear el tweet
      this.error = false;
      this.crudService.createTweet(this.nuevoTweet).subscribe(
        // Éxito al crear el tweet
        () => {
          console.log('Tweet creado exitosamente');
          this.nuevoTweet = { usuario: '', contenido: '' };
          this.mostrarTweets(); // Vuelve a cargar los tweets después de crear uno nuevo
        },
        // Error al crear el tweet
        (error: any) => {
          console.error('Error al crear tweet', error);
        }
      );
    }
    else {
      // Hay un error
      this.error = true;
    }
  }

  // Método para eliminar un tweet
  deleteTweet(id: string) {
    this.crudService.deleteTweet(id).subscribe(
      // Éxito al eliminar el tweet
      () => {
        console.log('Tweet eliminado exitosamente');
        this.mostrarTweets(); // Vuelve a cargar los tweets después de eliminar uno
      },
      // Error al eliminar el tweet
      (error: any) => {
        console.error('Error al eliminar tweet', error);
      }
    );
  }

  // Método para actualizar un tweet
  updateTweet(id: string, newData: any) {
    this.crudService.updateTweet(id, newData).subscribe(
      // Éxito al actualizar el tweet
      () => {
        console.log('Tweet actualizado exitosamente');
        this.mostrarTweets(); // Vuelve a cargar los tweets después de actualizar uno
        this.editar = -1;
      },
      // Error al actualizar el tweet
      (error: any) => {
        console.error('Error al actualizar tweet', error);
        this.mostrarTweets(); // Vuelve a cargar los tweets después de actualizar uno
        this.editar = -1;
      }
    );
  }
}
