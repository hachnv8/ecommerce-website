import { Component, OnInit } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";

import { ActivatedRoute, Router } from "@angular/router";
import { first } from "rxjs/operators";
import { AuthService } from "../auth.service";
import { UserToken } from "../auth.models";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginForm: UntypedFormGroup;
  submitted: boolean = false;
  error: string = "";
  returnUrl: string;

  year: number = new Date().getFullYear();

  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ["vanhach2@gmail.com", [Validators.required, Validators.email]],
      password: ["123456", [Validators.required]],
    });

    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    } else {
      this.authService
        .login(this.f.email.value, this.f.password.value)
        .pipe(first())
        .subscribe({
          next: (userToken: UserToken) => {
            const user = userToken.user;
            localStorage.setItem('user', JSON.stringify(user));
              localStorage.setItem('token', userToken.token);
              if (user.role === 'ADMIN') {
                this.router.navigate(['/admin']);
              } else {
                this.router.navigate(['/']);
              }
          },
          error: (error) => {
            this.error = error || "Login failed";
          },
        });
    }
  }
}
