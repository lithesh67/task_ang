import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {
  
  constructor() { }
  http=inject(HttpClient);
  postReq(obj:any,url:string){
     return this.http.post(`http://localhost:5000/${url}`,obj, {withCredentials:true});
  }

  getReq(url:string){
    return this.http.get("http://localhost:5000/"+url,{withCredentials:true});
  }
}
