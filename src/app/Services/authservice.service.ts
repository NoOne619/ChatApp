import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  constructor() { }

  isLoggedIn(): boolean {
    // Replace this with actual authentication check
    return !!localStorage.getItem('sender'); // For example, checking if a user is in local storage
  }

  login(user: any) {
    localStorage.setItem('sender', JSON.stringify(user));

  }

  logout() {
    localStorage.removeItem('sender');
    console.log('removed');
    
  }
}
