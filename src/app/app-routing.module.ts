import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { HomeComponent } from './home/home.component';
import { AddItemComponent } from './module/add-item/add-item.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ModuleDescriptionComponent } from './module-description/module-description.component';


const routes: Routes = [{
  path: 'login',
  component: LoginComponent
},
{
  path: 'registration',
  component: RegistrationComponent
},
{
  path: 'home',
  component: HomeComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent
    },
    {
      path: 'add-item',
      component: AddItemComponent
    },
    {
      path: 'module-description',
      component: ModuleDescriptionComponent
    }
  ]
},
{
  path: '', redirectTo: '/home', pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
