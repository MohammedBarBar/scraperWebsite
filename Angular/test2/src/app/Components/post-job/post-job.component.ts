import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ToastrModule, ToastrService, ToastContainerDirective } from 'ngx-toastr';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
// import {NgxImageCompressService} from 'ngx-image-compress';

@Component({
  selector: 'app-post-job',
  templateUrl: './post-job.component.html',
  styleUrls: ['./post-job.component.css']
})
export class PostJobComponent implements OnInit {
chosebtype
file: File;
ff:any
imgResultAfterCompress:string;
@ViewChild('price') price: ElementRef;
@ViewChild('desc') desc: ElementRef;
@ViewChild('phone') phone: ElementRef;
deviceInfo: any = {
  name: '',
  price: '',
  type:'',
  image_urls: '',
  phone:''
  
}
  constructor(private toastr: ToastrService,private postService : ApiService,private router: Router) { }
    // ,private imageCompress: NgxImageCompressService
  ngOnInit(): void {
  }
  filterForeCasts(filterVal: any) {
    //console.log(filterVal)
    this.chosebtype = filterVal
       
    // else
       
}

save(){
if(!(this.price == null || this.desc == null || this.chosebtype == null)){

this.deviceInfo.name = this.desc
this.deviceInfo.price = this.price
this.deviceInfo.type = this.chosebtype
this.deviceInfo.phone = this.phone
this.deviceInfo.image_urls = this.ff
console.log(this.deviceInfo.name,this.deviceInfo.price,this.deviceInfo.type)
this.postService.postDevice(this.deviceInfo).subscribe(
  data => {
    this.toastr.success("Posted Successfully")
    // alert('Posted Successfully')
    this.router.navigateByUrl('/Home');


   // this.desktops = data;
    // console.log(this.laptops);
  },
  error => {
    this.toastr.error("Post Erorr Enter All Requierd Field")
    console.log(error);
  }
)
}
else {
  this.toastr.error("Empty Field", "ERROR");
  console.log('error')


}




}

onChange(event: EventTarget) {
     
  let eventObj: MSInputMethodContext = <MSInputMethodContext> event;
  let target: HTMLInputElement = <HTMLInputElement> eventObj.target;
  let files: FileList = target.files;
  this.file = files[0];

 var reader = new FileReader();
 reader.readAsDataURL(this.file);


reader.onload = () => {
  this.ff = reader.result;
  console.log(this.ff);
 
};
reader.onerror =  (error)=> {
  console.log('File Error: ', error);
  
  
};

}
// compressFile() {
  
//   this.imageCompress.uploadFile().then(({image, orientation}) => {
  
    
//     console.warn('Size in bytes was:', this.imageCompress.byteCount(image));
    
//     this.imageCompress.compressFile(image, orientation, 50, 50).then(
//       result => {
//         this.imgResultAfterCompress = result;
//         console.warn('Size in bytes is now:', this.imageCompress.byteCount(result));
//       }
//     );
    
//   });
// }
}
