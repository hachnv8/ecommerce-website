import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "src/app/auth/auth.service";
import { LocalStoreService } from "../services/local-storage.service";

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(private localService: LocalStoreService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.localService.token;
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    if (
      !request.headers.has("Content-Type") &&
      !request.headers.has("No-Content-Type")
    ) {
      request = request.clone({
        headers: request.headers.set("Content-Type", "application/json"),
      });
    }
    return next.handle(request);
  }
}
