import { ContestImage } from './../contracts/contest-image.interface';
import { config } from './../constants/config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Meme } from '../contracts/meme.interface';

@Injectable({
  providedIn: 'root'
})
export class LandingService {
  url = config.api;
  activeIndex = new BehaviorSubject<number>(0);
  backEnd = config.files;

  constructor(
    private http: HttpClient,
  ) { }

  sendLike(id: number): Observable<boolean> {
    return this.http.post<boolean>(this.url + 'ContestImage/' + id + '/like', id);
  }

  getContestImages(): Observable<ContestImage[]> {
    return this.http.get<ContestImage[]>(this.url + 'ContestImage/')
      .pipe(map(arr => arr.map(image => {
        image.imagePath = this.backEnd + image.imagePath.replace('..', '.');;
        return image;
      })));
  }

  postContestImage(thing: any): Observable<any> {
    return this.http.post<any>(this.url + 'ContestImage/', thing);
  }

  postContestName(thing: { name: string, mail: string }, id: number) {
    return this.http.post(this.url + 'ContestImage/' + id + '/' + thing.mail + '/' + thing.name + '/updateNameAndEmail', thing)
  }

  getMemeImages(): Observable<Meme[]> {
    return this.http.get<Meme[]>(this.url + 'Meme/')
      .pipe(map(arr => arr.map(image => {
        image.imagePath = this.backEnd + image.imagePath.replace('..', '.');;
        return image;
      })));
  }

  postMemeImage(thing: any): Observable<any> {
    return this.http.post<any>(this.url + 'Meme/', thing);
  }

  postMemeName(thing: { name: string, mail: string }, id: string) {
    return this.http.post(this.url + 'Meme/' + id + '/' + thing.mail + '/' + thing.name + '/updateNameAndEmail', thing)
  }
}
