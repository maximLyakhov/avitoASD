import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { config } from '../constants/config';

@Injectable({
  providedIn: 'root'
})
export class ContestImageService {
  url = config.api + 'ContestImage/';

  constructor(private http: HttpClient) {
  }

  getPendingContestImages(): Observable<any[]> {
    return this.http.get<any[]>(this.url + 'pending');
  }

  getApprovedContestImages() {
    return this.http.get(this.url);
  }

  postContestImage(thing: any): Observable<any> {
    return this.http.post<any>(this.url, thing)
  }

  approveContestImage(id: number) {
    return this.http.post(this.url + id + '/approve', id);
  }

  rejectContestImage(id: number) {
    return this.http.post(this.url + id + '/reject', id);
  }

}
