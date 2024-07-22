import { CanActivateFn, Router } from '@angular/router';

import { AuthServiceService } from './auth-service.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  let auth = inject(AuthServiceService);
  if (auth.isLoggedIn()) {
    return true;
  } else {
    inject(Router).navigate(['/login']);
    return false;
  }
};
