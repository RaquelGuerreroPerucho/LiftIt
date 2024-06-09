import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { h } from 'ionicons/dist/types/stencil-public-runtime';
import { ConfigCustom } from '../utils/config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  authUrl = `${ConfigCustom.getBaseUrl()}/auth`;

  constructor(private http: HttpClient) { }

  registerUser(email: string, password: string, username: string, preguntaSeguridad: string, respuestaSeguridad: string): Observable<any>{
    const url = `${this.authUrl}/register`;
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const body = JSON.stringify({email,password,username, preguntaSeguridad, respuestaSeguridad});
    console.log(body)

    return this.http.post(url,body,{headers});
  }

  loginUser(email: string, password: string): Observable<any>{
    const url = `${this.authUrl}/login`;
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const body = JSON.stringify({email,password});

    return this.http.post(url,body,{headers});
  }

}
