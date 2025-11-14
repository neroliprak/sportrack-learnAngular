import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NavbarComponent } from "../../navbar/navbar.component";
import { RouterLink } from "@angular/router";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { BaseAuthComponent } from "../base-auth/base-auth.component";

@Component({
  selector: "app-login",
  imports: [NavbarComponent, CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css", "../base-auth/base-auth.component.css"],
})
export class LoginComponent extends BaseAuthComponent {
  constructor() {
    super();
  }
  // login form group (contain mdp and email)
  loginForm: FormGroup = this.createBaseFormGroup();

  submitLoginForm() {
    this.consoleLogForm(this.loginForm);
  }
}
