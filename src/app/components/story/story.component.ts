import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { Story } from 'src/app/models/story.model';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css'],
})
export class StoryComponent implements OnInit {
  titleId: string = '';
  story!: Story;
  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService
  ) {}
  ngOnInit(): void {
    this.asignTitleId();
    this.getStory();
  }
  asignTitleId(): void {
    this.route.params.subscribe((params) => {
      this.titleId = params['titleId'];
    });
  }
  getStory(): void {
    this.newsService
      .getStoryByTitleId(this.titleId)
      .pipe(take(1))
      .subscribe((res) => {
        this.story = res.data;
      });
  }
}
