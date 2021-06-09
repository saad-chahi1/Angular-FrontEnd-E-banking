import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MyClient } from '../models/my-client';
import { MyCompte } from '../models/my-compte';
import { MyTransaction } from '../models/my-transaction';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardClientService {
   // BASE_PATH: 'http://localhost:8080'
   USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

   public username: String ="";
   public password: String="" ;
   greeting : any;
   id : any ;

  constructor(private http:HttpClient) { }

  getIdUser(){
    let params = new HttpParams().set('_search', this.getLoggedinUser());
    return this.http.get('http://localhost:8080/spring-crm-rest/api/users/id', { params: params });
  }

  getAll(){
    let params = new HttpParams().set('_search', this.getLoggedinUser());
    return this.http.get<MyClient>('http://localhost:8080/spring-crm-rest/api/clients/id', { params: params });
  }
  getAllComptes(){
    let params = new HttpParams().set('_search', this.getLoggedinUser());
    this.http.get('http://localhost:8080/spring-crm-rest/api/users/id', { params: params }).subscribe(data => {this.id = data;});
    return this.http.get<MyCompte>('http://localhost:8080/spring-crm-rest/api/comptes/'+this.id);
  }
  getAllTransactions(){
    let params = new HttpParams().set('_search', this.getLoggedinUser());
    this.http.get('http://localhost:8080/spring-crm-rest/api/users/id', { params: params }).subscribe(data => {this.id = data;});
    return this.http.get<MyTransaction>('http://localhost:8080/spring-crm-rest/api/transactions/'+this.id);
  }
  authenticationService(username: string, password: String) {
    return this.http.get('http://localhost:8080/spring-crm-rest/basicauth',
      { headers: { authorization: this.createBasicAuthToken(username, password) } }).pipe(map((res) => {
        this.username = username;
        this.password = password;
        this.registerSuccessfulLogin(username);
      }));
  }

  createBasicAuthToken(username: String, password: String) {
    return 'Basic ' + window.btoa(username + ":" + password)
  }

  registerSuccessfulLogin(username: string) {
    sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, username)
  }

  logout() {
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
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

  getLoggedInUserName() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (user === null) return ''
    return user
  }
}
