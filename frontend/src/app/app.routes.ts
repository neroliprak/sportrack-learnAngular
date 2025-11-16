import { Routes } from "@angular/router";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";
import { HomeComponent } from "./home/home.component";
import { ExercisesComponent } from "./exercises/exercises.component";
import { ExerciseDetailComponent } from "./exercise-detail/exercise-detail.component";
import { UserListComponent } from "./user-list/user-list.component";

export const routes: Routes = [
  // Redirection par défaut vers la page de login
  //   {
  //     path: '',
  //     redirectTo: 'login',
  //     pathMatch: 'full',
  //   },
  {
    path: "",
    component: HomeComponent,
    title: "Home",
  },
  {
    path: "login",
    component: LoginComponent,
    title: "Login",
  },
  {
    path: "register",
    component: RegisterComponent,
    title: "Register",
  },
  {
    path: "exercises",
    component: ExercisesComponent,
    title: "Exercises",
  },
  {
    path: "exercises/:id",
    component: ExerciseDetailComponent,
    title: "Exercise Detail",
  },
  {
    path: "users",
    component: UserListComponent,
    title: "User List",
  },
];
