import { HttpClient, HttpEvent } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpServiceService } from '../services/http-service.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginObj:any={
    user:"",
    pass:""
  };
  token=false;
  http:HttpServiceService=inject(HttpServiceService);
  router=inject(Router);
  onLogin(){
    this.http.postReq(this.loginObj,"login").subscribe((data:any)=>{
      console.log(data);
      if(data.bool==true){
        this.token=true;
        localStorage.setItem("token",data.token);
        localStorage.setItem("refresh",data.refresh);
        //document.cookie=`token=${data.token}`;
        this.router.navigate([`/dashboard/${data.userid}`]);
      }
      else{
        alert("Invalid credentials");
      }
    })
  }
 }
 