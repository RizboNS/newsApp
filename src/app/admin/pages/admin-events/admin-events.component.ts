import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-admin-events',
  templateUrl: './admin-events.component.html',
  styleUrls: ['./admin-events.component.css'],
})
export class AdminEventsComponent implements OnInit {
  constructor(private newsService: NewsService) {}
  ngOnInit(): void {
    this.newsService
      .getCalendarEvents()
      .pipe(take(1))
      .subscribe((data) => {
        console.log(data);
      });
  }
}
