import {
  Component,
  ElementRef,
  HostListener,
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
  isCategoryDropDownOpen = false;
  isTagDropDownOpen = false;
  tags: Tag[] = [];
  selectedCategories: string[] = [];
  selectedTags: string[] = [];
  published: string = 'all';

  @ViewChild(MiniMsgComponent) miniMsg: any;

  @ViewChild('categoryDropdownContent', { static: true })
  categoryDropdownContent!: ElementRef;
  @ViewChild('categoryDropdownButton', { static: true })
  categoryDropdownButton!: ElementRef;
  @ViewChild('tagDropdownContent', { static: true })
  tagDropdownContent!: ElementRef;
  @ViewChild('tagDropdownButton', { static: true })
  tagDropdownButton!: ElementRef;

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

  @HostListener('document:click', ['$event'])
  documentClick(event: MouseEvent) {
    if (
      !this.categoryDropdownContent.nativeElement.contains(event.target) &&
      !this.categoryDropdownButton.nativeElement.contains(event.target)
    ) {
      this.isCategoryDropDownOpen = false;
      this.renderer.removeClass(
        this.categoryDropdownContent.nativeElement,
        'showDropdown'
      );
    }
    if (
      !this.tagDropdownContent.nativeElement.contains(event.target) &&
      !this.tagDropdownButton.nativeElement.contains(event.target)
    ) {
      this.isTagDropDownOpen = false;
      this.renderer.removeClass(
        this.tagDropdownContent.nativeElement,
        'showDropdown'
      );
    }
  }
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

  toggleDropDown(type: string) {
    if (type === 'category') {
      setTimeout(() => {
        this.isCategoryDropDownOpen = !this.isCategoryDropDownOpen;
        if (this.isCategoryDropDownOpen) {
          this.renderer.addClass(
            this.categoryDropdownContent.nativeElement,
            'showDropdown'
          );
        } else {
          this.renderer.removeClass(
            this.categoryDropdownContent.nativeElement,
            'showDropdown'
          );
        }
      }, 0);
    } else if (type === 'tag') {
      setTimeout(() => {
        this.isTagDropDownOpen = !this.isTagDropDownOpen;
        if (this.isTagDropDownOpen) {
          this.renderer.addClass(
            this.tagDropdownContent.nativeElement,
            'showDropdown'
          );
        } else {
          this.renderer.removeClass(
            this.tagDropdownContent.nativeElement,
            'showDropdown'
          );
        }
      }, 0);
    }
  }
  updateSelectedCategories(category: string) {
    const index = this.selectedCategories.indexOf(category);
    if (index === -1) {
      this.selectedCategories.push(category);
    } else {
      this.selectedCategories.splice(index, 1);
    }
    console.log(this.selectedCategories);
  }
  updateSelectedTags(tag: string) {
    const index = this.selectedTags.indexOf(tag);
    if (index === -1) {
      this.selectedTags.push(tag);
    } else {
      this.selectedTags.splice(index, 1);
    }
    console.log(this.selectedTags);
  }
  // tmp
  publishedChangeHandler(e: any) {
    this.published = e.target.value;
    console.log(this.published);
  }
}
