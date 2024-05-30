import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Training } from './training.model';

@Injectable({
  providedIn: 'root'
})
export class EntrenamientoService {

  baseUrl = "http://localhost:8091/trainings"; 

  constructor(private http: HttpClient) { }

  createTraining(trainingModel: any, token: string): Observable<any> {
    const url = `${this.baseUrl}/create`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(url, trainingModel, {headers});
  }

  updateTraining(id: string, trainingModel: any, token: string): Observable<any> {
    const url = `${this.baseUrl}/update/${id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.put(url, trainingModel, {headers});
  }

  deleteTraining(id: string, token: string): Observable<any> {
    const url = `${this.baseUrl}/delete/${id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.delete(url, {headers});
  }

  getEntrenamientosUsuario(userId: string, token: string): Observable<Training[]> {
    console.log("token", token);

    //const url = `${this.baseUrl}/getByUserId/${userId}`;

    const url = "http://localhost:8091/trainings/getByUserId/23"
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    console.log(headers);
    return this.http.get<Training[]>(url, {headers});
  }




}
