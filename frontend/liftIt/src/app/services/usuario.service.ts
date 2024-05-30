import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8091/user'; // Reemplaza esto con la URL de tu API

  constructor(private http: HttpClient) { }

  createUser(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, user);
  }

  updateUser(id: string, user: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}`, user);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/list`);
  }

  getUserById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/get/${id}`);
  }

  getUserByEmail(email: string, token: string): Observable<any> {
    console.log("token", token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
   
     return this.http.get(`${this.apiUrl}/getByEmail/${email}`, {headers});
  }
}