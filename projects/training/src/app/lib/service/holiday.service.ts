import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { Training } from '../model/training';
import { TrainingPeriod } from '../model/trainingPeriod';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  trainingQUrl = "https://localhost:5101/api/Training";
  trainingCUrl = "https://localhost:5091/api/Training";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getTrainings(): Observable<Training[]> {
    return this.http.get<Training[]>(this.trainingQUrl)
      .pipe(
        catchError(this.handleError<Training[]>())
      );
  }

  getTrainingsInPeriod(id: number, startDate: string, endDate: string): Observable<TrainingPeriod[]> {
    const url = `${this.trainingQUrl}/periods/${id}?startDate=${startDate}&endDate=${endDate}`;
    return this.http.get<TrainingPeriod[]>(url)
      .pipe(
        catchError(this.handleError<TrainingPeriod[]>())
      );
  }

  getColaboratorsXDays(xDays: number){
    const url = `${this.trainingQUrl}/${xDays}/colabsComFeriasSuperioresAXDias`;
    return this.http.get<number[]>(url)
      .pipe(
        catchError(this.handleError<number[]>())
      );
  }

  addTraining(holi: Training): Observable<Training> {
    return this.http.post<Training>(this.trainingCUrl, holi, this.httpOptions).pipe(
      catchError(this.handleError<Training>())
    );
  }

  private handleError<T>() {
    return (error: any): Observable<T> => {
      console.error(error);
      throw error;
    };
  }
}
