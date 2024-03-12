import { Component, OnInit, inject } from '@angular/core';
import { TweetComponent } from './tweet/tweet.component';
import { FormsModule } from '@angular/forms';
import { CrudService } from '../../services/crud.service';

@Component({
  selector: 'app-crud',
  standalone: true,
  imports: [TweetComponent, FormsModule],
  templateUrl: './crud.component.html',
  styleUrl: './crud.component.scss'
})
export class CrudComponent implements OnInit {
  tweets: any[] = [];
  constructor(private crudService: CrudService) {}
  nuevoTweet = {
    usuario: "",
    contenido: "",
  }
  error: boolean = false;
  editar?: number;
  editarTweet(index: number) {
    console.log(index)
    this.editar = index;
  }
  ngOnInit() {
      this.mostrarTweets()
  }
  mostrarTweets() {
    this.crudService.getAllTweet().subscribe(
      (data: any) => {
        this.tweets = data.items;
      },
      (error: any) => {
        console.error('Error al obtener tweets', error);
      }
    );
  }

  createTweet() {
    if (this.nuevoTweet.usuario != "" && this.nuevoTweet.contenido != "") {
      this.error = false;
      this.crudService.createTweet(this.nuevoTweet).subscribe(
        () => {
          console.log('Tweet creado exitosamente');
          this.nuevoTweet = { usuario: '', contenido: '' };
          this.mostrarTweets(); // Vuelve a cargar los tweets después de crear uno nuevo
        },
        (error: any) => {
          console.error('Error al crear tweet', error);
        }
      );
    }
    else (
      this.error = true
    );
  }

  deleteTweet(id: string) {
    this.crudService.deleteTweet(id).subscribe(
      () => {
        console.log('Tweet eliminado exitosamente');
        this.mostrarTweets(); // Vuelve a cargar los tweets después de eliminar uno
      },
      (error: any) => {
        console.error('Error al eliminar tweet', error);
      }
    );
  }

  updateTweet(id: string, newData: any) {
    this.crudService.updateTweet(id, newData).subscribe(
      () => {
        console.log('Tweet actualizado exitosamente');
        this.mostrarTweets(); // Vuelve a cargar los tweets después de actualizar uno
        this.editar = -1
      },
      (error: any) => {
        console.error('Error al actualizar tweet', error);
        this.mostrarTweets(); // Vuelve a cargar los tweets después de actualizar uno
        this.editar = -1
      }
    );
}



  
}

