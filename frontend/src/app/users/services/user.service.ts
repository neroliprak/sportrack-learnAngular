import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, catchError, throwError } from "rxjs";
import { User } from "../interfaces/user.interface";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    const url = "http://localhost:5001/api/users";
    return this.http.get<User[]>(url).pipe(
      catchError((error: HttpErrorResponse) => {
        let message = "Une erreur est survenue mais je ne sais pas quoi 🙈​";
        if (error.status === 404) {
          message = "Aucun utilisateur trouvé";
        } else if (error.status === 500) {
          message = "Erreur interne du serveur";
        }
        return throwError(() => new Error(message));

        // Autre méthode ?
        // switch (error.status) {
        //   case 404:
        //     return throwError(() => new Error("Aucun utilisateur trouvé"));
        //   case 500:
        //     return throwError(() => new Error("Erreur interne du serveur"));
        //   default:
        //     return throwError(
        //       () =>
        //         new Error(
        //           "Une erreur est survenue mais je ne sais pas quoi 🙈​"
        //         )
        //     );
        // }
      })
    );
  }

  deleteUser(userId: number): Observable<void> {
    const url = `http://localhost:5001/api/users/${userId}`;
    return this.http.delete<void>(url);
  }
}
