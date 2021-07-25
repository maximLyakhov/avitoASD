import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { config } from '../constants/config';
import { map, takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MemeGeneratorService implements OnDestroy {
  url = config.api + 'Meme';
  destroy = new Subject();

  constructor(private http: HttpClient) {
  }

  ngOnDestroy() {
    this.destroy.unsubscribe();
  }

  getBaseImages(): Observable<string[]> {
    return this.http.get<string[]>(this.url + '/baseImages')
      .pipe(takeUntil(this.destroy))
      .pipe(map(arr => {
        return arr.map(image => config.files + image);
      }));
  }

  blobToFile(theBlob: Blob, fileName: string): File {
    const b: any = theBlob;
    b.lastModifiedDate = new Date();
    b.name = fileName;
    return <File>theBlob;
  }

  uploadFile(files: any) {
    let fileToUpload = <File>files;
    let formData = new FormData()
    formData.append('meme', fileToUpload);
    return this.postMeme(formData)
      .pipe(takeUntil(this.destroy))
  }

  postMeme(thing: any): Observable<string> {
    return this.http.post<string>(this.url, thing)
      .pipe(takeUntil(this.destroy))
  }
}

