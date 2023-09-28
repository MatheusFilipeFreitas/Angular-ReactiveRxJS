import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../model/course';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private http: HttpClient) { }

  loadAllCourses = (): Observable<Course[]> => {
    return this.http.get<Course[]>("/api/courses")
      .pipe(
        map(res => res["payload"]),
        catchError((err) => {
          throw new Error(err);
        })
      );
  }
}