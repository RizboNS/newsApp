import { Component } from '@angular/core';
import { LinkContainer } from 'src/app/models/link-container.model';
import { Link } from 'src/app/models/link.model';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css'],
})
export class AdminHeaderComponent {
  storyLinkOptions: LinkContainer = {
    label: 'Story',
    links: [
      { name: 'Create Story', path: '/admin/create-story' },
      { name: 'List Stories', path: '/admin/stories' },
    ],
  };
  calendarLinkOptions: LinkContainer = {
    label: 'Calendar',
    links: [
      { name: 'Create Calendar Event', path: '/admin/create-calendar-event' },
      { name: 'List Calendar Events', path: '/admin/events' },
    ],
  };
}
