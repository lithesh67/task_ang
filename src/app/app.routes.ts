import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CourseDetailsComponent } from './course-details/course-details.component';

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
    },
    {
        path:'dashboard/:id',
        component:DashboardComponent,
    },
    {
        path:'dashboard/:id/courseDetails/:course_id',
        component:CourseDetailsComponent
    }
];
