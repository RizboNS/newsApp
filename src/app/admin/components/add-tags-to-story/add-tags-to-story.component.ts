import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  expandBtnSign: string = '+';
  newTag: string = '';
  @ViewChild('aviableTagsContainer') aviableTagsContainerEl!: ElementRef;

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
  expandTags() {
    this.aviableTagsContainerEl.nativeElement.classList.toggle(
      'tags-container-expanded'
    );
    this.expandBtnSign = this.expandBtnSign === '+' ? '-' : '+';
  }
  addToChosenTags(tag: Tag): void {
    if (this.chosenTags.find((t) => t.tagName === tag.tagName)) {
      return;
    }
    this.chosenTags.push(tag);
  }
  onAddTag(): void {
    if (this.newTag === '') {
      return;
    }
    if (this.chosenTags.find((t) => t.tagName === this.newTag)) {
      return;
    }
    this.chosenTags.push({ tagName: this.newTag });
    this.newTag = '';
  }
}
