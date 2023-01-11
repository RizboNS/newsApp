import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.getTags();
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
