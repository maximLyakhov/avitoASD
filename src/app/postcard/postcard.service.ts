import { config } from './../constants/config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Postcard } from '../contracts/postcard.interface';

@Injectable({
  providedIn: 'root'
})
export class PostcardService {
  url = config.api + 'Postcard/';
  constructor(
    private http: HttpClient,
  ) { }

  getPostcards() {
    return this.http.get(this.url + 'cards')
  }

  getPostcardsCount() {
    return this.http.get(this.url + 'count')
  }

  getPendingPostcards() {
    return this.http.get(this.url + 'pending')
  }

  postCard(postcard: Postcard) {
    return this.http.post(this.url + 'postcard', postcard)
  }

  approvePostcard(id: number) {
    return this.http.post(this.url + id + '/approve', id)
  }

  rejectPostcard(id: number) {
    return this.http.post(this.url + id + '/reject', id)
  }
}