import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpclient:HttpClient) { }



  getUsers():Observable<any>
  {
   return this.httpclient.get('https://localhost:44377/api/User');
  }
}
