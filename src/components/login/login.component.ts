import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/authService/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  isArabic: boolean = true;
  constructor(private _Router:Router,private _AuthService:AuthService)
  {

  }

  logInForm: FormGroup = new FormGroup({
    userName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[\d])(?=.*[!@#$%^&*()_+\-=\[\]{}|;':"\\,.<>\/?]).{6,20}$/)]),
  });

  handleForm(): void {
    console.log(this.logInForm.value)
    if (this.logInForm.valid) {
      
      this._AuthService.setLogIn(this.logInForm.value).subscribe({
        
        next: (response) => {
          
     
          if (response.isPass === true) {
            localStorage.setItem('Token', response.message.token);
            this._AuthService.decodeUserData();
            this._Router.navigate(['/home']);
         
          }
        },
        error: (err) => {
       
          console.log('Login failed:', err.error);
        }
      });
    } 
  }


}