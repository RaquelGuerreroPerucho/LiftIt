import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Entrenamiento } from './entrenamiento.model';
import { ConfigCustom } from '../utils/config';

@Injectable({
  providedIn: 'root'
})
export class EntrenamientoService {

  trainUrl = `${ConfigCustom.getBaseUrl()}/trainings`;

  constructor(private http: HttpClient) { }

  createTraining(trainingModel: any, token: string): Observable<any> {
    const url = `${this.trainUrl}/create`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(url, trainingModel, {headers});
  }

  updateTraining(id: string, trainingModel: Entrenamiento, token: string): Observable<any> {
    const url = `${this.trainUrl}/update/${id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.put(url, trainingModel, {headers});
  }

  deleteTraining(id: string, token: string): Observable<any> {
    const url = `${this.trainUrl}/delete/${id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.delete(url, {headers});
  }

  getEntrenamientosUsuario(userId: string, token: string): Observable<Entrenamiento[]> {
    console.log("token", token);

    const url = `${this.trainUrl}/getByUserId/${userId}`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    console.log(headers);
    return this.http.get<Entrenamiento[]>(url, {headers});
  }

  getEntrenamientoById(id: string, token: string, userId: string): Observable<Entrenamiento> {
    const url = `${this.trainUrl}/getById/${id}/${userId}`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Entrenamiento>(url, {headers});
  }

}
