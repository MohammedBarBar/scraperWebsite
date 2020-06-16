import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  apiURL = 'http://localhost:8080/tm-backend'
  constructor(private http: HttpClient,
    private toastr: ToastrService) { }

  
  get(url) {
    
    return new Promise((resolve, reject) => {
      this.http.get(this.apiURL + url, {
        headers: {
          'Authorization': localStorage.getItem("access_token") == null ? '' : localStorage.getItem("access_token") == null ? '' : localStorage.getItem("access_token")
        }
      }).subscribe((data: any) => {
        console.log(data);
        resolve(data.data);
        this.handleSuccess(data);
      }, (error) => {
        //console.log(error);
        reject(error);
        this.handleFail(error);
      })
    });
  }

  post(url, data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiURL + url, data, {
        headers: {
          'Authorization': localStorage.getItem("access_token") == null ? '' : localStorage.getItem("access_token")
        }
      }).subscribe((data: any) => {
        console.log(data);
        if (data.success) {
          resolve(data.data);
        } else {
          reject(data);
        }
        this.handleSuccess(data);
      }, (error) => {
        console.log(error);
        reject(error);
        this.handleFail(error);
      })
    });
  }

  delete(url,id) {
    return new Promise((resolve, reject) => {
      this.http.delete(this.apiURL + url + id, {
        headers: {
          'Authorization': localStorage.getItem("access_token") == null ? '' : localStorage.getItem("access_token")
        }
      }).subscribe((data: any) => {
        console.log(data);
        if (data.success) {
          resolve(data.data);
        } else {
          reject(data);
        }
        this.handleSuccess(data);
      }, (error) => {
        console.log(error);
        reject(error);
        this.handleFail(error);
      })
    });
  }

  put(url, data) {
    return new Promise((resolve, reject) => {
      this.http.put(this.apiURL + url, data, {
        headers: {
          'Authorization': localStorage.getItem("access_token") == null ? '' : localStorage.getItem("access_token")
        }
      }).subscribe((data: any) => {
        console.log(data);
        if (data.success) {
          resolve(data.data);
        } else {
          reject(data);
        }
        this.handleSuccess(data);
      }, (error) => {
        console.log(error);
        reject(error);
        this.handleFail(error);
      })
    });
  }

  private handleSuccess(data) {
    if (data.success) {
      if (data.msg_show) {
        // this.toastr.success(data.msg, "Success!");
      }
    } else {
      this.toastr.error(data.msg, "Failed!");
    }
  }

  private handleFail(error) {
    this.toastr.error("An error occured while proccessing this request", "Failed!");
  }
}
