import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { User } from "../users/interfaces/user.interface";
import { UserService } from "../users/services/user.service";
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: "app-user-list",
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.css"],
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

  onDeleteUser(userId: number) {
    this.userService.deleteUser(userId).subscribe({
      next: () => {
        this.users = this.users.filter((user) => user.id !== userId);
        console.log("okay", userId);
      },
      error: (err: any) => console.error("Erreur de suppression", err),
    });
  }
}
