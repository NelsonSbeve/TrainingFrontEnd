import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:5041';
  constructor(private http: HttpClient) {}


  // Example POST request
  createItem(item: any) {
    return this.http.post(`${this.apiUrl}/api/Skills`, item);
  }

}
