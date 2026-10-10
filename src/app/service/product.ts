import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/products';

interface ProductApiResponse{
  products:Product[];
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
private apiUrl = 'https://dummyjson.com/products';
 constructor(private http: HttpClient) {}

 getProducts():Observable<ProductApiResponse>{
  return this.http.get<ProductApiResponse>(this.apiUrl);
 }
}
