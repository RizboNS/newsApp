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
    // this.newsService
    //   .getCalendarEvents()
    //   .pipe(take(1))
    //   .subscribe((data) => {
    //     console.log(data);
    //   });
    var startDate = new Date('2021-01-01');
    var endDate = new Date('2021-01-31');
    var jsonStartDate = JSON.stringify(startDate);
    var jsonEndDate = JSON.stringify(endDate);
    this.newsService
      .getCalendarEventsByDates('2023-01-26T00:00:00', '2023-01-26T00:00:00')
      .pipe(take(1))
      .subscribe((data) => {
        console.log(data);
      });
  }
}
