import { Injectable, Inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, exhaustMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { login, loginSuccess, logout, logoutSuccess, Register, RegisterSuccess } from './authentication.actions';
import { Router } from '@angular/router';
import { UserProfileService } from 'src/app/core/services/user.service';
import { UserToken } from './auth.models';
import { AuthenticationService } from 'src/app/core/services/auth.service';

@Injectable()
export class AuthenticationEffects {

  Register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(Register),
      exhaustMap(({ email, username, password }) => {
        return this.AuthenticationService.register({ email, username, password }).pipe(
          map((userToken: UserToken) => {
            this.router.navigate(['/auth/login']);
            return RegisterSuccess({ userToken })
          })
        )
      })
    )
  );



  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      exhaustMap(({ email, password }) => {
        return this.AuthenticationService.login(email, password).pipe(
          map((userToken: UserToken) => {
            if(userToken) {
              localStorage.setItem('user', JSON.stringify(userToken.user));
              localStorage.setItem('token', userToken.token);
              this.router.navigate(['/']);
          }
          return loginSuccess({ userToken });
        }))
      })
    )
  );


  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logout),
      tap(() => {
        // Perform any necessary cleanup or side effects before logging out
      }),
      exhaustMap(() => of(logoutSuccess()))
    )
  );

  constructor(
    @Inject(Actions) private actions$: Actions,
    private AuthenticationService: AuthenticationService,
    private userService: UserProfileService,
    private router: Router) { }

}