import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MyClient } from '../models/my-client';
import { MyCompte } from '../models/my-compte';
import { MyTransaction } from '../models/my-transaction';
import { map } from 'rxjs/operators';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { MyCommande } from '../models/my-commande';
import { MyVirement } from '../models/my-virement';

@Injectable({
  providedIn: 'root'
})
export class DashboardClientService {
   // BASE_PATH: 'http://localhost:8080'
   USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'
   USER_NAME_SESSION_ATTRIBUTE_ID = 'authenticated'
   USER_NAME_SESSION_ATTRIBUTE_MP = 'root'
   

   public username: String =this.getLoggedInUserName();
   public password: String=this.getLoggedInUserMP() ;
   greeting : any;
   id : any ;

  constructor(private http:HttpClient) { }

  getIdUser(){
    let params = new HttpParams().set('_search', this.getLoggedinUser());
    this.http.get('http://localhost:8080/spring-crm-rest/api/users/id', { params: params }).subscribe(data => {this.id = data;});   
      sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_ID, this.id);  

     
  }

  getAll(){
    let params = new HttpParams().set('_search', this.getLoggedinUser());
    return this.http.get<MyClient>('http://localhost:8080/spring-crm-rest/api/clients/id', { params: params });
  }
  getAllComptes(){
    return this.http.get<MyCompte>('http://localhost:8080/spring-crm-rest/api/comptes/'+this.getLoggedinUserID());
  }
  getAllTransactions(){
    return this.http.get<MyTransaction>('http://localhost:8080/spring-crm-rest/api/transaction/'+this.getLoggedinUserID());
  }
  getTheLastTransactions(){
    return this.http.get<MyTransaction>('http://localhost:8080/spring-crm-rest/api/lastTransactions/'+this.getLoggedinUserID());
  }
  authenticationService(username: string, password: string) {
    return this.http.get('http://localhost:8080/spring-crm-rest/basicauth',
      { headers: { authorization: this.createBasicAuthToken(username, password) } }).pipe(map((res) => {
        this.username = username;
        this.password = password;
        this.registerSuccessfulLogin(username, password);
      }));
  }

  createBasicAuthToken(username: String, password: String) {
    return 'Basic ' + window.btoa(username + ":" + password)
  }

  registerSuccessfulLogin(username: string, password: string) {
    sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, username)
    sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_MP, password)
  }

  logout() {
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_ID);
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_MP);
    this.username = "";
    this.password = "";
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (user === null) return false
    return true
  }
  getLoggedinUser() {
		let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
		if (user === null) return ''
		return user
	}
  getLoggedinUserID() {
		let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_ID)
		if (user === null) return ''
		return user
	}

  getLoggedInUserName() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (user === null) return ''
    return user
  }
  getLoggedInUserMP() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_MP)
    if (user === null) return ''
    return user
  }
  postData(commande : any){
    return this.http.post<MyCommande>('http://localhost:8080/spring-crm-rest/api/paiments/'+this.getLoggedinUserID(),commande);
  }
  postDataVirement(commande : any){
    return this.http.post<MyVirement>('http://localhost:8080/spring-crm-rest/api/virements/'+this.getLoggedinUserID(),commande);
  }
}
