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
        console.log('arr: ', arr);
        image.imagePath = config.api.substr(0, (config.api.length - 4)) + image.imagePath;
        return image;
      })));
  }

  getPendingContestImages(): Observable<ContestImage[]> {
    return this.http.get<ContestImage[]>(this.url + 'ContestImage/pending');
  }
}
