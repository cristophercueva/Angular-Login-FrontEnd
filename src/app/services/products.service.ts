import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/products'
   }

   getProducts(): Observable<Product[]>{
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.get<Product[]>(`${this.myAppUrl}${this.myApiUrl}`, {headers: headers})
   }

}
