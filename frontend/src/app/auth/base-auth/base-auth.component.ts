import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-base-auth",
  imports: [],
  templateUrl: "./base-auth.component.html",
  styleUrl: "./base-auth.component.css",
})
export abstract class BaseAuthComponent {
  // password visibility
  hidePassword = true;
  togglePasswordVisibility(e: Event) {
    e.preventDefault();
    this.hidePassword = !this.hidePassword;
  }

  // create base form group
  createBaseFormGroup(): FormGroup {
    return new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  // testing form validity
  consoleLogForm(form: FormGroup) {
    if (form.valid) {
      console.log(form.value);
    } else {
      console.log("form is invalid");
    }
  }
}
