import { Component, inject, OnInit } from '@angular/core';
import { HttpServiceService } from '../services/http-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  http=inject(HttpServiceService);
  router=inject(Router);

  loading:boolean=true;
  ngOnInit(): void {
    this.http.getReq('dashboard').subscribe((data:any)=>{
      if(data.bool==false){
         alert("Please login to access the dashboard");
         this.router.navigate(['/login']);
      }
      else{
        this.loading=false;
      }
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
