import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { CategoryMap } from 'src/app/models/category.model';
import { Story } from 'src/app/models/story.model';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-admin-story',
  templateUrl: './admin-story.component.html',
  styleUrls: ['./admin-story.component.css'],
})
export class AdminStoryComponent implements OnInit {
  categories = CategoryMap;
  story!: Story;
  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getStory();
  }

  readIdFromRoute(): string {
    return this.route.snapshot.params['id'];
  }
  getStory(): void {
    this.newsService
      .getStoryById(this.readIdFromRoute())
      .pipe(take(1))
      .subscribe((res) => (this.story = res.data));
  }
  onEditStory(): void {
    this.newsService;
    // .updateStory(story)
    // .pipe(take(1))
    // .subscribe((res) => console.log(res));
  }
  onDeleteStory(): void {
    this.newsService
      .deleteStory(this.story)
      .pipe(take(1))
      .subscribe((res) => res.success === true && this.navigateToStories());
  }
  navigateToStories(): void {
    this.router.navigate(['/admin/stories']);
  }
}
