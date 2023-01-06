import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { take } from 'rxjs';
import { Story } from 'src/app/models/story.model';
import { NewsService } from 'src/app/services/news.service';
import { CategoryMap } from 'src/app/models/category.model';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.css'],
})
export class StoriesComponent implements OnInit, OnChanges {
  @Input() storyType: string = '';
  @Input() storyCategory: string = '';

  stories = new Map<string, Story[]>();
  categoryMap = CategoryMap;
  pageSelected = 1;
  pageCount = 1;
  pageRange: number[] = [];
  pageRangeToShow: number[] = [];

  constructor(private newsService: NewsService) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['storyCategory']) {
      this.getStories('1');
    }
  }

  ngOnInit(): void {
    this.getStories('1');
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
    if (!this.stories.has(page.toString())) {
      this.getStories(page.toString());
    }
  }
  capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  getStories(page: string) {
    if (this.storyCategory === '') {
      this.newsService
        .getStoriesPaged(this.storyType, page)
        .pipe(take(1))
        .subscribe((res) => {
          this.stories.set(res.data.page.toString(), res.data.stories);
          this.pageSelected = res.data.page;
          this.pageCount = res.data.pageCount;
          this.getPageRange();
        });
    } else {
      this.newsService
        .getStoriesByCategory(this.storyType, this.storyCategory, page)
        .pipe(take(1))
        .subscribe((res) => {
          this.stories.set(res.data.page.toString(), res.data.stories);
          this.pageSelected = res.data.page;
          this.pageCount = res.data.pageCount;
          this.getPageRange();
        });
    }
  }
}
