import { Injectable, inject } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateFn,
} from "@angular/router";

// Auth Services
import { AuthenticationService } from "../services/auth.service";

@Injectable({ providedIn: "root" })
class PermissionsService {
  constructor(
    private authenticationService: AuthenticationService  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const currentUser = this.authenticationService.currentUser();
    if (currentUser) {
      // logged in so return true
      return true;
    }
    return false;
  }
}

export const AuthGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean => {
  return inject(PermissionsService).canActivate(next, state);
};
