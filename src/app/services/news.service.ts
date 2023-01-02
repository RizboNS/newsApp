import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { domainUrl } from '../data/api-domain';
import { ApiResponse } from '../models/api-response.model';
import { PagedResponse } from '../models/paged-response.model';
import { Story } from '../models/story.model';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  _domain = domainUrl;
  _storyUrl = this._domain + '/api/Story';
  constructor(private http: HttpClient) {}
  getStoriesByCategory(
    category: string,
    page: string
  ): Observable<ApiResponse<PagedResponse>> {
    return this.http.get<ApiResponse<PagedResponse>>(
      `${this._storyUrl}/category?${category}&page=${page}`
    );
  }

  getAllStories(): Observable<ApiResponse<Story[]>> {
    return this.http.get<ApiResponse<Story[]>>(this._storyUrl);
  }
  getStoryById(id: string): Observable<ApiResponse<Story>> {
    return this.http.get<ApiResponse<Story>>(this._storyUrl + '/' + id);
  }
  createStory(story: Story): Observable<ApiResponse<Story>> {
    return this.http.post<ApiResponse<Story>>(this._storyUrl, story);
  }
  deleteStory(story: Story): Observable<ApiResponse<Story>> {
    return this.http.delete<ApiResponse<Story>>(
      this._storyUrl + '/' + story.id
    );
  }
  updateStory(story: Story): Observable<ApiResponse<Story>> {
    return this.http.put<ApiResponse<Story>>(this._storyUrl, story);
  }
}
