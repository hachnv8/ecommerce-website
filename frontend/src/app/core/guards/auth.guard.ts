import { Injectable } from "@angular/core";
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { AuthService } from "src/app/auth/auth.service";
import { LocalStoreService } from "../services/local-storage.service";

@Injectable({ providedIn: "root" })
export class AuthGuard {
  constructor(
    private router: Router,
    private localService: LocalStoreService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const accessToken = this.localService.getToken;
    if (accessToken) {
      return true;
    }
    this.router.navigate(["/auth/login"], {
      queryParams: { returnUrl: state.url },
    });
    return false;
  }
}
