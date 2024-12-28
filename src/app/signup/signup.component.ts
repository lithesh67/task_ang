import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink,Router} from '@angular/router';
import { HttpServiceService } from '../services/http-service.service';

@Component({
  selector: 'app-signup',
  imports: [RouterLink,FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
   registerObj:any={
    user:"",
    pass:"",
    email:""
   }
   router:Router=inject(Router);
   http:HttpServiceService=inject(HttpServiceService);
   onSubmit(){
     this.http.postReq(this.registerObj,"register").subscribe((data:any)=>{
      console.log(data);
      if (data.bool==true){
         this.router.navigate(['/login']);
      }
      else{
        alert("User already exists");
      }
     })
   }
}
