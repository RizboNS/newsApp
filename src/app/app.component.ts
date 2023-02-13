import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'newsApp';
  hideMiniCalendar = false;
  @ViewChild('asideContainer') asideContainer!: ElementRef;

  constructor(private router: Router) {}
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (
          event.url.startsWith('/kalendar') ||
          event.url.startsWith('/admin')
        ) {
          this.hideMiniCalendar = true;
        } else {
          this.hideMiniCalendar = false;
        }
        console.log('kidsCount: ' + this.asideContainerKidsCount());
      }
    });
  }
  asideContainerKidsCount(): number {
    return this.asideContainer.nativeElement.children.length;
  }

  isOnAdminRoute() {
    return this.router.url.startsWith('/admin');
  }
}
