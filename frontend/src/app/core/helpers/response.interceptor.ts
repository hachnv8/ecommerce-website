import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { AuthService } from "src/app/auth/auth.service";

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        if ([401].includes(error.status)) {
          this.authService.logout();
        } else {
          return throwError(() => error);
        }
      })
    );
  }
}
