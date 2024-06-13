import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'http://localhost:8080/login';
  private productsUrl = 'http://localhost:8080/api/products';
  private categoriesUrl = 'http://localhost:8080/api/categories';

  private username: string | null = null;
  private password: string | null = null;

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(username + ':' + password),
      'Content-Type': 'application/json'
    });

    // Store credentials on successful login
    return this.http.post(this.loginUrl, {}, { headers }).pipe(
      tap(() => {
        this.username = username;
        this.password = password;
      })
    );
  }

  logout() {
    this.username = null;
    this.password = null;
  }

  private getAuthHeaders(): HttpHeaders {
    if (this.username && this.password) {
      return new HttpHeaders({
        'Authorization': 'Basic ' + btoa(this.username + ':' + this.password),
        'Content-Type': 'application/json'
      });
    }
    return new HttpHeaders();
  }

  getProducts(): Observable<any> {
    return this.http.get(this.productsUrl, { headers: this.getAuthHeaders() });
  }

  getProductById(id: number):  Observable<any>{
    return this.http.get(this.productsUrl + '/' + id, { headers: this.getAuthHeaders() });
  }

  createProduct(product: any): Observable<any> {
    return this.http.post(this.productsUrl, product, { headers: this.getAuthHeaders() });
  }

  updateProduct(id: number, product: Product): Observable<any> {
    return this.http.put(`${this.productsUrl}/${id}`, product, { headers: this.getAuthHeaders() });
  }

  deleteProduct(productId: number): Observable<any> {
    return this.http.delete(`${this.productsUrl}/${productId}`, { headers: this.getAuthHeaders() });
  }

  getCategories(): Observable<any> {
    return this.http.get(this.categoriesUrl, { headers: this.getAuthHeaders() });
  }

  searchProducts(name: string, category: string): Observable<Product[]> {
    let params = new HttpParams();
    if (name) {
      params = params.set('name', name);
    }
    if (category) {
      params = params.set('category', category);
    }
    return this.http.get<Product[]>(this.productsUrl + '/' + "search", { params, headers: this.getAuthHeaders() });
  }

}
