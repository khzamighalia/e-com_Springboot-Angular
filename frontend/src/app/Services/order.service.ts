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

  addToOrderFromCart(userId: number, fullname: string, address: string, phone: string) {
    return this.http.post<Order>(`${this.baseUrl}/add/${userId}?fullname=${fullname}&address=${address}&phone=${phone}`, {});
  }

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}/all`);
  }
  

}
