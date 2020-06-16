import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  register;
  errorMassege;
  users;
  constructor(private toastr: ToastrService,private registerService: ApiService,private router:Router) {
    this.getUsers();
   }

  ngOnInit(){
    this.register = {
      username:'',
      email:'',
      password:'',
      password2:'',
      phone:''
    };
  }

  getUsers(){
    this.registerService.getAllUsers().subscribe(
      data =>{
        this.users = data.results
        // for(let i = 0 ; i < data.length ; i++){
        //   if(this.register.username == data[i].username){
        //     this.errorMassege = 1
        //     break;
        //   }
        //   else if(this.register.email == data[i].email){
        //   this.errorMassege = 2
        //   break;}
        //   else if (this.register.password != this.register.password2){
        //   this.errorMassege = 3
        //   break;}
        //   else
        //   this.errorMassege = 0
        // }
        // console.log(this.errorMassege)
      },
      error =>{
        this.toastr.error("Error in Server get users failed Try Again Please")
      }
      
    )
  }

  registerUser() {
    for(let i = 0 ; i < this.users.length ; i++){
      if(this.register.username == this.users[i].username){
        this.errorMassege = 1
        break;
      }
      else if(this.register.email == this.users[i].email){
      this.errorMassege = 2
      break;}
      else if (this.register.password != this.register.password2){
      this.errorMassege = 3
      break;}
      else
      this.errorMassege = 0
    }
    console.log(this.errorMassege)
    this.registerService.registerNewUser(this.register).subscribe(
      response => {
        if(this.register.phone == null)
        this.toastr.warning('You Dont Enter Phone Number')
        this.toastr.success('User ' + this.register.username + 'Has been Registerd')
        this.router.navigateByUrl('/Home');
        // alert('User ' + this.register.username + 'Has been Registerd')
      },
      error => {
        if(this.errorMassege == 1)
        this.toastr.error("Registration Failed UserName existing")
        else if (this.errorMassege == 2)
        this.toastr.error("Registration Failed Email existing")
        else if (this.errorMassege == 3)
        this.toastr.error("Registration Failed Password Not Match")
        else 
        this.toastr.error("Registration Failed Fill All requirments")

      }
      // console.log('ERROR')
    
    );
      }

}
