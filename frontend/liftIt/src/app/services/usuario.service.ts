import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigCustom } from '../utils/config';
import { Usuario } from './usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  userUrl = `${ConfigCustom.getBaseUrl()}/user`

  constructor(private http: HttpClient) { }

  createUser(user: any): Observable<any> {
    return this.http.post(`${this.userUrl}/create`, user);
  }

  updateUser(id: string, UsuarioModel : Usuario, token: string, ): Observable<any> {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`${this.userUrl}/update/${id}`,{headers});
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.userUrl}/delete/${id}`);
  }

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.userUrl}/list`);
  }

  getUserById(id: string, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.userUrl}/get/${id}`, {headers});
  }

  getUserByEmail(email: string, token: string): Observable<any> {
    console.log("token", token);
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
   
     return this.http.get(`${this.userUrl}/getByEmail/${email}`, {headers});
  }
}