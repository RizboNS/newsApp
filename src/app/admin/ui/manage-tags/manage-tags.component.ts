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
import { catchError, of, take, timeout } from 'rxjs';
import { Tag } from 'src/app/models/tag.model';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-manage-tags',
  templateUrl: './manage-tags.component.html',
  styleUrls: ['./manage-tags.component.css'],
})
export class ManageTagsComponent implements OnInit {
  newTag: string = '';

  @ViewChild('savedMsgEl') savedMsgEl!: ElementRef;
  @ViewChild('savedMsgContainer') savedMsgContainer!: ElementRef;

  @Input() manageTagsModalShow: boolean = true;
  @Output() state = new EventEmitter<boolean>();
  tags: Tag[] = [];
  isModal: boolean = true;
  savingCompleted = true;

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
          this.onErrorMsg();
        },
      });
  }

  onSuccessMsg(): void {
    this.savingCompleted = true;

    const newSavedMsgEl = this.renderer.createElement('p');

    const content = this.renderer.createText('Success...');
    this.renderer.appendChild(newSavedMsgEl, content);
    this.renderer.addClass(newSavedMsgEl, 'savedMsg');
    this.renderer.addClass(newSavedMsgEl, 'savedMsgShow');
    this.renderer.appendChild(
      this.savedMsgContainer.nativeElement,
      newSavedMsgEl
    );

    setTimeout(() => {
      this.renderer.addClass(newSavedMsgEl, 'savedMsgHide');
    }, 3000);
    setTimeout(() => {
      this.renderer.removeChild(
        this.savedMsgContainer.nativeElement,
        newSavedMsgEl
      );
    }, 4000);
  }
  onErrorMsg(): void {
    this.savingCompleted = true;

    const newSavedMsgEl = this.renderer.createElement('p');

    const content = this.renderer.createText('Failed...');
    this.renderer.appendChild(newSavedMsgEl, content);
    this.renderer.addClass(newSavedMsgEl, 'errorMsg');
    this.renderer.addClass(newSavedMsgEl, 'errorMsgShow');
    this.renderer.appendChild(
      this.savedMsgContainer.nativeElement,
      newSavedMsgEl
    );

    setTimeout(() => {
      this.renderer.addClass(newSavedMsgEl, 'errorMsgHide');
    }, 3000);
    setTimeout(() => {
      this.renderer.removeChild(
        this.savedMsgContainer.nativeElement,
        newSavedMsgEl
      );
    }, 4000);
  }

  getTags() {
    this.newsService
      .getTags()
      .pipe(
        timeout(10000),
        catchError((err) => of(err)),
        take(1)
      )
      .subscribe({
        next: (res) => {
          this.tags = res.data;
        },
        error: (err) => {
          console.log(err);
          // to do: handle error via page error or similar
        },
      });
  }
  onDeleteTag(tag: any) {
    this.tags = this.tags.filter((t) => t !== tag);
  }
  onAddTag() {
    if (this.newTag) {
      this.tags.push({ tagName: this.newTag });
      this.newTag = '';
    }
  }
  onClose(): void {
    this.state.emit(false);
    this.manageTagsModalShow = false;
  }
}
