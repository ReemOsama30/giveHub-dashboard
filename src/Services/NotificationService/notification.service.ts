import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private httpClient:HttpClient) { }


  getAllNotifications():Observable<any>{
return this.httpClient.get(`https://localhost:44377/api/Admin/Notification`);

  }
}
