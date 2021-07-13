import { Story } from './../contracts/story.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from '../constants/config';

@Injectable({
  providedIn: 'root'
})
export class StoryService {
  url = config.api;

  constructor(
    private http: HttpClient,
  ) { }

  getStories() {
    this.http.get(this.url + 'Story')
  }

  postStory(story: Story) {
    this.http.post(this.url + 'Story', story);
  }
}
