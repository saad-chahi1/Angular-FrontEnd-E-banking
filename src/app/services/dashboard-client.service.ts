import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MyClient } from '../models/my-client';
import { MyCompte } from '../models/my-compte';
import { MyTransaction } from '../models/my-transaction';

@Injectable({
  providedIn: 'root'
})
export class DashboardClientService {

  constructor(private http:HttpClient) { }

  getAll(){
    return this.http.get<MyClient>('http://localhost:8080/spring-crm-rest/api/clients/1');
  }
  getAllComptes(){
    return this.http.get<MyCompte>('http://localhost:8080/spring-crm-rest/api/comptes/1');
  }
  getAllTransactions(){
    return this.http.get<MyTransaction>('http://localhost:8080/spring-crm-rest/api/transactions/1');
  }
}
