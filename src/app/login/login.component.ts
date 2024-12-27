import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginObj:any={
    user:"",
    pass:""
  };
  token=false;
  http=inject(HttpClient);
  onLogin(){
    this.http.post("http://localhost:5000/login",this.loginObj,{withCredentials:true}).subscribe((data:any)=>{
      console.log(data);
      if(data.bool==true){
        this.token=true;
        localStorage.setItem("token",data.token);
        //document.cookie=`token=${data.token}`;
      }
      else{
        alert("Invalid credentials");
      }
      
    });
  }

  onLogout(){
    this.http.get("http://localhost:5000/logout").subscribe((data:any)=>{
      console.log(data);
      if (data.bool==false){
        alert(data.message);
      }
      this.token=false;
      this.loginObj.user="";
      this.loginObj.pass="";
      localStorage.removeItem("token");
      document.cookie = 'token=""; max-age=0; path=/; secure; SameSite=Strict';

    });
  }


}
 