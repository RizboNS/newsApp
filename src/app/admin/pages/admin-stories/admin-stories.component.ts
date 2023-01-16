import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { Story } from 'src/app/models/story.model';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-admin-stories',
  templateUrl: './admin-stories.component.html',
  styleUrls: ['./admin-stories.component.css'],
})
export class AdminStoriesComponent implements OnInit {
  stories: Story[] = [];

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.getAllStories();
  }

  getAllStories() {
    this.newsService
      .getAllStories()
      .pipe(take(1))
      .subscribe((res) => {
        this.stories = res.data;
        this.mapDateAndTimeToAllStories();
      });
  }
  mapDateAndTimeToAllStories() {
    this.stories.forEach((story) => {
      story.publishDateDto = this.dateAndTimeSplit(story.publishTime)[0];
      story.publishTimeDto = this.dateAndTimeSplit(story.publishTime)[1];
    });
  }

  dateAndTimeSplit(dateAndTime: string): string[] {
    return dateAndTime.split('T');
  }

  onDeleteStory(story: Story): void {
    this.newsService
      .deleteStory(story)
      .pipe(take(1))
      .subscribe((res) => {
        res.success === true && this.getAllStories();
      });
  }
}
