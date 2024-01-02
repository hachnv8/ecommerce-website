import { Component, OnInit } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";

import { Store } from "@ngrx/store";
import { login } from "src/app/store/Authentication/authentication.actions";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})

/**
 * Login component
 */
export class LoginComponent implements OnInit {
  loginForm: UntypedFormGroup;
  submitted: any = false;
  error: any = "";
  returnUrl: string;
  fieldTextType!: boolean;

  // set the currenr year
  year: number = new Date().getFullYear();

  constructor(
    private formBuilder: UntypedFormBuilder,
    private store: Store
  ) {}

  ngOnInit() {
    // form validation
    this.loginForm = this.formBuilder.group({
      email: ["vanhach@gmail.com", [Validators.required, Validators.email]],
      password: ["123456", [Validators.required]],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  /**
   * Form submit
   */
  onSubmit() {
    this.submitted = true;

    const email = this.f["email"].value; // Get the username from the form
    const password = this.f["password"].value; // Get the password from the form

    // Login Api
    this.store.dispatch(login({ email: email, password: password }));
  }

  /**
   * Password Hide/Show
   */
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}
