import { CanActivateFn } from '@angular/router';
import { AuthserviceService } from '../Services/authservice.service';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

export const authguardGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthserviceService);
  const router = inject(Router);

  console.log('Guard is called'); // Debugging log

  if (auth.isLoggedIn()) {
    console.log('User is logged in'); // Debugging log
    if (state.url === '/home' || state.url === '/') {
      console.log('Redirecting to /selecttosend'); // Debugging log
      router.navigate(['selecttosend'])
      return false;
    }
    return true;
  }

  console.log('User is not logged in'); // Debugging log
  if (state.url !== '/home' && state.url !== '/') {  //if the person is trying to go to other routes withoit login then 
                                                          //he shlould be rout to home and return false not to render that unacessible page
    console.log('Redirecting to /home'); // Debugging log
    router.navigate(['/home']);
    return false;
  }


  return true;
};
