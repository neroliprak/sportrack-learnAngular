import { Component } from "@angular/core";
import { BaseAuthComponent } from "../base-auth/base-auth.component";
import { NavbarComponent } from "../../navbar/navbar.component";
import { CommonModule } from "@angular/common";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-register",
  standalone: true,
  imports: [NavbarComponent, CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: "./register.component.html",
  styleUrls: [
    "./register.component.css",
    "../base-auth/base-auth.component.css",
  ],
})
export class RegisterComponent extends BaseAuthComponent {
  registerForm: FormGroup;

  constructor() {
    super();
    this.registerForm = this.createBaseFormGroup();
    this.registerForm.addControl(
      "username",
      new FormControl("", Validators.required)
    );
  }

  submitRegisterForm() {
    this.consoleLogForm(this.registerForm);
  }
}
