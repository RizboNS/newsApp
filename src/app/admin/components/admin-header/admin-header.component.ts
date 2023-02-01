import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css'],
})
export class AdminHeaderComponent {
  testOptions: string[] = ['test1', 'test2', 'test3'];
  testName: string = 'testName';

  onOptionSelected(option: number) {
    console.log(option);
  }
}
