import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink,Router} from '@angular/router';
import { HttpServiceService } from '../services/http-service.service';
import { CommonModule } from '@angular/common';
import { password_validator } from '../shared/validators/password_validator.validations';

@Component({
  selector: 'app-signup',
  imports: [RouterLink,FormsModule,ReactiveFormsModule,CommonModule],
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
   constructor(){

   }
  signup_form =new FormGroup({
  username:new FormControl('',[Validators.required]),
  email:new FormControl('',[Validators.required,Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)]),
  password:new FormControl('',[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{6,15}$/)]),
  cpass:new FormControl('',[Validators.required])},
  { validators: [password_validator] }
);
 
   onSubmit(){
     this.http.postReq(this.signup_form.value,"register").subscribe((data:any)=>{
      console.log(data);
     
      
      if (data.bool==true){
         alert("User registered successfully");
         this.router.navigate(['/login']);
      } 
      else{
        alert("User already exists");
      }
     })
   }


} 
