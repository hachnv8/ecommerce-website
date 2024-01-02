import { Injectable, inject } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateFn,
  Router,
} from "@angular/router";
import { AuthenticationService } from "../core/services/auth.service";

@Injectable({ providedIn: "root" })
class PermissionsService {
  private isAdmin: boolean;
  constructor(private authenticationService: AuthenticationService, private router: Router) {
    this.isAdmin = this.authenticationService.currentUser().role === 'ADMIN';
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!this.isAdmin) {
      this.router.navigate(['pages/403']);
    }
    return true;
  }
}

export const AuthAdminGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean => {
  return inject(PermissionsService).canActivate(next, state);
};
