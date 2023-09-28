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
    this.courses$ = this.loadAllCourses()
      .pipe(
        map(courses => courses.sort(sortCoursesBySeqNo)),
        shareReplay() //used to avoid accidentally call for the api!
      );
  }

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
