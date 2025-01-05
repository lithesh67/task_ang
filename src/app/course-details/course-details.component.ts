import { Component, inject, OnInit } from '@angular/core';
import { HttpServiceService } from '../services/http-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-details',
  imports: [],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css'
})
export class CourseDetailsComponent implements OnInit{
  http=inject(HttpServiceService);
  r_params=inject(ActivatedRoute);
  course_id:string="";
  userid:string="";
  video_url:string="";
  ngOnInit(): void {
     this.r_params.paramMap.subscribe((params)=>{
      this.course_id=params.get('course_id')!;
      this.userid=params.get('id')!;
     })
     this.http.getReq(`dashboard/${this.userid}/courseDetails/${this.course_id}`).subscribe((resp:any)=>{
        if(resp.result.length>0){

          this.video_url=resp.result[0]?.file_path;
        }
        else{
          alert("some error occoured");
        }
        console.log(resp.result);
        
     });
  }
}
