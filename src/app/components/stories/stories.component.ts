import { Component, Input } from '@angular/core';
import { take } from 'rxjs';
import { Story } from 'src/app/models/story.model';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.css'],
})
export class StoriesComponent {
  @Input() storyType: string = '';
  @Input() storyCategory: string = '';

  stories = new Map<string, Story[]>();

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.getStories('1');
  }

  getStories(page: string) {
    if (this.storyCategory === '') {
      this.newsService
        .getStoriesPaged(page)
        .pipe(take(1))
        .subscribe((res) => {
          // this.stories = res.data.stories;
          this.stories.set(res.data.page, res.data.stories);
          console.log(res);
          console.log(this.stories);
        });
    } else {
      this.newsService
        .getStoriesByCategory(this.storyCategory, page)
        .pipe(take(1))
        .subscribe((res) => {
          // this.stories = res.data.stories;
          console.log(res);
          console.log(this.stories);
        });
    }
  }
}
