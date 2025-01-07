import { Component, inject, OnInit } from '@angular/core';
import { HttpServiceService } from '../services/http-service.service';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})



export class DashboardComponent implements OnInit {
  files:File[]=[];
  courseList:any=[];
  course_form:FormGroup;
  userid:string="";
  constructor(){
    this.course_form=new FormGroup({
        course_name:new FormControl('',[Validators.required]),
        duration:new FormControl('',[Validators.required]),
        instructor: new FormControl('',[Validators.required]),
        desc:new FormControl('',Validators.required),
        image:new FormControl('',Validators.required),
        docs:new FormControl('',Validators.required),
        video:new FormControl('',Validators.required)
    });
  }
  http=inject(HttpServiceService);
  router=inject(Router);
  r_params=inject(ActivatedRoute);
  loading:boolean=true;
  
  ngOnInit(): void {
    this.r_params.paramMap.subscribe((params)=>{
      this.userid=params.get('id')!;
    });
    this.http.getReq(`dashboard/${this.userid}`).subscribe((data:any)=>{
      if(data.bool==false){
         alert("Please login to access the dashboard");
         this.router.navigate(['/login']);
      }
      else{
        this.loading=false;
      }
    });
    this.http.getReq(`getCourseList/${this.userid}`).subscribe((resp:any)=>{
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
    this.course_form.value.userid=this.userid;
    formData.append("data",JSON.stringify(this.course_form.value));
    this.files.forEach((file)=>{
       formData.append('files',file);
    });
    this.http.postReq(formData,'createCourse').subscribe((resp:any)=>{
      if (resp.bool==true){
        alert("Course created successfully");
        this.course_form.reset();
      }
      else{
        alert("some error has occoured");
      }
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

  errors(control_name:string):boolean{
    const control=this.course_form.get(control_name);
    if(control?.errors?.['required'] && control?.touched){
      return true;
    }
    return false;
  }

  go_to_course(course_id:number){
     this.router.navigateByUrl(`dashboard/${this.userid}/courseDetails/${course_id}`);
  }

}
