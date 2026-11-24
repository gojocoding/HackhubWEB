
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {

  const token = sessionStorage.getItem('token');
  const router = inject(Router);

  if (!token) {
    return router.createUrlTree(['/login']);
  }

  try {
    const payload = token.split('.')[1];
    const decodedPayload = JSON.parse(atob(payload));

    const expirationDate = decodedPayload.exp * 1000;

    if (Date.now() >= expirationDate) {
      sessionStorage.removeItem('token');
      return router.createUrlTree(['/login']);
    }

    return true;

  } catch {
    sessionStorage.removeItem('token');
    return router.createUrlTree(['/login']);
  }
};
