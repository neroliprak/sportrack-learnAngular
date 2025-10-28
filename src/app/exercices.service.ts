import { Injectable } from "@angular/core";
import { IExercise } from "./iexercise";

@Injectable({
  providedIn: "root",
})
export class ExercicesService {
  exercises: IExercise[] = [
    {
      id: 1,
      name: "Push-ups",
      description: "An exercise for upper body strength.",
    },
    {
      id: 2,
      name: "Squats",
      description: "An exercise for lower body strength.",
    },
    { id: 3, name: "Plank", description: "An exercise for core strength." },
  ];
  constructor() {}

  getAllExercises(): IExercise[] {
    return this.exercises;
  }

  getExerciseById(id: number): IExercise | undefined {
    return this.exercises.find((exercise) => exercise.id === id);
  }
}
