import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Computer} from "../models/computer";
import {catchError, retry} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ComputerService {

  apiUrl = 'http://localhost:3000/computers';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  marques = ['Dell', 'HP', 'Apple', 'Asus'];
  types = ['Portable', 'Fixe', 'Tablette hybride'];
  categories = ['Gaming', 'Bureautique', 'Premier prix'];

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Computer[]> {
    return this.http.get<Computer[]>(this.apiUrl, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getById(id: number): Observable<Computer> {
    return this.http.get<Computer>(this.apiUrl + '/' + id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  add(computer: Computer): Observable<Computer> {
    return this.http.post<Computer>(this.apiUrl, computer, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  removeById(id: number): Observable<Computer> {
    return this.http.delete<Computer>(this.apiUrl + '/' + id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  edit(computerToUpdate: Computer): Observable<Computer> {
    return this.http.put<Computer>(this.apiUrl + '/' + computerToUpdate.id, computerToUpdate, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getAllMarques(): string[] {
    return this.marques;
  }

  getAllTypes(): string[] {
    return this.types;
  }

  getAllCategories(): string[] {
    return this.categories;
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
// Get client-side error
      errorMessage = error.error.message;
    } else {
// Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
