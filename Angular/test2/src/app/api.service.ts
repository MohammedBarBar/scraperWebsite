import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseurl = "http://127.0.0.1:8000";
  httpHeaders = new HttpHeaders({'Content-Type' : 'application/json'});
  // value
  constructor(private http: HttpClient,private auth:AuthenticationService,private toastr: ToastrService) { }
  registerNewUser(userdata): Observable<any>{
    return this.http.post(this.baseurl + '/registration/', userdata , {headers : this.httpHeaders});
  }

  loginUser(username): Observable<any>{
    return this.http.post(this.baseurl + '/login/',username , {headers : this.httpHeaders});
  }

  getAds(): Observable<any>{
    // console.log(this.auth.getToken());
    var reqHeader = new HttpHeaders({ 'Authorization':'Token '+this.auth.getToken()});
        reqHeader.append('Content-Type', 'application/json');
    return this.http.get(this.baseurl + '/get_ads/'  , {headers : reqHeader});
  }
  
  postDevice(data): Observable<any>{
    console.log(this.auth.getToken())
    var reqHeader = new HttpHeaders({ 'Authorization':'Token '+this.auth.getToken()});
        reqHeader.append('Content-Type', 'application/json');
    return this.http.post(this.baseurl + '/post_ads/' , data  , {headers : reqHeader});
  }
  getLaptops(): Observable<any>{
    return this.http.get(this.baseurl + '/laptops/'  , {headers : this.httpHeaders});
  }
  getDesktops():Observable<any>{
    return this.http.get(this.baseurl + '/desktops/'  , {headers : this.httpHeaders});
  }
  getAllUsers(): Observable<any>{
    return this.http.get(this.baseurl + '/registers/'  , {headers : this.httpHeaders});
  }
  getSearchedDesktops(value,max,min):Observable<any>{
    if(value != null && max != null && min != null)
    return this.http.get(this.baseurl + '/searchDesktop/?name=' +value +'&max_price=' + max +'&min_price=' + min , {headers : this.httpHeaders});
    else if(value != null && max != null && min == null)
     return this.http.get(this.baseurl + '/searchDesktop/?name=' +value +'&max_price=' + max, {headers : this.httpHeaders});
     else if(value != null && max == null && min != null)
     return this.http.get(this.baseurl + '/searchDesktop/?name=' +value + '&min_price=' + min, {headers : this.httpHeaders});
     else if(value != null && max == null && min == null)
     return this.http.get(this.baseurl + '/searchDesktop/?name=' +value, {headers : this.httpHeaders});
     else if(value == null && max != null && min != null)
     return this.http.get(this.baseurl + '/searchDesktop/?' +'max_price=' + max + '&min_price=' + min, {headers : this.httpHeaders});
     else if(value == null && max == null && min != null)
     return this.http.get(this.baseurl + '/searchDesktop/?' +'min_price=' + min, {headers : this.httpHeaders});
     else if(value == null && max != null && min == null)
     return this.http.get(this.baseurl + '/searchDesktop/?' +'max_price=' + max , {headers : this.httpHeaders});
    else if(value == null && max == null && min == null)
    return this.http.get(this.baseurl + '/searchDesktop/' , {headers : this.httpHeaders});
  } 
  getSearchedLaptops(value,max,min): Observable<any>{
    if(value != null && max != null && min != null)
    return this.http.get(this.baseurl + '/search/?name=' +value +'&max_price=' + max +'&min_price=' + min , {headers : this.httpHeaders});
    else if(value != null && max != null && min == null)
     return this.http.get(this.baseurl + '/search/?name=' +value +'&max_price=' + max, {headers : this.httpHeaders});
     else if(value != null && max == null && min != null)
     return this.http.get(this.baseurl + '/search/?name=' +value + '&min_price=' + min, {headers : this.httpHeaders});
     else if(value != null && max == null && min == null)
     return this.http.get(this.baseurl + '/search/?name=' +value, {headers : this.httpHeaders});
     else if(value == null && max != null && min != null)
     return this.http.get(this.baseurl + '/search/?' +'max_price=' + max + '&min_price=' + min, {headers : this.httpHeaders});
     else if(value == null && max == null && min != null)
     return this.http.get(this.baseurl + '/search/?' +'min_price=' + min, {headers : this.httpHeaders});
     else if(value == null && max != null && min == null)
     return this.http.get(this.baseurl + '/search/?' +'max_price=' + max , {headers : this.httpHeaders});
    else if(value == null && max == null && min == null)
    return this.http.get(this.baseurl + '/search/' , {headers : this.httpHeaders});

    
  }
  delete(select) {
    var reqHeader = new HttpHeaders({ 'Authorization':'Token '+this.auth.getToken()});
    reqHeader.append('Content-Type', 'application/json');
    return this.http.delete(this.baseurl + '/deleteItem/?' + 'user_id=' + select.id +'&type=' +select.type,{headers : reqHeader});
  }

  update(task) {
    var reqHeader = new HttpHeaders({ 'Authorization':'Token '+this.auth.getToken()});
    reqHeader.append('Content-Type', 'application/json');
    return this.http.put(this.baseurl + '/updateItem/', task ,{headers : reqHeader});
  }
  // get() {
  //   //return this.http.get(this.baseurl)
  //   return new Promise((resolve, reject) => {
  //     this.http.get(this.baseurl + '/desktops/' , {
  //       // headers: {
  //       //   'Authorization': localStorage.getItem("access_token") == null ? '' : localStorage.getItem("access_token") == null ? '' : localStorage.getItem("access_token")
  //       // }
  //     }).subscribe((data: any) => {
  //      // console.log(data);
  //       //resolve(data.data);
  //       //this.handleSuccess(data);
  //     }, (error) => {
  //       //console.log(error);
  //       reject(error);
  //      // this.handleFail(error);
  //     })
  //   });
  // }

}
