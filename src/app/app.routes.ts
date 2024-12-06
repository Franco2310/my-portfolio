import { Routes } from '@angular/router';
import { HomePageComponent } from './features/home/home-page/home-page.component';
import { NosotrosPageComponent } from './features/nosotros/nosotros-page/nosotros-page.component';
import { CarritoPageComponent } from './features/carrito/carrito-page/carrito-page.component';


export const routes: Routes = [

    { path: 'home', component: HomePageComponent },


    { path: 'nosotros', loadComponent: () => import('./features/nosotros/nosotros-page/nosotros-page.component')
        .then(m => m.NosotrosPageComponent)
    },


    { path: 'carrito',  loadComponent: () => import('./features/carrito/carrito-page/carrito-page.component')
        .then(m => m.CarritoPageComponent)
    },

    { path: '**', redirectTo: 'home' } 

];
