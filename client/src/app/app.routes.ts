import { RouterOutlet, Routes } from '@angular/router';
import { ClimaComponent } from './pages/clima/clima.component';
import { HomeComponent } from './pages/home/home.component';
import { Error404Component } from './pages/error404/error404.component';
import { PokeComponent } from './pages/poke/poke.component';
import { RickmortyComponent } from './pages/rickmorty/rickmorty.component';


export const routes: Routes = [


    { path: '', component: HomeComponent },
    { path: '404', component: Error404Component },
    { path: 'clima', component: ClimaComponent },
    { path: 'poke', component: PokeComponent },
    { path: 'rickmorty', component: RickmortyComponent },


    { path: '**', redirectTo: '404', pathMatch: 'full' },


];
