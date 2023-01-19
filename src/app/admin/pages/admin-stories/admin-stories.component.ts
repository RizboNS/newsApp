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
  stories = new Map<string, Story[]>();
  searchText: string = '';
  pageSelected: number = 1;
  pageRange: number[] = [];
  pageRangeToShow: number[] = [];
  pageCount: number = 1;
  pageSize: string = '5';
  pageSizes: string[] = [
    '5',
    '10',
    '20',
    '30',
    '40',
    '50',
    '60',
    '70',
    '80',
    '90',
    '100',
  ];
  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.getAllStories('1', this.pageSize);
  }

  getAllStories(page: string, pageCount: string) {
    this.newsService
      .getAllStories(page, pageCount)
      .pipe(take(1))
      .subscribe((res) => {
        this.stories.set(res.data.page.toString(), res.data.stories);
        this.pageSelected = res.data.page;
        this.pageCount = res.data.pageCount;
        this.getPageRange();
      });
  }

  onDeleteStory(story: Story): void {
    this.newsService
      .deleteStory(story)
      .pipe(take(1))
      .subscribe((res) => {
        res.success === true && this.getAllStories('1', '6');
      });
  }

  pageSelectHandler(page: number) {
    if (page == 0 || page > this.pageCount) {
      return;
    }
    this.pageSelected = page;
    this.alterPageRangeToShow();
    if (!this.stories.has(page.toString())) {
      this.getAllStories(page.toString(), this.pageSize);
    }
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
  getPageRange() {
    this.pageRange = [];
    for (let i = 1; i <= this.pageCount; i++) {
      this.pageRange.push(i);
    }
    this.alterPageRangeToShow();
  }
  pageSizeChangeHandler(pageSize: any) {
    this.pageSize = pageSize.target.value;
    this.searchHandler();
  }
  searchHandler() {
    if (this.searchText === '') {
      this.getAllStories(this.pageSelected.toString(), this.pageSize);
      return;
    }
    this.newsService
      .searchStories(this.searchText, '1', this.pageSize)
      .pipe(take(1))
      .subscribe((res) => {
        console.log('res');
        this.stories.set(res.data.page.toString(), res.data.stories);
        this.pageSelected = res.data.page;
        this.pageCount = res.data.pageCount;
        this.getPageRange();
      });
  }
}
