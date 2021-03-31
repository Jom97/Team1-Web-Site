import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Course } from './course';
import { Module } from './module';
import { Qualification } from './qualification';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  //dependency injection
  constructor(private httpClient: HttpClient) { }

  //get all list
  getAllCourses(): Observable<Course[]> {
    return this.httpClient.get<Course[]>(environment.apiUrl + "/api/courses");
  }

  getAllModules(): Observable<Module[]> {
    return this.httpClient.get<Module[]>(environment.apiUrl + "/api/modules");
  }

  getAllQuals(): Observable<Qualification[]> {
    return this.httpClient.get<Qualification[]>(environment.apiUrl + "/api/quals");
  }

  //Insert
  insertCourse(cou: Course): Observable<Course> {
    return this.httpClient.post<Course>(environment.apiUrl + "/api/courses", cou);
  }

  //Update
  updateCourse(cou: Course): Observable<Course> {
    return this.httpClient.put<Course>(environment.apiUrl + "/api/courses", cou);

  }

  enableCourse(course: Course): Observable<Course> {
    return this.httpClient.put<Course>(environment.apiUrl + "/api/courses/enable/" + course.courseId, course);

  }

  disableCourse(course: Course): Observable<Course> {
    return this.httpClient.put<Course>(environment.apiUrl + "/api/courses/disable/" + course.courseId, course);

  }

}
