import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course, sortCoursesBySeqNo } from '../model/course';
import { catchError, map, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  courses$: Observable<Course[]>;

  constructor(private http: HttpClient) {
  }

  loadAllCourses = (): Observable<Course[]> => {
    return this.http.get<Course[]>("/api/courses")
      .pipe(
        map(res => res["payload"]),
        shareReplay(), //used to avoid accidentally call for the api!
        catchError((err) => {
          throw new Error(err);
        })
      );
  }

  saveCourse = (id: string, changes: Partial<Course>): Observable<any> => {
    return this.http.put(`/api/courses/${id}`, changes)
      .pipe(
        shareReplay(),
        catchError((err) => {
          throw new Error(err);
        })
      )
  }
}
