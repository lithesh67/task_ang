import { Component, inject, OnInit } from '@angular/core';
import { HttpServiceService } from '../services/http-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  imports: [FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})



export class DashboardComponent implements OnInit {
  files:File[]=[];
  imgsrc:any;
  courseList:any=[];
  formObj:any={
    course_name: "",
    duration:"",
    instructor:"",
    desc:"",
    userid:""
  }
  http=inject(HttpServiceService);
  router=inject(Router);
  r_params=inject(ActivatedRoute);
  loading:boolean=true;
  
  ngOnInit(): void {
    this.r_params.paramMap.subscribe((params)=>{
      this.formObj.userid=params.get('id');
    });
    this.http.getReq(`dashboard/${this.formObj.userid}`).subscribe((data:any)=>{
      if(data.bool==false){
         alert("Please login to access the dashboard");
         this.router.navigate(['/login']);
      }
      else{
        this.loading=false;
      }
    });
    this.http.getReq(`getCourseList/${this.formObj.userid}`).subscribe((resp:any)=>{
      console.log(resp.courseList);
      this.courseList=resp.courseList;
      
    })
  }

  selectFiles(event:Event){
    const input=event.target as HTMLInputElement;
    if(input.files){
      for(let i=0;i<input.files.length;i++){
        this.files.push(input.files[i]);
      }
    }
   }
   
  onSubmit(){
    const formData=new FormData; 
    formData.append("data",JSON.stringify(this.formObj));
    this.files.forEach((file)=>{
       formData.append('files',file);
    });
    this.http.postReq(formData,'createCourse').subscribe((resp:any)=>{
      console.log(resp.message);
    });
  }

  




  onLogout(){
    this.http.getReq('logout').subscribe((data:any)=>{
      console.log(data);
      if(data.bool==true){
          alert("Logged out successfully");
      }
      else{
        alert("Session has already expired");
      }
      localStorage.removeItem("token");
      this.router.navigate(['/login']);
    });
  }

}
