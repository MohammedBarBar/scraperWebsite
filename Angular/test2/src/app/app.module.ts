import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { AboutComponent } from './Components/about/about.component';
import { ContactComponent } from './Components/contact/contact.component';
import { FaqComponent } from './Components/faq/faq.component';
import { LoginComponent } from './Components/login/login.component';
import { PostJobComponent } from './Components/post-job/post-job.component';
import { JobSingleComponent } from './Components/job-single/job-single.component';
import { NavbarComponent } from './Shared/navbar/navbar.component';
import { FooterComponent } from './Shared/footer/footer.component';
import { SiteMobileMenuComponent } from './Shared/site-mobile-menu/site-mobile-menu.component';
import {HttpClientModule} from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import {FormsModule} from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import { RegisterComponent } from './Components/register/register.component';
import { Home2Component } from './Components/home2/home2.component';
import { ProfileComponent } from './Components/profile/profile.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
// import {NgxImageCompressService} from 'ngx-image-compress';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    FaqComponent,
    LoginComponent,
    PostJobComponent,
    JobSingleComponent,
    NavbarComponent,
    FooterComponent,
    SiteMobileMenuComponent,
    RegisterComponent,
    Home2Component,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    FormsModule,
    ModalModule.forRoot(),
    ToastrModule.forRoot({
      timeOut:2000,
      progressBar:true,
      progressAnimation:'increasing',
      preventDuplicates:true
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
// NgxImageCompressService
export class AppModule { }
