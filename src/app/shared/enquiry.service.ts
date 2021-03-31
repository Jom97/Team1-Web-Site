import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Course } from './course';
import { Enquiry } from './enquiry';

@Injectable({
  providedIn: 'root'
})
export class EnquiryService {

  constructor(private httpclient: HttpClient) { }


  //list all Enquiries
  getAllEnquiries(): Observable<any> {

    return this.httpclient.get(environment.apiUrl + "/api/course-enquiries");
  }


  insertEnquiry(enq: Enquiry): Observable<any> {
    return this.httpclient.post(environment.apiUrl + "/api/course-enquiries", enq);
  }

  getAllCourses(): Observable<Course[]> {
    return this.httpclient.get<Course[]>(environment.apiUrl + "/api/courses/active");
  }

  updateEnquiry(enq: Enquiry): Observable<any> {
    return this.httpclient.put(environment.apiUrl + "/api/course-enquiries", enq);
  }
}
