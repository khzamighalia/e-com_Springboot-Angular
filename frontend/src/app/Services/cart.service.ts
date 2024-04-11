import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Cart } from '../shared/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private baseUrl = 'http://localhost:8080/cart'; // Adjust URL as per your backend API

  constructor(private http: HttpClient) { }

  getCartByUserId(userId: number): Observable<Cart[]> {
    return this.http.get<Cart[]>(`${this.baseUrl}/${userId}`);
  }

  isCartByUserIdExists(userId: number): Observable<boolean> {
    return this.http.get<Cart[]>(`${this.baseUrl}/${userId}`).pipe(
      map(carts => !!carts && carts.length > 0)
    );
  }

  addToCart(userId: number, productId: number, quantity: number, total: number): Observable<Cart> {
    const cartRequest = { userId, productId, quantity, total };
    return this.http.post<Cart>(`${this.baseUrl}/add`, cartRequest);
  }

  updateCartQuantity(CartId: number, newQuantity: number): Observable<Cart> {
    return this.http.put<Cart>(`${this.baseUrl}/update/${CartId}?newQuantity=${newQuantity}`, {});
  }

  removeFromCart(CartId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/remove/${CartId}`);
  }

}
