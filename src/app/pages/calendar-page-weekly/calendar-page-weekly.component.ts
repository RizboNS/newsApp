import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendar-page-weekly',
  templateUrl: './calendar-page-weekly.component.html',
  styleUrls: ['./calendar-page-weekly.component.css'],
})
export class CalendarPageWeeklyComponent {
  constructor(private router: Router) {}
  navigateToWeeklyView(toRoute: string) {
    if (toRoute === 'daily') {
      this.router.navigate(['calendar']);
    } else if (toRoute === 'weekly') {
      this.router.navigate(['calendar/weekly']);
    }
  }
}
