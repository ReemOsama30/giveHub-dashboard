import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private _HttpClient:HttpClient) { }
  getProjects():Observable<any>{
    return this._HttpClient.get(`https://localhost:44377/api/project`)
  }
  getAllprojectForCharityId(id:number):Observable<any>
  {
    return this._HttpClient.get(`https://localhost:44377/api/project/charity/${id}`)
  }
}
