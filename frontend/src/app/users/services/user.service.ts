import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../interfaces/user.interface";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    const url = "http://localhost:5001/api/users";
    return this.http.get<User[]>(url);
  }

  deleteUser(userId: number): Observable<void> {
    const url = `http://localhost:5001/api/users/${userId}`;
    return this.http.delete<void>(url);
  }
}
