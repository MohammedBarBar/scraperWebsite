import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { AboutComponent } from './Components/about/about.component';
import { HomeComponent } from './Components/home/home.component';
import { ContactComponent } from './Components/contact/contact.component';
import { JobSingleComponent } from './Components/job-single/job-single.component';
import { FaqComponent } from './Components/faq/faq.component';
import { PostJobComponent } from './Components/post-job/post-job.component';
import { RegisterComponent } from './Components/register/register.component';
import { Home2Component } from './Components/home2/home2.component';
import { ProfileComponent } from './Components/profile/profile.component';



const routes: Routes = [
  {path: 'Login',component: LoginComponent},
  {path: 'SignUp',component: RegisterComponent},
  {path: 'Home',component: HomeComponent},
  {path: 'Home2',component: Home2Component},
  {path: 'About',component: AboutComponent},
  {path: 'Contact',component: ContactComponent},
  {path: 'Profile',component: ProfileComponent},
  {path: 'Job-single',component: JobSingleComponent},
  {path: 'Faq',component: FaqComponent},
  {path: 'Post-Ads',component: PostJobComponent},
  {path: '#',component: HomeComponent},
  {path: '',component: HomeComponent},
  {path: '**',redirectTo: ''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
