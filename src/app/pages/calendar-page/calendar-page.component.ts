import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendar-page',
  templateUrl: './calendar-page.component.html',
  styleUrls: ['./calendar-page.component.css'],
})
export class CalendarPageComponent {
  urlLength: number = 1;
  constructor(private router: Router) {}
  navigateToWeeklyView(toRoute: string) {
    if (toRoute === 'daily' || toRoute === '') {
      return;
    }
    if (toRoute === 'weekly' && this.router.url !== '/kalendar/n') {
      this.router.navigate(['/kalendar/n']);
    }
  }
}
