import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendar-page-weekly',
  templateUrl: './calendar-page-weekly.component.html',
  styleUrls: ['./calendar-page-weekly.component.css'],
})
export class CalendarPageWeeklyComponent {
  constructor(private router: Router) {}
  navigateToDailyView(toRoute: string) {
    if (toRoute === 'weekly' || toRoute === '') {
      return;
    }
    if (toRoute === 'daily' && this.router.url !== '/kalendar') {
      this.router.navigate(['/kalendar']);
    }
  }
}
