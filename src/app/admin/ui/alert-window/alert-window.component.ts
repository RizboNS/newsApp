import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alert-window',
  templateUrl: './alert-window.component.html',
  styleUrls: ['./alert-window.component.css'],
})
export class AlertWindowComponent {
  @Input() title: string = '';
  @Input() message: string = '';
  @Input() show: boolean = false;
  @Output() isShownEvent = new EventEmitter<boolean>();
  constructor() {}

  close(): void {
    this.show = false;
    this.isShownEvent.emit(this.show);
  }
  closeAlertWindow(): void {
    this.close();
  }
}
