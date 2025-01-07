import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function password_validator(group:AbstractControl):ValidationErrors | null{
   const pass=group.get('password')?.value;
   const cpass=group.get('cpass')?.value
   if (!pass || !cpass){
    return null;
   }
   return pass===cpass? null : {invalid:true};
}