import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Input() manageTagsModalShow: boolean = true;
  @Output() state = new EventEmitter<boolean>();
  tags: Tag[] = [];
  isModal: boolean = true;
  savedMsg = '';
  errorMsg = '';
  savingCompleted = true;
  constructor(
    private newsService: NewsService,
    private route: ActivatedRoute
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
    this.savedMsg = '';
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
          this.savedMsg = 'Tags Saved...';
          this.savingCompleted = true;
          setTimeout(() => {
            this.savedMsg = '';
          }, 3000);
        },
        error: (err) => {
          this.errorMsg = 'Error Saving Tags...' + err.message;
          // to do: handle error via page error or similar
        },
      });
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
  onCloseErrorMsg() {
    this.errorMsg = '';
  }
}
