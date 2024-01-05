import { Component, OnInit, AfterViewInit } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";

@Component({
  selector: "app-passwordreset",
  templateUrl: "./passwordreset.component.html",
  styleUrls: ["./passwordreset.component.scss"],
})

export class PasswordresetComponent implements OnInit, AfterViewInit {
  resetForm: UntypedFormGroup;
  submitted: boolean = false;
  error: string = "";
  success: string = "";
  loading: boolean = false;

  year: number = new Date().getFullYear();

  constructor(
    private formBuilder: UntypedFormBuilder  ) {}

  ngOnInit() {
    this.resetForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
    });
  }

  ngAfterViewInit() {}

  get f() {
    return this.resetForm.controls;
  }

  onSubmit() {
    this.success = "";
    this.submitted = true;

    if (this.resetForm.invalid) {
      return;
    }
  }
}
