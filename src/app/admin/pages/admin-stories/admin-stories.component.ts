import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { take, timeout } from 'rxjs';
import { CategoryMap } from 'src/app/models/category.model';
import { Story } from 'src/app/models/story.model';
import { Tag } from 'src/app/models/tag.model';
import { NewsService } from 'src/app/services/news.service';
import { MiniMsgComponent } from '../../ui/mini-msg/mini-msg.component';

@Component({
  selector: 'app-admin-stories',
  templateUrl: './admin-stories.component.html',
  styleUrls: ['./admin-stories.component.css'],
})
export class AdminStoriesComponent implements OnInit {
  categories = CategoryMap;
  // tmp
  tags: Tag[] = [];

  @ViewChild(MiniMsgComponent) miniMsg: any;
  @ViewChild('dropdownContent', { static: true })
  dropdownContent!: ElementRef;

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
  constructor(
    private newsService: NewsService,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  ngOnInit(): void {
    this.getAllStories('1', this.pageSize);
    this.initAviableTags();
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
  initAviableTags() {
    this.newsService
      .getTags()
      .pipe(timeout(10000), take(1))
      .subscribe({
        next: (res) => {
          console.log(res);
          this.tags = res.data;
        },
        error: (err) => {
          this.miniMsg.onErrorMsg('Error fetching tags');
        },
      });
  }
  toggleDropDown() {
    this.tags.forEach((tag) => {
      const checkbox = this.renderer.createElement('input');
      if (tag.tagValue) {
        this.renderer.setAttribute(checkbox, 'type', 'checkbox');
        this.renderer.setAttribute(checkbox, 'value', tag.tagValue);
        this.renderer.setAttribute(checkbox, 'name', tag.tagName);
        this.renderer.appendChild(this.dropdownContent.nativeElement, checkbox);

        const label = this.renderer.createElement('label');
        const text = this.renderer.createText(tag.tagName);
        this.renderer.appendChild(label, text);
        this.renderer.appendChild(this.dropdownContent.nativeElement, label);
      }
    });
  }
  // tmp
  categoryChangeHandler(e: any) {}
  // tmp
  tagChangeHandler(e: any) {}
  // tmp
  publishedChangeHandler(e: any) {}
}
