import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { take, timeout } from 'rxjs';
import { Tag } from 'src/app/models/tag.model';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-add-tags-to-story',
  templateUrl: './add-tags-to-story.component.html',
  styleUrls: ['./add-tags-to-story.component.css'],
})
export class AddTagsToStoryComponent implements OnInit {
  aviableTags: Tag[] = [];
  chosenTags: Tag[] = [];
  expandBtnSign1: string = '+';
  expandBtnSign2: string = '-';
  newTag: string = '';
  @ViewChild('aviableTagsContainer1') aviableTagsContainerEl1!: ElementRef;
  @ViewChild('aviableTagsContainer2') aviableTagsContainerEl2!: ElementRef;
  @Output() fireOpenManageTagsModalAtParrent = new EventEmitter<any>();
  @Output() fireChosenTags = new EventEmitter<Tag[]>();

  constructor(private newsService: NewsService) {}
  ngOnInit(): void {
    this.initAviableTags();
  }

  initAviableTags() {
    this.newsService
      .getTags()
      .pipe(timeout(10000), take(1))
      .subscribe({
        next: (res) => {
          this.aviableTags = res.data;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  private onFireChosenTags() {
    this.fireChosenTags.emit(this.chosenTags);
  }
  expandTags(elNum: string): void {
    if (elNum === '1') {
      this.aviableTagsContainerEl1.nativeElement.classList.toggle(
        'tags-container-expanded'
      );
      this.expandBtnSign1 = this.expandBtnSign1 === '+' ? '-' : '+';
    } else if (elNum === '2') {
      this.aviableTagsContainerEl2.nativeElement.classList.toggle(
        'tags-container-expanded'
      );
      this.expandBtnSign2 = this.expandBtnSign2 === '+' ? '-' : '+';
    }
  }
  addToChosenTags(tag: Tag): void {
    if (this.chosenTags.find((t) => t.tagName === tag.tagName)) {
      return;
    }
    this.chosenTags.push(tag);
    this.onFireChosenTags();
  }
  onAddTag(): void {
    if (this.newTag === '') {
      return;
    }
    if (this.chosenTags.find((t) => t.tagName === this.newTag)) {
      return;
    }
    this.chosenTags.push({ tagName: this.newTag });
    this.onFireChosenTags();
    this.newTag = '';
  }
  fireOpenManageTagsModal(): void {
    this.fireOpenManageTagsModalAtParrent.emit();
  }
  removeFromChosenTags(tag: Tag): void {
    this.chosenTags = this.chosenTags.filter((t) => t.tagName !== tag.tagName);
    this.onFireChosenTags();
  }
}
