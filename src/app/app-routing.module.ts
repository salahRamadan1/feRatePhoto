import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {path:'' ,redirectTo:'home' ,pathMatch:'full'},
  {path:'register' , component:RegisterComponent},
  {path:'login' , component:LoginComponent},
  {path:'home' , component:HomeComponent},
  {path:'profile' , component:ProfileComponent},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
