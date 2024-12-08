import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-carrito-page',
  templateUrl: './carrito-page.component.html',
  styleUrls: ['./carrito-page.component.css'],
})
export class CarritoPageComponent implements OnInit {
  cart: { name: string; price: number; image: string }[] = [];
  cartCount: number = 0;

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit(): void {
    this.loadCartFromLocalStorage();
    this.updateCartCount();
    this.updateCartMenu();
  }

  toggleCart(): void {
    const cartMenu = this.el.nativeElement.querySelector('#cart-menu');
    if (cartMenu) {
      const isHidden = cartMenu.style.display === 'none' || cartMenu.style.display === '';
      this.renderer.setStyle(cartMenu, 'display', isHidden ? 'flex' : 'none');
    }
  }

  filterProducts(category: string): void {
    const products = this.el.nativeElement.querySelectorAll('.product');
    products.forEach((product: HTMLElement) => {
      const productCategory = product.dataset['category'] || '';
      this.renderer.setStyle(product, 'display', category === 'todos' || productCategory === category ? 'block' : 'none');
    });
  }

  addToCart(productName: string, productPrice: number, productImage: string): void {
    this.cart.push({ name: productName, price: productPrice, image: productImage });
    this.cartCount++;
    this.updateCartCount();
    this.updateCartMenu();
    this.saveCartToLocalStorage();
  }

  removeFromCart(index: number): void {
    this.cart.splice(index, 1);
    this.cartCount--;
    this.updateCartCount();
    this.updateCartMenu();
    this.saveCartToLocalStorage();
  }

  checkout(): void {
    this.cart = [];
    this.cartCount = 0;
    this.updateCartCount();
    this.updateCartMenu();
    localStorage.removeItem('cart');
    this.toggleCart();
  }

  private updateCartCount(): void {
    const cartCountElement = this.el.nativeElement.querySelector('#cart-count');
    if (cartCountElement) {
      cartCountElement.textContent = this.cartCount.toString();
    }
  }

  private updateCartMenu(): void {
    const cartItemsElement = this.el.nativeElement.querySelector('#cart-items');
    const cartTotalElement = this.el.nativeElement.querySelector('#cart-total');
    if (cartItemsElement && cartTotalElement) {
      cartItemsElement.innerHTML = '';
      let total = 0;

      this.cart.forEach((item, index) => {
        const li = this.renderer.createElement('li');
        this.renderer.setStyle(li, 'display', 'flex');
        this.renderer.setStyle(li, 'justify-content', 'space-between');
        this.renderer.setStyle(li, 'align-items', 'center');
        this.renderer.setStyle(li, 'padding', '10px');
        this.renderer.setStyle(li, 'border-bottom', '1px solid #ccc');

        const detailsDiv = this.renderer.createElement('div');
        this.renderer.setStyle(detailsDiv, 'flex', '1');
        this.renderer.setStyle(detailsDiv, 'display', 'flex');
        this.renderer.setStyle(detailsDiv, 'flex-direction', 'column');
        this.renderer.setStyle(detailsDiv, 'align-items', 'center'); // Centrar descripción y precio horizontalmente
        this.renderer.setStyle(detailsDiv, 'justify-content', 'center'); // Centrar descripción y precio verticalmente

        const description = this.renderer.createElement('p');
        description.textContent = item.name;
        this.renderer.setStyle(description, 'text-align', 'center');

        const price = this.renderer.createElement('p');
        price.textContent = `$${item.price}`;
        this.renderer.setStyle(price, 'text-align', 'center');

        this.renderer.appendChild(detailsDiv, description);
        this.renderer.appendChild(detailsDiv, price);

        const removeBtnDiv = this.renderer.createElement('div');
        this.renderer.setStyle(removeBtnDiv, 'flex', '1');
        this.renderer.setStyle(removeBtnDiv, 'display', 'flex');
        this.renderer.setStyle(removeBtnDiv, 'justify-content', 'center');
        this.renderer.setStyle(removeBtnDiv, 'align-items', 'center');

        const removeBtn = this.renderer.createElement('button');
        removeBtn.textContent = 'Eliminar';
        this.renderer.setStyle(removeBtn, 'background-color', '#ff5733');
        this.renderer.setStyle(removeBtn, 'color', 'white');
        this.renderer.setStyle(removeBtn, 'border', 'none');
        this.renderer.setStyle(removeBtn, 'padding', '8px 16px');
        this.renderer.setStyle(removeBtn, 'font-size', '14px');
        this.renderer.setStyle(removeBtn, 'border-radius', '5px');
        this.renderer.setStyle(removeBtn, 'cursor', 'pointer');
        this.renderer.setStyle(removeBtn, 'transition', 'background-color 0.3s');

        removeBtn.addEventListener('click', () => this.removeFromCart(index));
        this.renderer.appendChild(removeBtnDiv, removeBtn);

        this.renderer.appendChild(li, detailsDiv);
        this.renderer.appendChild(li, removeBtnDiv);
        this.renderer.appendChild(cartItemsElement, li);

        total += item.price;
      });

      cartTotalElement.textContent = `Total: $${total}`;
    }
  }

  private loadCartFromLocalStorage(): void {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cart = JSON.parse(storedCart);
      this.cartCount = this.cart.length;
    }
  }

  private saveCartToLocalStorage(): void {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }
}
