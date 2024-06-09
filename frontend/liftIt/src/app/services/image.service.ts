import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Image } from './image.model';
import { ConfigCustom } from '../utils/config';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  imageUrl = `${ConfigCustom.getBaseUrl()}/images`

  constructor(private http: HttpClient) { }

  getAllUserImages(userId : string, entrenamientoId : string, token: string) : Observable<Image[]>{
    const url = `${this.imageUrl}/getByUserId/${userId}/${entrenamientoId}`;

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    return this.http.get<Image[]>(url, {headers});
  }

  uploadImage(image: Image, token: string) : Observable<Image>{
    const url = `${this.imageUrl}/create`;

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    return this.http.post<Image>(url, image, {headers});
  }

}
