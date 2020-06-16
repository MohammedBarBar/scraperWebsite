import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ApiService]
})
export class AppComponent {
   title = 'test2';
  laptops: any;
  

  constructor(private api: ApiService){
    // this.getAllLaptops();
  }
  getAllLaptops = () => {
    this.api.getLaptops().subscribe(
      data => {
        //this.laptops = data;
        //console.log(this.laptops);
      },
      error => {
        console.log(error);
      }
    )
  }
}
