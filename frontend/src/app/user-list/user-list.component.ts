import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { User } from "../users/interfaces/user.interface";
import { UserService } from "../users/services/user.service";
@Component({
  selector: "app-user-list",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./user-list.component.html",
})
export class UserListComponent {
  users: User[] = [];

  constructor(private userService: UserService) {}
  ngOnInit() {
    this.userService.getAllUsers().subscribe({
      next: (data) => (this.users = data),
      error: (err) => console.error("Erreur API:", err),
    });
  }
}
