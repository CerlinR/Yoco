// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { CommonModule } from '@angular/common'; // Import CommonModule
// import { Router } from '@angular/router';
// import { HttpClient, HttpClientModule } from '@angular/common/http';

// @Component({
//   selector: 'app-register',
//   standalone: true,
//   imports: [ReactiveFormsModule, CommonModule,HttpClientModule],
//   templateUrl: './register.component.html',
//   styleUrl: './register.component.scss'
// })
// export class RegisterComponent {
//   // registerForm: FormGroup;

//   // constructor(private fb: FormBuilder) {
//   //   this.registerForm = this.fb.group({
//   //     username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
//   //     password: ['', [Validators.required, Validators.minLength(6)]]
//   //   });
//   // }

//   // onSubmit() {
//   //   if (this.registerForm.valid) {
//   //     console.log('User Registered:', this.registerForm.value);
//   //   }
//   // }

//   registerForm: FormGroup;

//   constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {
//     this.registerForm = this.fb.group({
//       username: ['', [Validators.required, Validators.minLength(3)]],
//       password: ['', [Validators.required, Validators.minLength(6)]]
//     });
//   }

//   onSubmit() {
//     if (this.registerForm.valid) {
//       const formData = this.registerForm.value;
//       this.http.get<any[]>('assets/data/users.json').subscribe(users => {
//         users.push(formData);
//         this.http.post('assets/data/users.json', users).subscribe(() => {
//           alert('Registration Successful!');
//           this.router.navigate(['/login']);
//         });
//       });
//     }
//   }
// }


// import { CommonModule } from '@angular/common';
// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-register',
//   imports:[ReactiveFormsModule, CommonModule],
//   standalone: true,
//   template: `
//     <div class="register-container">
//       <h2>Register</h2>
//       <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
//         <div class="form-group">
//           <label for="username">Username</label>
//           <input id="username" formControlName="username" type="text" placeholder="Enter Username" />
//           <div class="error" *ngIf="registerForm.get('username')?.invalid && registerForm.get('username')?.touched">
//             Username is required (min 3 characters)
//           </div>
//         </div>
        
//         <div class="form-group">
//           <label for="password">Password</label>
//           <input id="password" formControlName="password" type="password" placeholder="Enter Password" />
//           <div class="error" *ngIf="registerForm.get('password')?.invalid && registerForm.get('password')?.touched">
//             Password is required (min 6 characters)
//           </div>
//         </div>
        
//         <button type="submit" [disabled]="registerForm.invalid">Register</button>
//       </form>
//     </div>
//   `,
//   styles: [`
//     .register-container {
//       width: 350px;
//       margin: auto;
//       padding: 20px;
//       background: #f8f9fa;
//       border-radius: 8px;
//       box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
//       text-align: center;
//     }
//     h2 {
//       margin-bottom: 20px;
//       color: #333;
//     }
//     .form-group {
//       margin-bottom: 15px;
//       text-align: left;
//     }
//     .form-group label {
//       display: block;
//       font-weight: bold;
//     }
//     .form-group input {
//       width: 100%;
//       padding: 10px;
//       border: 1px solid #ccc;
//       border-radius: 5px;
//     }
//     .error {
//       color: red;
//       font-size: 12px;
//       margin-top: 5px;
//     }
//     button {
//       width: 100%;
//       padding: 10px;
//       background: #007bff;
//       color: white;
//       border: none;
//       border-radius: 5px;
//       cursor: pointer;
//       font-size: 16px;
//     }
//     button:disabled {
//       background: #ccc;
//     }
//   `]
// })
// export class RegisterComponent {
//   registerForm: FormGroup;

//   constructor(private fb: FormBuilder, private router: Router) {
//     this.registerForm = this.fb.group({
//       username: ['', [Validators.required, Validators.minLength(3)]],
//       password: ['', [Validators.required, Validators.minLength(6)]]
//     });
//   }

//   onSubmit() {
//     if (this.registerForm.valid) {
//       const formData = this.registerForm.value;

//       // Get existing users from local storage or initialize an empty array
//       const users = JSON.parse(localStorage.getItem('users') || '[]');

//       // Add new user
//       users.push(formData);

//       // Save updated users array back to local storage
//       localStorage.setItem('users', JSON.stringify(users));

//       alert('Registration Successful!');
//       this.router.navigate(['/login']);
//     }
//   }
// }

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,HttpClientModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router // ✅ Inject Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { username, password } = this.registerForm.value;

      if (this.authService.register({ username, password })) {
        alert('Registration successful! Redirecting to login...');
        this.router.navigate(['user/login']); 
      } else {
        alert('Username already exists. Try another.');
      }
    }
  }

  login(){
    this.router.navigate(['user/login']); 
  }
}
