import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { h } from 'ionicons/dist/types/stencil-public-runtime';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = "http://localhost:8091"

  constructor(private http: HttpClient) { }

  registerUser(email: string, password: string, username: string, preguntaSeguridad: string, respuestaSeguridad: string): Observable<any>{
    const url = `${this.baseUrl}/auth/register`;
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const body = JSON.stringify({email,password,username, preguntaSeguridad, respuestaSeguridad});
    console.log(body)

    return this.http.post(url,body,{headers});
  }

  loginUser(email: string, password: string): Observable<any>{
    const url = `${this.baseUrl}/auth/login`;
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const body = JSON.stringify({email,password});

    return this.http.post(url,body,{headers});
    
  }

}
