import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  toggleMenu(): void {
    const sidebar = document.getElementById('sidebar');
    
    if (sidebar instanceof HTMLElement) {
      sidebar.classList.toggle('open-sidebar');
    } else {
      console.error("El elemento con ID 'sidebar' no se encontró o no es un elemento HTML.");
    }
  }
}
