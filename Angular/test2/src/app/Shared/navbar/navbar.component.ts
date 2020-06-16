import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() message :boolean = false
  constructor(private toastr: ToastrService,private authService:AuthenticationService,private route:Router) { }

  ngOnInit(): void {
  }

  logout()
  {
    this.authService.removeToken();
    this.toastr.success("GoodBye")
this.route.navigate(['/Home'])
  } 

}
