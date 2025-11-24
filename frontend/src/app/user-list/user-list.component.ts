import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { User } from "../users/interfaces/user.interface";
import { UserService } from "../users/services/user.service";
import { NavbarComponent } from "../navbar/navbar.component";
import { SearchbarComponent } from "../components/searchbar/searchbar.component";

@Component({
  selector: "app-user-list",
  standalone: true,
  imports: [CommonModule, NavbarComponent, SearchbarComponent],
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.css"],
})
export class UserListComponent {
  users: User[] = [];
  messageError: string | null = null;
  orderAsc: boolean = true;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getAllUsers().subscribe({
      next: (data) => (this.users = data),
      error: (err) => (this.messageError = err.message),
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

  sortBy(sort: keyof User) {
    this.users.sort((a, b) => {
      const valueA = String(a[sort]).toLowerCase();
      const valueB = String(b[sort]).toLowerCase();

      if (this.orderAsc) {
        return valueA.localeCompare(valueB);
      }
      return valueB.localeCompare(valueA);
    });

    this.orderAsc = !this.orderAsc;
  }
}
