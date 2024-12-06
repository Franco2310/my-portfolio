import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer/footer.component';
import { HomePageComponent } from './features/home/home-page/home-page.component';
import { CarritoPageComponent } from './features/carrito/carrito-page/carrito-page.component';
import { NosotrosPageComponent } from './features/nosotros/nosotros-page/nosotros-page.component';



@Component({
  selector: 'app-root',
  standalone: true, // Indica que es un componente autónomo
  imports: [ RouterOutlet, NavbarComponent, FooterComponent, HomePageComponent, CarritoPageComponent, NosotrosPageComponent],// Importa aquí otros componentes necesarios
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {}

