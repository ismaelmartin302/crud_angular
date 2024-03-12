// Importa las clases RouterOutlet y Routes desde la librería '@angular/router'
import { RouterOutlet, Routes } from '@angular/router';

// Importa los componentes necesarios
import { ClimaComponent } from './pages/clima/clima.component';
import { HomeComponent } from './pages/home/home.component';
import { Error404Component } from './pages/error404/error404.component';
import { PokeComponent } from './pages/poke/poke.component';
import { RickymortyComponent } from './pages/rickymorty/rickymorty.component';
import { CrudComponent } from './pages/crud/crud.component';

// Define las rutas de la aplicación
export const routes: Routes = [

    // Ruta para la página de inicio
    { path: '', component: HomeComponent },

    // Ruta para la página de error 404
    { path: '404', component: Error404Component },

    // Ruta para la página de clima
    { path: 'clima', component: ClimaComponent },

    // Ruta para la página de Pokémon
    { path: 'poke', component: PokeComponent },

    // Ruta para la página de Rick y Morty
    { path: 'rickymorty', component: RickymortyComponent },

    // Ruta para la página de CRUD
    { path: 'crud', component: CrudComponent },

    // Ruta de redirección para cualquier otra URL no definida
    { path: '**', redirectTo: '404', pathMatch: 'full' },

];
