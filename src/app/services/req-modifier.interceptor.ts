import { HttpInterceptorFn } from '@angular/common/http';

export const reqModifierInterceptor: HttpInterceptorFn = (req, next) => {
  const token=localStorage.getItem("token");
  console.log(token);
  const newReq=req.clone({
    setHeaders:{
      Authorization:`Bearer ${token}`
    }
  });
  return next(newReq);
};
