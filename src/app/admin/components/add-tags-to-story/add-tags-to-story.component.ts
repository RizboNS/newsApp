import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { take, timeout } from 'rxjs';
import { Tag } from 'src/app/models/tag.model';
import { NewsService } from 'src/app/services/news.service';
import { MiniMsgComponent } from '../../ui/mini-msg/mini-msg.component';

@Component({
  selector: 'app-add-tags-to-story',
  templateUrl: './add-tags-to-story.component.html',
  styleUrls: ['./add-tags-to-story.component.css'],
})
export class AddTagsToStoryComponent implements OnInit {
  aviableTags: Tag[] = [];
  @Input() chosenTags: string[] = [];
  expandBtnSign1: string = '+';
  expandBtnSign2: string = '-';
  newTag: string = '';
  @ViewChild('aviableTagsContainer1') aviableTagsContainerEl1!: ElementRef;
  @ViewChild('aviableTagsContainer2') aviableTagsContainerEl2!: ElementRef;

  @ViewChild(MiniMsgComponent) miniMsg: any;

  @Output() fireOpenManageTagsModalAtParrent = new EventEmitter<any>();
  @Output() fireChosenTags = new EventEmitter<string[]>();

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
  addToChosenTags(tag: string): void {
    if (this.chosenTags.find((t) => t.toLowerCase() === tag.toLowerCase())) {
      this.miniMsg.onErrorMsg(`Already added: ${tag}`);
      return;
    }
    this.chosenTags.push(tag);
    this.miniMsg.onSuccessMsg(`Added: ${tag}`);
    this.onFireChosenTags();
  }
  onAddTag(): void {
    if (this.newTag === '') {
      this.miniMsg.onErrorMsg('Tag cannot be empty');
      return;
    }
    if (
      this.chosenTags.find((t) => t.toLowerCase() === this.newTag.toLowerCase())
    ) {
      this.miniMsg.onErrorMsg(`Already added: ${this.newTag}`);
      return;
    }
    this.chosenTags.push(this.newTag);
    this.miniMsg.onSuccessMsg(`Added: ${this.newTag}`);
    this.onFireChosenTags();
    this.newTag = '';
  }
  fireOpenManageTagsModal(): void {
    this.fireOpenManageTagsModalAtParrent.emit();
  }
  removeFromChosenTags(tag: string): void {
    this.chosenTags = this.chosenTags.filter((t) => t !== tag);
    this.onFireChosenTags();
  }
}
