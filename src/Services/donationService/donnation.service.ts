import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DonnationService {

  constructor(private httpClient:HttpClient) { }

  getInkindDonation():Observable<any>{
    return this.httpClient.get(`https://localhost:44377/api/InKindDonation`)
  }
  getMoneyDonation():Observable<any>{
    return this.httpClient.get(`https://localhost:44377/api/MoneyDonation`)
  }
}
