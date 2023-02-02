import { Component } from '@angular/core';
import { Link } from 'src/app/models/link.model';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css'],
})
export class AdminHeaderComponent {
  storyOptions: Link[] = [
    { name: 'Create Story', path: '/admin/create-story' },
    { name: 'List Stories', path: '/admin/stories' },
  ];
  story: string = 'Story';

  onOptionSelected(option: number) {
    console.log(option);
  }
}
