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
  @Input() page: string = '';
  @Input() storyCategory: string = '';

  stories: Story[] = [];

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.getStories();
  }

  getStories() {
    if (this.storyCategory === '') {
      this.newsService.getStoriesPaged(this.page).pipe(take(1)).subscribe((res) => {
        this.stories = res.data.stories;
        console.log(res);
        console.log(this.stories);
      });
    } else {
      this.newsService
        .getStoriesByCategory(this.storyCategory, this.page)
        .pipe(take(1))
        .subscribe((res) => {
          this.stories = res.data.stories;
          console.log(res);
          console.log(this.stories);
        });
    }
  }
}
