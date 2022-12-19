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
        console.log(this.stories);
      });
  }
  onEditStory(story: Story): void {
    console.log(story);
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
