import { Component, OnInit } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { AuthService } from "../auth.service";
import { first } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent implements OnInit {
  signupForm: UntypedFormGroup;
  submitted: boolean = false;
  error: any = "";
  successmsg: boolean = false;

  year: number = new Date().getFullYear();

  constructor(
    private formBuilder: UntypedFormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      username: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
    });
  }

  get f() {
    return this.signupForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.signupForm.invalid) {
      return;
    } else {
      this.authService
        .register(this.signupForm.value)
        .pipe(first())
        .subscribe({
          next: (data) => {
            this.successmsg = true;
            if (this.successmsg) {
              this.router.navigate(["/auth/login"]);
            }
          },
          error: (error) => {
            this.error = error ? error : "Register failed";
          },
        });
    }
  }
}
