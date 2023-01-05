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
  pageSelected = 5;
  pageCount = 65;
  pageRange: number[] = [];
  pageRangeToShow: number[] = [];

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.getStories('1');
    this.getPageRange();
  }

  getPageRange() {
    this.pageRange = [];
    for (let i = 1; i <= this.pageCount; i++) {
      this.pageRange.push(i);
    }
    this.alterPageRangeToShow();
  }

  alterPageRangeToShow() {
    if (this.pageSelected < 3) {
      this.pageRangeToShow = this.pageRange.slice(0, 6);
      return;
    }
    this.pageRangeToShow = this.pageRange.slice(
      this.pageSelected - 3,
      this.pageSelected + 3
    );
  }

  pageSelectHandler(page: number) {
    if (page == 0 || page > this.pageCount) {
      return;
    }
    this.pageSelected = page;
    this.alterPageRangeToShow();
  }

  getStories(page: string) {
    if (this.storyCategory === '') {
      this.newsService
        .getStoriesPaged(page)
        .pipe(take(1))
        .subscribe((res) => {
          // this.stories = res.data.stories;
          this.stories.set(res.data.page.toString(), res.data.stories);
          // this.pageSelected = res.data.page;
          // this.pageCount = res.data.pageCount;
          console.log(this.stories);
          console.log(res);
        });
    } else {
      this.newsService
        .getStoriesByCategory(this.storyCategory, page)
        .pipe(take(1))
        .subscribe((res) => {
          // this.stories = res.data.stories;
          this.stories.set(res.data.page.toString(), res.data.stories);
          // console.log(res);
          console.log(this.stories);
        });
    }
  }
}
