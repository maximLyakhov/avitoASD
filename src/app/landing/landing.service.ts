import { ContestImage } from './../contracts/contest-image.interface';
import { config } from './../constants/config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LandingService {
  url = config.api;
  activeIndex = new BehaviorSubject<number>(0);

  constructor(
    private http: HttpClient,
  ) { }

  sendLike(id: number): Observable<boolean> {
    return this.http.post<boolean>(this.url + 'ContestImage/' + id + '/like', id);
  }

  getContestImages(): Observable<ContestImage[]> {
    return this.http.get<ContestImage[]>(this.url + 'ContestImage/');
  }

  postContestImage(thing: any): Observable<any> {
    return this.http.post<any>(this.url + 'ContestImage/', thing);
  }

  postContestName(thing: { name: string, mail: string}, id: number) {
    return this.http.post(this.url + 'ContestImage/' + id + '/' + thing.mail + '/' + thing.name + '/updateNameAndEmail', thing)
  }
  getMemeImages(): Observable<any> {
    return this.http.get<any>(this.url + 'Meme/');
  }

  postMemeImage(thing: any): Observable<any> {
    return this.http.post<any>(this.url + 'Meme/', thing);
  }

  postMemeName(thing: { name: string, mail: string}, id: string) {
    return this.http.post(this.url + 'Meme/' + id + '/' + thing.mail + '/' + thing.name + '/updateNameAndEmail', thing)
  }
}
