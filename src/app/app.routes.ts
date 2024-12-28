import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';

export const routes: Routes = [
    {
        path:'login',
        component:LoginComponent
    },
    {
       path:'',
       redirectTo:'/login',
       pathMatch:'full'
    },
    {
        path:'register',
        component:SignupComponent
    }
];
