import { Injectable } from "@angular/core";
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { AuthService } from "src/app/auth/auth.service";
import { LocalStoreService } from "../services/local-storage.service";
import { ToastrService } from "ngx-toastr";

@Injectable({ providedIn: "root" })
export class AuthGuard {
  constructor(
    private router: Router,
    private localService: LocalStoreService,
    private toastr: ToastrService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const accessToken = this.localService.token;
    if (!accessToken) {
      this.router.navigate(["/auth/login"], {
        queryParams: { returnUrl: state.url },
      });
      this.toastr.warning("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại.");
      return false;
    }
    const expiresAt = new Date(accessToken.split("|")[1]);
    if (new Date() > expiresAt) {
      this.router.navigate(["/auth/login"], {
        queryParams: { returnUrl: state.url },
      });
      this.toastr.warning("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại.");
      return false;
    }
    return true;
  }
}
