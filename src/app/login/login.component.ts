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
    this.http.post("http://localhost:5000/login",this.loginObj).subscribe((data:any)=>{
      console.log(data);
      if(data.bool==true){
        this.token=true;
      }
      else{
        alert("Invalid credentials");
      }
      
    });
  }

  onLogout(){
    this.token=false;
  }


}
