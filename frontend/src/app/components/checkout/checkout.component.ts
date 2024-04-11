import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../Services/cart.service';
import { ProductService } from '../../Services/product.service';
import { Cart } from '../../shared/cart';
import { Product } from '../../shared/product';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../Services/order.service';
import { Order } from '../../shared/order';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [RouterLink,CommonModule,FormsModule],
templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {

    userId: number= 0;
    fullname: string= '';
    address: string= '';
    phone: string= '';
  cartitems: Cart[] = []; // Assuming 'Cart' model contains product details like 'imageUrl', 'title', 'price', 'qty'
  product: Product = {
      id: 0,
      title: '',
      description: '',
      price: 0,
      category: '',
      stock: 0,
      imageUrl: ''
    };

constructor(private cartService: CartService,private productService: ProductService, private orderService: OrderService,private router: Router) { }
  ngOnInit(): void {
    this.loadCart();
}

loadCart(): void {
    const userIdString = localStorage.getItem('userId');
    const userId = userIdString ? parseInt(userIdString) : 0;
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

getProductByCartItem(productId: number): void {
    this.productService.getProduct(productId).subscribe(
        (data: Product) => {
            // Assign fetched product details to the corresponding cart item
            const cartItem = this.cartitems.find(item => item.productId === productId);
            if (cartItem) {
                cartItem.product = data;
            }
            this.router.navigate(['/confirmationcheckout']);

        },
        error => {
            console.error('Error fetching product:', error);
        }
    );
}

// addToOrder(userId: number,fullname: string, address: string, phone: string): void {
//     this.orderService.addToOrderFromCart(userId,fullname, address, phone).subscribe(
//       (order: Order) => {
//         // Handle successful addition to order
//         console.log('Order added:', order);
//       },
//       error => {
//         console.error('Error adding order:', error);
//       }
//     );
//   }
  
addToOrder(): void {
    const userIdString = localStorage.getItem('userId');
    const userId = userIdString ? parseInt(userIdString) : 0;
    const fullname = this.fullname;
    const address = this.address;
    const phone = this.phone;

    this.orderService.addToOrderFromCart(userId, fullname, address, phone).subscribe(
        (order: Order) => {
            // Handle successful addition to order
            console.log('Order added:', order);
        },
        error => {
            console.log('Order added:', fullname);
            console.error('Error adding order:', error);
        }
    );
}


  

}
