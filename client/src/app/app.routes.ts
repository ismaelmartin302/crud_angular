import { RouterOutlet, Routes } from '@angular/router';
import { ClimaComponent } from './pages/clima/clima.component';
import { HomeComponent } from './pages/home/home.component';


export const routes: Routes = [


    { path: '', component: HomeComponent },
    { path: 'clima', component: ClimaComponent },


    { path: '**', redirectTo: '', pathMatch: 'full' },


];
