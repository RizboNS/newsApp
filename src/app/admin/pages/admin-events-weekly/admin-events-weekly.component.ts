import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-events-weekly',
  templateUrl: './admin-events-weekly.component.html',
  styleUrls: ['./admin-events-weekly.component.css'],
})
export class AdminEventsWeeklyComponent {
  constructor(private router: Router) {}
  navigateToDailyView(toRoute: string) {
    if (toRoute === 'weekly' || toRoute === '') {
      return;
    }
    if (toRoute === 'daily' && this.router.url !== '/admin/events') {
      this.router.navigate(['admin/events']);
    }
  }
}
