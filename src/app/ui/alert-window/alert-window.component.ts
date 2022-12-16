import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert-window',
  templateUrl: './alert-window.component.html',
  styleUrls: ['./alert-window.component.css'],
})
export class AlertWindowComponent {
  @Input() title: string = '';
  @Input() message: string = '';
  @Input() show: boolean = false;
  constructor() {}

  close(): void {
    this.show = false;
  }
  closeAlertWindow(): void {
    this.close();
  }
}
