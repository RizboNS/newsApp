import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-events',
  templateUrl: './admin-events.component.html',
  styleUrls: ['./admin-events.component.css'],
})
export class AdminEventsComponent implements OnInit {
  constructor(private router: Router) {}
  ngOnInit(): void {}

  navigateToWeeklyView(toRoute: string) {
    if (toRoute === 'daily' || toRoute === '') {
      return;
    }
    if (toRoute === 'weekly' && this.router.url !== '/admin/events/weekly') {
      this.router.navigate(['admin/events/weekly']);
    }
  }
}
