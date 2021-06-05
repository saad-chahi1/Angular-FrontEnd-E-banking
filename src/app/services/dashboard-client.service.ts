import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  /*public login(username:string, password:string){
    const headers = new HttpHeaders({Autorization : 'Basic'+btoa(username +":"+password)});
    return this.http.get('http://localhost:8080/', {headers, responseType:'text' as 'json'});
  }
  public getAllClients(){
    let username = "saad";
    let password = "root";
    const headers = new HttpHeaders({Autorization : 'Basic'+btoa(username +":"+password)});
    return this.http.get('http://localhost:8080/spring-crm-rest/api/clients', {headers, responseType:'text' as 'json'});
  }*/
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

  getLoggedInUserName() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (user === null) return ''
    return user
  }
}
