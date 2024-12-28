import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
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
  onLogin(){
    this.http.postReq(this.loginObj,"login").subscribe((data:any)=>{
      console.log(data);
      if(data.bool==true){
        this.token=true;
        localStorage.setItem("token",data.token);
        //document.cookie=`token=${data.token}`;
      }
    })
  }
  onLogout(){
    this.http.getReq("logout").subscribe((data:any)=>{
      console.log(data);
      if(data.bool==false){
        alert("Wrong Credentials");
      }
      this.token=false;
      localStorage.removeItem("token");
      this.loginObj.user="";
      this.loginObj.pass="";
    })
  }
 }
 