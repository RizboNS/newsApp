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
import { articleTypes } from 'src/app/data/article-types';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.css'],
})
export class StoriesComponent implements OnInit, OnChanges {
  @Input() storyType: string = '';
  @Input() storyCategory: string = '';

  types = articleTypes;
  stories = new Map<string, Story[]>();
  categoryMap = CategoryMap;
  pageSelected = 1;
  pageCount = 1;
  pageRange: number[] = [];
  pageRangeToShow: number[] = [];

  testHashtags = [
    'test',
    'test2',
    'test3',
    'test4',
    'test5',
    'test6long',
    'test7',
    'test8longeeeeeer',
    'short',
    'test10',
    'shrt',
    'test12',
    'test',
    'test2',
    'test3',
    'test4',
    'test5',
    'test6long',
    'test7',
    'test8longeeeeeer',
    'short',
    'test10',
    'shrt',
    'test12',
  ];

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

  private mapStoryType(page: string) {
    this.stories.get(page)?.forEach((story) => {
      const test = this.types.find((type) => type[1] === story.type);
      if (test != undefined) {
        story.type = test[1];
        story.typeDisplay = test[0];
      }
    });
  }

  getStories(page: string) {
    if (this.storyCategory === '') {
      this.newsService
        .getStoriesPaged(this.storyType, page)
        .pipe(take(1))
        .subscribe((res) => {
          this.stories.set(
            res.data.page.toString(),
            this.getFirstTextFromStories(res.data.stories)
          );
          this.pageSelected = res.data.page;
          this.pageCount = res.data.pageCount;
          this.mapStoryType(res.data.page.toString());
          this.getPageRange();
        });
    } else {
      this.newsService
        .getStoriesByCategory(this.storyType, this.storyCategory, page)
        .pipe(take(1))
        .subscribe((res) => {
          res.data.stories = this.getFirstTextFromStories(res.data.stories);
          this.stories.set(res.data.page.toString(), res.data.stories);
          this.pageSelected = res.data.page;
          this.pageCount = res.data.pageCount;
          this.mapStoryType(res.data.page.toString());
          this.getPageRange();
        });
    }
  }

  getFirstTextFromStories(stories: Story[]) {
    // loop through each story and get the first innerText from the htmlData property wich is not img tag or br empty tag
    stories.forEach((story) => {
      const div = document.createElement('div');
      div.innerHTML = story.htmlData;
      const text = div.innerText;
      const firstText = text.split(' ').slice(0, 50).join(' ');
      story.firstText = firstText;
    });

    return stories;
  }
}
