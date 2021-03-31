import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Status } from './status';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(private httpclient: HttpClient) { }

  getAllStatuses(): Observable<Status[]> {
    return this.httpclient.get<Status[]>(environment.apiUrl + "/api/status");
  }
}
