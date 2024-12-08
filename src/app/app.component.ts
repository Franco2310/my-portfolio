import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './shared/footer/footer/footer.component';
import { CarritoPageComponent } from './features/carrito/carrito-page/carrito-page.component';
import { NosotrosPageComponent } from './features/nosotros/nosotros-page/nosotros-page.component';



@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [RouterOutlet, FooterComponent, CarritoPageComponent, NosotrosPageComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {}

