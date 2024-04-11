import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { authComponent } from '../auth/auth.component';
import { TokenService } from '../../Services/token-service.service';
import { ProductService } from '../../Services/product.service';
import { Product } from '../../shared/product';
import { CommonModule } from '@angular/common';
import { Cart } from '../../shared/cart';
import { CartService } from '../../Services/cart.service';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [CommonModule]
})



export class HomeComponent {

  products: Product[] = [];
  cart: Cart[] = [];
  token: string | null = '';

  constructor(private tokenService: TokenService,private productService: ProductService,private cartService: CartService) { }

  ngOnInit(): void {
    this.token = this.tokenService.getToken();
    this.loadProducts();
  }
//   loadProducts(): void {
//     this.productService.getAllProducts().subscribe((products: Product[]) => { // Specify type Product[]
//       this.products = products;
//     });
// }

loadProducts(): void {
  this.productService.getAllProducts().subscribe((products: Product[]) => {
      // Filter products with stock != 0
      this.products = products.filter(product => product.stock !== 0);
  });
}

  
// addToCart(product: Product): void {
  
//   this.cartService.addToCart(product.userId, product.productId, 1, product.price).subscribe(
//     (addedCartItem: Cart) => { // Define type for addedCartItem
//       console.log('Item added to cart:', addedCartItem);
//       // Handle success, update UI, etc.
//     },
//     (error: any) => { // Define type for error
//       console.error('Error adding item to cart:', error);
//       // Handle error, show error message, etc.
//     }
//   );
// }
addToCart(event: Event, product: Product): void {
  event.preventDefault(); // Prevent the default form submission behavior

  const userIdString = localStorage.getItem('userId');
  const userId = userIdString ? parseInt(userIdString, 10) : 0;
  if(userId != 0){
  this.cartService.addToCart(userId, product.id, 1, product.price).subscribe(
      (addedCartItem: Cart) => {
          console.log('Item added to cart:', addedCartItem);
          this.showAddtoCartAlert(); // Invoke the function
        
      },
      (error: any) => {
          console.error('Error adding item to cart:', error);
          this.showAddtoCartError();
      }
  );
  }else{
    this.showAddtoCartLogin()
  }
}

showAddtoCartAlert(): void {
  // Show the alert box
  const alertBox = document.getElementById('alertAddtoCartBox');
  if (alertBox) {
    alertBox.style.display = 'block';
    
    // Hide the alert after 6 seconds (6000 milliseconds)
    setTimeout(() => {
      alertBox.style.display = 'none';
    }, 6000);
  }
}
showAddtoCartError(): void {
  // Show the alert box
  const alertBox = document.getElementById('errorAddtoCartBox');
  if (alertBox) {
    alertBox.style.display = 'block';
    
    // Hide the alert after 6 seconds (6000 milliseconds)
    setTimeout(() => {
      alertBox.style.display = 'none';
    }, 6000);
  }
}
showAddtoCartLogin(): void {
  // Show the alert box
  const alertBox = document.getElementById('loginAddtoCartBox');
  if (alertBox) {
    alertBox.style.display = 'block';
    
    // Hide the alert after 6 seconds (6000 milliseconds)
    setTimeout(() => {
      alertBox.style.display = 'none';
    }, 6000);
  }
}



}
