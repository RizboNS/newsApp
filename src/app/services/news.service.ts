import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { domainUrl } from '../data/api-domain';
import { ApiResponse } from '../models/api-response.model';
import { CalendarEvent } from '../models/calendar-event.model';
import { PagedResponse } from '../models/paged-response.model';
import { Story } from '../models/story.model';
import { Tag } from '../models/tag.model';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  _domain = domainUrl;
  _storyUrl = this._domain + '/api/Story';
  constructor(private http: HttpClient) {}
  getStoriesByCategory(
    type: string,
    category: string,
    page: string
  ): Observable<ApiResponse<PagedResponse>> {
    return this.http.get<ApiResponse<PagedResponse>>(
      `${this._storyUrl}/filter?type=${type}&category=${category}&page=${page}`
    );
  }
  getStoriesPaged(
    type: string,
    page: string
  ): Observable<ApiResponse<PagedResponse>> {
    return this.http.get<ApiResponse<PagedResponse>>(
      `${this._storyUrl}/page?type=${type}&page=${page}`
    );
  }
  searchStories(
    searchText: string,
    page: string,
    pageSize: string
  ): Observable<ApiResponse<PagedResponse>> {
    return this.http.get<ApiResponse<PagedResponse>>(
      `${this._storyUrl}/search?searchValue=${searchText}&page=${page}&pageSize=${pageSize}`
    );
  }
  getAllStories(
    page: string,
    pageSize: string,
    categories: number[],
    tags: string[],
    published: string
  ): Observable<ApiResponse<PagedResponse>> {
    console.log(
      `${this._storyUrl}/admin-query?page=${page}&pageSize=${pageSize}${
        categories.length > 0 ? '&categories=' + categories : ''
      }${tags.length > 0 ? '&tags=' + tags : ''}&published=${published}`
    );
    return this.http.get<ApiResponse<PagedResponse>>(
      `${this._storyUrl}/admin-query?page=${page}&pageSize=${pageSize}${
        categories.length > 0 ? '&categories=' + categories : ''
      }${tags.length > 0 ? '&tags=' + tags : ''}&published=${published}`
    );
  }
  getStoryById(id: string): Observable<ApiResponse<Story>> {
    return this.http.get<ApiResponse<Story>>(this._storyUrl + '/' + id);
  }
  getStoryByTitleId(titleId: string): Observable<ApiResponse<Story>> {
    return this.http.get<ApiResponse<Story>>(
      this._storyUrl + '/titleId/' + titleId
    );
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

  getTags(): Observable<ApiResponse<Tag[]>> {
    return this.http.get<ApiResponse<Tag[]>>(this._domain + '/api/Tag');
  }
  updateTags(tags: Tag[]): Observable<ApiResponse<Tag[]>> {
    return this.http.put<ApiResponse<Tag[]>>(this._domain + '/api/Tag', tags);
  }

  getCalendarEvents(): Observable<ApiResponse<CalendarEvent[]>> {
    return this.http.get<ApiResponse<CalendarEvent[]>>(
      this._domain + '/api/CalendarEvent/All'
    );
  }
  createCalendarEvent(
    event: CalendarEvent
  ): Observable<ApiResponse<CalendarEvent>> {
    return this.http.post<ApiResponse<CalendarEvent>>(
      this._domain + '/api/CalendarEvent',
      event
    );
  }
}
