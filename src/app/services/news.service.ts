import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';
import { Story } from '../models/story.model';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  _domain = 'https://localhost:7400';
  _storyUrl = this._domain + '/api/Story';
  constructor(private http: HttpClient) {}

  getAllStories(): Observable<ApiResponse<Story[]>> {
    return this.http.get<ApiResponse<Story[]>>(this._storyUrl);
  }
  getStoryById(id: string): Observable<ApiResponse<Story>> {
    return this.http.get<ApiResponse<Story>>(this._storyUrl + '/' + id);
  }
  createStory(story: Story): Observable<ApiResponse<Story>> {
    return this.http.post<ApiResponse<Story>>(this._storyUrl, story);
  }
}
