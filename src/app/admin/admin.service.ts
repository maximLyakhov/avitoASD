import { Stats } from './../contracts/stats';
import { ContestImage } from './../contracts/contest-image.interface';
import { Meme } from './../contracts/meme.interface';
import { Observable, Subject } from 'rxjs';
import { config } from './../constants/config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  url = config.api;
  backEnd = config.files;
  destroy: Subject<void> = new Subject<void>();
  key: any;
  value: any;

  constructor(
    private http: HttpClient,
  ) { }

  getPendingMemes(): Observable<Meme[]> {
    return this.http.get<Meme[]>(this.url + 'Meme/pending')
      .pipe(takeUntil(this.destroy))
      .pipe(map(arr => arr.map(image => {
        image.imagePath = this.backEnd + image.imagePath;
        return image;
      })));
  }

  approveMeme(id: number): Observable<boolean> {
    return this.http.post<boolean>(this.url + 'Meme/' + id + '/approve', id)
      .pipe(takeUntil(this.destroy))
  }

  rejectMeme(id: number): Observable<boolean> {
    return this.http.post<boolean>(this.url + 'Meme/' + id + '/reject', id)
      .pipe(takeUntil(this.destroy))
  }

  getPendingContestImages(): Observable<ContestImage[]> {
    return this.http.get<ContestImage[]>(this.url + 'ContestImage/pending')
      .pipe(takeUntil(this.destroy))
      .pipe(map(arr => arr.map(image => {
        image.imagePath = this.backEnd + image.imagePath.replace('..', '.');;
        return image;
      })));
  }

  approveContestImage(id: number) {
    return this.http.post(this.url + 'ContestImage/' + id + '/approve', id);
  }

  rejectContestImage(id: number) {
    return this.http.post(this.url + 'ContestImage/' + id + '/reject', id);
  }

  getContentCount(): Observable<Stats> {
    return this.http.get<Stats>(this.url + 'Overview');
  }

  getMemeImages(): Observable<Meme[]> {
    return this.http.get<Meme[]>(this.url + 'Meme/')
      .pipe(map(arr => arr.map(image => {
        image.imagePath = this.backEnd + image.imagePath.replace('..', '.');;
        return image;
      })));
  }

  getContestImages(): Observable<ContestImage[]> {
    return this.http.get<ContestImage[]>(this.url + 'ContestImage/')
      .pipe(map(arr => arr.map(image => {
        image.imagePath = this.backEnd + image.imagePath.replace('..', '.');;
        return image;
      })));
  }
}
