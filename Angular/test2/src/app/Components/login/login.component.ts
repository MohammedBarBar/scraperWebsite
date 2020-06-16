import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { error } from 'protractor';
import { Registration } from 'src/app/Models/User.Models';
import { AuthenticationService } from 'src/app/authentication.service';
import { RouterLink, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})
export class LoginComponent implements OnInit {
  login;
  public globalResponse: any;
  currentUser: Registration[];

  constructor(private toastr: ToastrService,private loginService: ApiService,private authService:AuthenticationService,private router: Router) { }
  ngOnInit(){
    this.login = {
      username:'',
      password:''
    };
  }

  // loginUser() {
  //   this.loginService.loginUser(this.login).subscribe(
  //     response => {
  //       console.log(response)
  //     },
  //     error => alert('User Name or Password Wrong')
    
  //   );
  //     }
  loginUser() {
      let user=this.login;
      // this.isLoggedIn=false;
      this.authService.removeToken();
      // this.alerts=[];
      //console.log(user);
          this.authService.ValidateUser(user)
              .subscribe((result) => {
                this.globalResponse = result; 
                this.authService.storeToken(this.globalResponse.token)           
              },
              error => { //This is error part
                this.toastr.error("Invalid UserName or Password")
                console.log(error.message);
                // this.alerts.push({
                //   id: 2,
                //   type: 'danger',
                //   message: 'Either user name or password is incorrect.'
                // });
              },
              () => {
                  //  This is Success part
                 // console.log(this.globalResponse);
                  // localStorage.storeToken("token",this.globalResponse.access_token);  
                  // console.log(this.globalResponse.access_token)
                  console.log("Successfull");
                  console.log(this.globalResponse)

                  // this.alerts.push({
                  //   id: 1,
                  //   type: 'success',
                  //   message: 'Login successful. Now you can close and proceed further.',
                  // });
                  // this.isLoggedIn=true;
                  this.GetClaims();
                  
                  }
                )}

           GetClaims()
          {
             this.authService.getClaims(this.login.username)
            .subscribe((result) => {
              this.globalResponse = result;  
              console.log(result)            
            },
            error => { //This is error part
              this.toastr.error("Invalid UserName or Password")
              console.log("error");
            },
            () => {
                //  This is Success part
               // console.log(this.globalResponse );
                let a=this.globalResponse;
                this.currentUser=this.globalResponse;
                this.authService.storeRole(this.currentUser);
                this.toastr.success("Welcome " + this.login.username )
                // alert('Welcom '+ this.login.username);
                this.router.navigateByUrl('/Home');

                }
              )
            
  } 


}
