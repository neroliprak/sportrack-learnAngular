import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { IExercise } from "../iexercise";
import { ExercicesService } from "../exercices.service";

@Component({
  selector: "app-exercises",
  imports: [CommonModule, RouterModule],
  templateUrl: "./exercises.component.html",
  styleUrl: "./exercises.component.css",
})
export class ExercisesComponent {
  exercises: IExercise[] = [];

  constructor(private ExercicesService: ExercicesService) {
    this.exercises = this.ExercicesService.getAllExercises();
  }
}
