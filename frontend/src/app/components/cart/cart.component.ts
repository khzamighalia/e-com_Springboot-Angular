import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { RouterLink } from '@angular/router';
import { Cart } from '../../shared/cart';
import { CartService } from '../../Services/cart.service';
import { CommonModule } from '@angular/common';
import { Product } from '../../shared/product';
import { ProductService } from '../../Services/product.service';

@Component({
    selector: 'app-cart',
    standalone: true,
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.css',
    imports: [RouterLink,CommonModule]
})
export class CartComponent {

    cartitems: Cart[] = []; 
    product: Product = {
        id: 0,
        title: '',
        description: '',
        price: 0,
        category: '',
        stock: 0,
        imageUrl: ''
      };

  constructor(private cartService: CartService,private productService: ProductService) { }



ngOnInit(): void {
    this.loadCart();
}

loadCart(): void {

    const userIdString = localStorage.getItem('userId');
    const userId = userIdString ? parseInt(userIdString) : 0;
    if(userId !==0){
        this.cartService.getCartByUserId(userId).subscribe(
            (cartItems: Cart[]) => {
                this.cartitems = cartItems;
                // Fetch product details for each cart item
                this.cartitems.forEach(cartItem => {
                    this.getProductByCartItem(cartItem.productId);
                });
            },
            (error: any) => {
                console.error('Error loading cart:', error);
            }
        );
    }
    
}

getProductByCartItem(productId: number): void {
    this.productService.getProduct(productId).subscribe(
        (data: Product) => {
            // Assign fetched product details to the corresponding cart item
            const cartItem = this.cartitems.find(item => item.productId === productId);
            if (cartItem) {
                cartItem.product = data;
            }
        },
        error => {
            console.error('Error fetching product:', error);
        }
    );
}

  removeFromCart(cartItemId: number): void {
    this.cartService.removeFromCart(cartItemId).subscribe(
      () => {
        // Reload cart after successful removal
        this.loadCart();
      },
      (error: any) => {
        console.error('Error removing item from cart:', error);
      }
    );
  }


}
