import { Injectable } from '@angular/core';
import { HttpClient,HttpClientModule, HttpHeaders } from '@angular/common/http';
// import { Http, Response } from '@angular/http';  
import { Observable, of, throwError, pipe} from "rxjs"
import { map, filter, catchError, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public apiURL:string="http://127.0.0.1:8000";

  constructor(private httpClient:HttpClient) { }
 // This tutorial is by DotNet Techy YouTube Channel
    // For more info about channel You can visit this link
    //  https://www.youtube.com/c/dotnettechy
  ValidateUser (user:any):Observable<any>
  {
    // var userData = "username=" + user.UserName + "&password=" + user.Password;
    var reqHeader = new HttpHeaders({ 'Content-Type' : 'application/json'});

    return this.httpClient.post(this.apiURL+ '/login/',user,{ headers: reqHeader })
    .pipe(
      map(res => res),
       catchError( this.errorHandler)
      );
  }
  getClaims (username:any):Observable<any>
  {
    console.log(localStorage.getItem("token"));
    var reqHeader = new HttpHeaders({ 'Authorization':'Token '+this.getToken()});
        reqHeader.append('Content-Type', 'application/json');
    // var reqHeader = new HttpHeaders({ 'Content-Type' : 'application/json'});
    return this.httpClient.get(this.apiURL+ '/get_user/?username='+username,{ headers: reqHeader })
    .pipe(
      map(res => res),
       catchError( this.errorHandler)
      );
  }
  public isAuthenticated(): boolean {
    return this.getToken() !== null;
  }
  storeToken(token: string) {
    localStorage.setItem("token", token);
  }
  getToken() {
    return localStorage.getItem("token");
  }
  removeToken() {
    return localStorage.removeItem("token");
  }
  storeRole(role: any) {
    this.removeRole();
    localStorage.setItem('role', JSON.stringify(role));
  }
  getRole() {
    // return localStorage.getItem("role");
    return JSON.parse(localStorage.getItem('role'));
  }
  removeRole() {
    return localStorage.removeItem("role");
  }
  errorHandler(error: Response) {  
    console.log(error);  
    return throwError(error);  
} 
}