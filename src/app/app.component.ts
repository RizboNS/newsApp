import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'newsApp';

  constructor(private router: Router) {}

  isOnAdminRoute() {
    return this.router.url.startsWith('/admin');
  }
}
