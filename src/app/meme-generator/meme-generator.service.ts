import { Meme } from './../contracts/meme.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { config } from '../constants/config';
import { map, takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MemeGeneratorService implements OnDestroy {
  url = config.api + 'Meme/';
  destroy = new Subject();

  constructor(private http: HttpClient) {
  }

  ngOnDestroy() {
    this.destroy.unsubscribe();
  }

  getBaseImages(): Observable<string[]> {
    return this.http.get<string[]>(this.url + 'baseImages')
      .pipe(takeUntil(this.destroy))
      .pipe(map(arr => arr.map(image => config.api.substring(0, 28) + image)));
  }

  getPendingMemes(): Observable<Meme[]> {
    return this.http.get<Meme[]>(this.url + 'pending')
      .pipe(takeUntil(this.destroy))
      .pipe(map(arr => arr.map(image => {
        image.imagePath = config.api.substring(0, 28) + image.imagePath;
        return image;
      })));
  }

  blobToFile(theBlob: Blob, fileName: string): File {
    const b: any = theBlob;
    b.lastModifiedDate = new Date();
    b.name = fileName;
    return <File>theBlob;
  }

  uploadFile(files: any) {
    let fileToUpload = <File>files;
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.postMeme(formData)
      .pipe(takeUntil(this.destroy))
      .subscribe((event: any) => {
        this.getPendingMemes()
            .pipe(takeUntil(this.destroy));
      })
  }

  postMeme(thing: any): Observable<string> {
    return this.http.post<string>(this.url, thing)
      .pipe(takeUntil(this.destroy))
  }

  approveMeme(id: number): Observable<boolean> {
    return this.http.post<boolean>(this.url + id + '/approve', id)
      .pipe(takeUntil(this.destroy))
  }

  rejectMeme(id: number): Observable<boolean> {
    return this.http.post<boolean>(this.url + + id + '/reject', id)
      .pipe(takeUntil(this.destroy))
  }

  getApprovedMemes(): Observable<Meme[]> {
    return this.http.get<Meme[]>(this.url)
      .pipe(takeUntil(this.destroy))
      .pipe(map(arr => arr.map(image => {
        image.imagePath = config.api.substring(0, 28) + image.imagePath;
        return image;
      })));
  }
}

