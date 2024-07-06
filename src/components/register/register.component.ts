import { Component } from '@angular/core';
import { AuthService } from '../../Services/authService/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormControlOptions, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { routes } from '../../app/app.routes';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  userData: any = {
    userName: '',
    password: '',
    email: '',
    accountType: 'Admin'
  };
constructor(private _AuthService: AuthService, private _Router: Router,)
{

}
registerForm: FormGroup = new FormGroup({
  userName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
  email: new FormControl('', [Validators.required, Validators.email]),
  // confirmEmail: new FormControl('', [Validators.required, Validators.email]),
  password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[\d])(?=.*[!@#$%^&*()_+\-=\[\]{}|;':"\\,.<>\/?]).{6,20}$/)]),
  rePassword: new FormControl(''),
  accountType: new FormControl('Admin')
}, { validators: [this.confirmPassword, this.confirmEmail] } as FormControlOptions);

  confirmPassword(group: FormGroup): void {
    const password = group.get('password');
    const rePassword = group.get('rePassword');
    if (rePassword?.value == null || rePassword?.value == '') {
      rePassword?.setErrors({ required: true })
    }
    else if (password?.value != rePassword?.value) {
      rePassword?.setErrors({ mismatch: true })
    }
  }



  confirmEmail(group: FormGroup): void {
    let email = group.get('email');
    let confirmEmail = group.get('confirmEmail');
    if (confirmEmail?.value == ' ') {
      confirmEmail?.setErrors({ required: true });
    }
    else if (email?.value != confirmEmail?.value) {
      confirmEmail?.setErrors({ mismatch: true });
    }
  }

  handleForm(): void {
    if (this.registerForm.valid) {
   
     
      console.log(this.registerForm.value);

      this._AuthService.setRegister(this.registerForm.value).subscribe({
        next: (response) => {
          console.log(response)
        
          if (response.isPass == true) {
console.log("registered");
this._Router.navigate(['/login']);
          
          }

        },
        error: (err) => {
    
         console.log(err.error)
        }
      });

    }

   
  }

}
