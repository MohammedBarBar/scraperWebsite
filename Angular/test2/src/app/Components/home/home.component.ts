import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import {FormsModule} from '@angular/forms';
import { concat } from 'rxjs';
import { AuthenticationService } from 'src/app/authentication.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  laptops: any
  desktops:any
  all: any
  desktopList = ['HP','Dell','Lenovo','ACER','Alienware','Apple','ASUS']
  laptopList = ['HP','Dell','Lenovo','ACER','MSI','Apple','ASUS','TOSHIBA']
  check
  value
  value1
  value2
  totalRecordes: string
  totalRecordess: string
  page:number=1
   @ViewChild('MaxpriceId') MaxpriceId: ElementRef;
   @ViewChild('MinpriceId') MinpriceId: ElementRef;
   @ViewChild('listing_pagination') listing_pagination: ElementRef;
   
  
   
   
  constructor(private toastr: ToastrService,private laptopsService : ApiService,private authService:AuthenticationService,private router: Router) {
    // authService.removeToken();
    // console.log(authService.isAuthenticated())
    if (authService.isAuthenticated()) {
      // this.location.replaceState('/'); // clears browser history so they can't navigate with back button
      this.router.navigateByUrl('/Home2');
      return null;
  }

    this.getAllDesktops();
    this.getAllLaptops();
   }
   getAllDesktops = () => {
    this.laptopsService.getDesktops().subscribe(
      data => {
        this.desktops = data;
        this.all = data
        // this.totalRecordes = data.length
        // console.log(this.laptops);
      },
      error => {
        console.log(error);
      }
    )
  }
   getAllLaptops = () => {
    this.laptopsService.getLaptops().subscribe(
      data => {
        this.laptops = data;
        this.all = this.all.concat(this.laptops)
        this.all = this.shuffleArray(this.all)
        this.totalRecordes = this.all.length

        // console.log(this.laptops);
      },
      error => {
        console.log(error);
      }
    )
  }
  getSearchedLaptops = () => {
    this.laptopsService.getSearchedLaptops(this.value,this.MaxpriceId,this.MinpriceId).subscribe(
      data => {
        this.all = null
        this.all = data;
        this.totalRecordes = this.all.length
        this.page = 1
        console.log(this.all);
      },
      error => {
        console.log(error);
      }
    )
  }
  getSearchedDesktops = () => {
    this.laptopsService.getSearchedDesktops(this.value,this.MaxpriceId,this.MinpriceId).subscribe(
      data => {
        this.all = null
        this.all = data;
        this.totalRecordes = this.all.length
        this.page = 1
        console.log(this.all);
      },
      error => {
        console.log(error);
      }
    )
  }
  ngOnInit(): void {
   
  
  }
  search(){

    // for (var i = 0; i < this.laptops.length; i++) {

    //   if (this.laptops[i].price == this.priceId)
    //     console.log(this.laptops[i].price +" yes");
    //   else
    //   console.log(this.laptops[i].price +" no");
    // }
    this.laptops = null
    this.desktops = null
    console.log(this.value1)
    if(this.value1=='desktop')
    this.getSearchedDesktops()
    else if(this.value1=='laptop')
    this.getSearchedLaptops()
    else
    {
      
      this.getAllDesktops();
      this.getAllLaptops();
    }
    this.toastr.success("Go Down for your reasult")

  }

  // check(){
  //   if (this.selected == "desktop")
  //     console.log("desktops")
  // }
  filterForeCasts(filterVal: any) {
    //console.log(filterVal)
    this.value1=filterVal
     if (filterVal == "desktop"){
      this.check = true
      this.value = null
      this.MaxpriceId = null
      this.MinpriceId = null
     }
     else{
      this.check=false
      this.value = null
      this.MaxpriceId = null
      this.MinpriceId = null
     }
     
       
    // else
       
}
filterForeCasts1(filterVal: any) {
 this.value = filterVal
}
filterForeCasts2(filterVal: any) {
  this.value = filterVal
 }
//  filterForeCasts3(filterVal: any) {
//   this.value2 = filterVal
//  }
shuffleArray(array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}
ngAfterViewInit(): void {
  $('.selectpicker').selectpicker();
}
  }
  // OnInput(value) {
  //   console.log(value);
  //  }

