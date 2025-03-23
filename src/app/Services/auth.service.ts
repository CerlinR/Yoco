import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usersUrl = 'assets/users.json'; 

  constructor(private http: HttpClient) {}

  // Fetch all users 
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.usersUrl).pipe(
      catchError(error => {
        console.error('Error fetching users', error);
        return throwError(() => new Error('Failed to fetch users'));
      })
    );
  }

  // Register User (Saving in LocalStorage as we can't write to JSON directly)
  register(user: any): boolean {
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.some((u: any) => u.username === user.username)) {
      return false; 
    }
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    return true;
  }

  // Login User
  login(username: string, password: string): boolean {
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    return users.some((u: any) => u.username === username && u.password === password);
  }
}
