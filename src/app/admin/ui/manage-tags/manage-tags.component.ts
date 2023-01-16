import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take, timeout } from 'rxjs';
import { Tag } from 'src/app/models/tag.model';
import { NewsService } from 'src/app/services/news.service';
import { MiniMsgComponent } from '../../ui/mini-msg/mini-msg.component';

@Component({
  selector: 'app-manage-tags',
  templateUrl: './manage-tags.component.html',
  styleUrls: ['./manage-tags.component.css'],
})
export class ManageTagsComponent implements OnInit {
  newTag: string = '';
  tagsFetched = false;

  @ViewChild('savedMsgEl') savedMsgEl!: ElementRef;
  @ViewChild('savedMsgContainer') savedMsgContainer!: ElementRef;

  @ViewChild(MiniMsgComponent) miniMsg: any;

  @Input() manageTagsModalShow: boolean = true;
  @Output() state = new EventEmitter<boolean>();
  tags: Tag[] = [];
  isModal: boolean = true;
  savingCompleted = true;
  loading = true;

  constructor(
    private newsService: NewsService,
    private route: ActivatedRoute,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.getTags();
    this.checkRoute();
  }

  checkRoute() {
    if (this.route.snapshot.url.length > 0) {
      if (this.route.snapshot.url[1].path === 'manage-tags') {
        this.isModal = false;
      }
    }
  }
  onSave() {
    if (this.savingCompleted === false) {
      return;
    }
    if (!this.onAddTag()) {
      return;
    }
    this.savingCompleted = false;
    this.newsService
      .updateTags(this.tags)
      .pipe(timeout(10000), take(1))
      .subscribe({
        next: (res) => {
          this.tags = res.data;
          this.onSuccessMsg();
        },
        error: (err) => {
          this.onErrorMsg('Server error...');
        },
      });
  }

  onSuccessMsg(): void {
    this.savingCompleted = true;
    this.miniMsg.onSuccessMsg('Succesfully saved tags to the server.');
  }
  onErrorMsg(msg: string): void {
    this.savingCompleted = true;
    this.miniMsg.onErrorMsg(msg);
  }

  getTags() {
    this.toggleLoading();
    this.newsService
      .getTags()
      .pipe(timeout(10000), take(1))
      .subscribe({
        next: (res) => {
          this.tags = res.data;
          this.tagsFetched = true;
          this.toggleLoading();
        },
        error: (err) => {
          console.log(err);
          console.log(this.tags);
          this.toggleLoading();
        },
      });
  }

  onDeleteTag(tag: any) {
    this.tags = this.tags.filter((t) => t !== tag);
  }
  onAddTag(): boolean {
    const tagExists = this.tags.find((t) => t.tagName === this.newTag);
    if (tagExists) {
      this.onErrorMsg('Tag already exists...');
      return false;
    }
    if (this.newTag) {
      this.tags.push({ tagName: this.newTag });
      this.newTag = '';
      return true;
    }
    return true;
  }
  toggleLoading() {
    this.loading = !this.loading;
    if (this.isModal && this.loading && !this.tagsFetched) {
      this.manageTagsModalShow = !this.manageTagsModalShow;
      this.state.emit(this.manageTagsModalShow);
    }
  }
  onClose(): void {
    this.state.emit(false);
    this.manageTagsModalShow = false;
  }
}
