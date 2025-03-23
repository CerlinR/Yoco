// // import { CommonModule } from '@angular/common';
// // import { Component } from '@angular/core';
// // import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// // import { Router } from '@angular/router';
// // import { isPlatformBrowser } from '@angular/common';


// // @Component({
// //   selector: 'app-login',
// //   standalone: true,
// //   imports: [CommonModule, ReactiveFormsModule, ],
// //   templateUrl: './login.component.html',
// //   styleUrl: './login.component.scss'
// // })
// // export class LoginComponent {
// //   loginForm: FormGroup;

// //   constructor(private fb: FormBuilder, private router: Router) {
// //     this.loginForm = this.fb.group({
// //       username: ['', Validators.required],
// //       password: ['', [Validators.required, Validators.minLength(6)]]
// //     });
// //   }

// //   // onSubmit() {
// //   //   if (this.loginForm.valid) {
// //   //     console.log('User Logged In:', this.loginForm.value);
// //   //     this.router.navigate(['/login']);
// //   //   }
// //   // }

// //   onSubmit() {
// //     if (this.loginForm.valid) {
// //       const username = this.loginForm.value.username;
// //       // sessionStorage.setItem('username', username); // Store username in session
// //       sessionStorage.setItem('username', 'JohnDoe');

// //       this.router.navigate(['/home']); // Redirect to home page
// //     }
// //   }
// // }

// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { HttpClient, HttpClientModule } from '@angular/common/http';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-login',
//   imports:[ReactiveFormsModule, HttpClientModule, CommonModule],
//   standalone: true,
//   template: `
//     <div class="login-container">
//       <h2>Login</h2>
//       <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
//         <div class="form-group">
//           <label for="username">Username</label>
//           <input id="username" formControlName="username" type="text" placeholder="Enter Username" />
//           <div class="error" *ngIf="loginForm.get('username')?.invalid && loginForm.get('username')?.touched">
//             Username is required
//           </div>
//         </div>
        
//         <div class="form-group">
//           <label for="password">Password</label>
//           <input id="password" formControlName="password" type="password" placeholder="Enter Password" />
//           <div class="error" *ngIf="loginForm.get('password')?.invalid && loginForm.get('password')?.touched">
//             Password is required
//           </div>
//         </div>
        
//         <button type="submit" [disabled]="loginForm.invalid">Login</button>
//       </form>
//     </div>
//   `,
//   styles: [`
//     .login-container {
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
// export class LoginComponent {
//   loginForm: FormGroup;

//   constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {
//     this.loginForm = this.fb.group({
//       username: ['', [Validators.required]],
//       password: ['', [Validators.required]]
//     });
//   }

//   onSubmit() {
//     if (this.loginForm.valid) {
//       const { username, password } = this.loginForm.value;

//       // Check if the username and password match any user in the database
//       this.http.get<any[]>(`http://localhost:3000/users?username=${username}&password=${password}`).subscribe(users => {
//         if (users.length > 0) {
//           alert('Login Successful!');
//           this.router.navigate(['/home']); // Redirect to home or dashboard
//         } else {
//           alert('Invalid credentials');
//         }
//       });
//     }
//   }
// login.component.ts
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

@Component({
    selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
  })
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLogin() {  // ✅ Ensure this method exists
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      if (this.authService.login(username, password)) {
        alert('Login successful!');
        this.router.navigate(['user/home']); 
      } else {
        alert('Invalid credentials. Please try again.');
      }
    }
  }

  register(){
    this.router.navigate(['user/register']); 

  }
}
