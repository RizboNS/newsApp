import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { Story } from 'src/app/models/story.model';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-admin-story',
  templateUrl: './admin-story.component.html',
  styleUrls: ['./admin-story.component.css'],
})
export class AdminStoryComponent implements OnInit {
  story!: Story;
  constructor(
    private router: ActivatedRoute,
    private newsService: NewsService
  ) {}

  ngOnInit(): void {
    this.getStory();
  }

  readIdFromRoute(): string {
    return this.router.snapshot.params['id'];
  }
  getStory(): void {
    this.newsService
      .getStoryById(this.readIdFromRoute())
      .pipe(take(1))
      .subscribe((res) => (this.story = res.data));
  }
}
