import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Product } from '../shared/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

    private baseUrl = 'http://localhost:8080/products'; 
  
    constructor(private http: HttpClient) {}


    getAllProducts(): Observable<Product[]> {
      return this.http.get<Product[]>(this.baseUrl);
    }

    // createProduct(product: Product): Observable<Product> {
    //   return this.http.post<Product>(`${this.baseUrl}`, product);
    // }
    createProduct(formData: FormData): Observable<any> {
      return this.http.post<any>(`${this.baseUrl}`, formData);
    }

    getProduct(productId: number): Observable<Product> {
      const url = `${this.baseUrl}/${productId}`;
      return this.http.get<Product>(url);
    }

    updateProduct(id: number, product: Product): Observable<Product> {
      return this.http.put<Product>(`${this.baseUrl}/${id}`, product);
    }

    deleteProduct(id: number): Observable<void> {
      return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }

    // getProductsByIds(productIds: number[]): Observable<Product[]> {
    //   const url = `${this.baseUrl}`; // Assuming your API endpoint to fetch products by IDs
    //   return this.http.post<Product[]>(url, { productIds }).pipe(
    //     catchError((error: any) => {
    //       console.error('Error fetching products by IDs:', error);
    //       throw error; // Rethrow the error to be caught by the caller
    //     })
    //   );
    // }

    getProductsByIds(productIds: number[]): Observable<Product[]> {
      const url = `${this.baseUrl}`; // Assuming your API endpoint to fetch products by IDs
      return this.http.post<Product[]>(url, { productIds }).pipe(
        catchError((error: any) => {
          console.error('Error fetching products by IDs:', error);
          throw error; // Rethrow the error to be caught by the caller
        })
      );
    }

    

   
}
