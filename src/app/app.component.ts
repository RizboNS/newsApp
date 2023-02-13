import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'newsApp';
  hideMiniCalendar = false;
  constructor(private router: Router) {}
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        console.log(event.url);
        if (event.url.startsWith('/kalendar')) {
          this.hideMiniCalendar = true;
        } else {
          this.hideMiniCalendar = false;
        }
      }
    });
  }

  isOnAdminRoute() {
    return this.router.url.startsWith('/admin');
  }
}
