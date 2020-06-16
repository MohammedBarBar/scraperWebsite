import { Component, OnInit, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import {BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  modalRef: BsModalRef;
  laptops: any
  desktops:any
  check
  value
  value1
  nameuser
  phone
  email
  totalRecordes: string
  totalRecordess: string
  selected: any = {
    id: '',
    name: '',
    image_urls: '',
    phone:'',
    price:'',
    type:''
    

  }
  page:number=1
   @ViewChild('MaxpriceId') MaxpriceId: ElementRef;
   @ViewChild('MinpriceId') MinpriceId: ElementRef;
   @ViewChild('listing_pagination') listing_pagination: ElementRef;

  constructor(private toastr: ToastrService,private adsService : ApiService,private modalService: BsModalService,) {
    this.getAllAds();
   }

   getAllAds = () => {
    this.adsService.getAds().subscribe(
      data => {
        // console.log(data)
        this.desktops = data.desktops;
        console.log(this.desktops)
        this.laptops = data.laptops;
        this.nameuser = data.username;
        this.email = data.email;
        this.phone = data.phone;

        // this.totalRecordes = data.length
        // console.log(this.laptops);
      },
      error => {
        console.log(error);
      }
    )
  }
  delete(x){
    this.info(x)
    this.adsService.delete(this.selected).subscribe(
      data => {
        this.getAllAds();
        this.toastr.success("Deleted Sucessfully");
      },
      error =>
      console.log('')
    )
  }
  delete2(x){
    this.info2(x)
    this.adsService.delete(this.selected).subscribe(
      response => {
        this.getAllAds();
        this.toastr.success("Deleted Sucessfully");
      },
      error =>
      console.log('')
    )
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
 
  save(){
this.adsService.update(this.selected).subscribe(
  data => {
    this.getAllAds();
    this.toastr.success("Updated Sucessfully")
  },
  error =>
  console.log('eror')
)



}
 



  
  
  info(x){
    this.selected.name = x.name
    this.selected.image_urls = x.image_urls
    this.selected.phone = x.phone
    this.selected.price = x.price
    this.selected.type = 'Desktop'
    this.selected.id = x.id
    console.log(this.selected)
  }
  info2(x){
    this.selected.name = x.name
    this.selected.image_urls = x.image_urls
    this.selected.phone = x.phone
    this.selected.price = x.price
    this.selected.type = 'Laptops'
    this.selected.id = x.id
  }
  ngOnInit(): void {
  }

}
