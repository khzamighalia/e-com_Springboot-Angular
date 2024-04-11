import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../shared/order';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl = 'http://localhost:8080/order'; // Adjust URL as per your backend API

  constructor(private http: HttpClient) { }

  // getCartByUserId(userId: number): Observable<Cart[]> {
  //   return this.http.get<Cart[]>(`${this.baseUrl}/${userId}`);
  // }

  // addToOrderFromCart(userId: number,fullname: string, address: string, phone: string): Observable<Order> {
  //   const orderRequest = { fullname, address, phone };
  //   return this.http.post<Order>(`${this.baseUrl}/add/${userId}`, orderRequest);
  // }
  addToOrderFromCart(userId: number, fullname: string, address: string, phone: string) {
    return this.http.post<Order>(`${this.baseUrl}/add/${userId}?fullname=${fullname}&address=${address}&phone=${phone}`, {});
  }
  

  // updateCartQuantity(CartId: number, newQuantity: number): Observable<Cart> {
  //   return this.http.put<Cart>(`${this.baseUrl}/update/${CartId}?newQuantity=${newQuantity}`, {});
  // }

  // removeFromCart(CartId: number): Observable<void> {
  //   return this.http.delete<void>(`${this.baseUrl}/remove/${CartId}`);
  // }
}
