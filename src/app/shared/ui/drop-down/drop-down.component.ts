import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.css'],
  animations: [
    trigger('dropDown', [
      transition(':enter', [
        style({ height: '0', opacity: 0 }),
        animate('0.2s ease-out', style({ height: '*', opacity: 1 })),
      ]),
      transition(':leave', [
        style({ height: '*', opacity: 1 }),
        animate('0.2s ease-out', style({ height: '0', opacity: 0 })),
      ]),
    ]),
  ],
})
export class DropDownComponent {
  @Input() label: string = '';
  @Input() options: string[] = [];
  @Input() selectedOptionIndex: number = 0;
  @Output() onOptionSelectedIndexChange: EventEmitter<number> =
    new EventEmitter<number>();
  showOptions = false;
  constructor() {}

  onOptionSelected(option: number) {
    this.onOptionSelectedIndexChange.emit(option);
  }
  showOptionsToggle() {
    this.showOptions = !this.showOptions;
    console.log(this.showOptions);
  }
}
