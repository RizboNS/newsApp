import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { LinkContainer } from 'src/app/models/link-container.model';
import { Link } from 'src/app/models/link.model';

@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.css'],
  animations: [
    trigger('eventAnimationsState', [
      state(
        'open',
        style({
          height: '*',
          opacity: 1,
          transform: 'translateY(0)',
        })
      ),
      state(
        'closed',
        style({
          height: '0',
          opacity: 0,
          transform: 'translateY(-50%)',
        })
      ),
      transition('open => closed', [animate('0.3s')]),
      transition('closed => open', [animate('0.3s')]),
    ]),
  ],
})
export class DropDownComponent {
  @ViewChild('dropDownMenu', { static: true }) dropDownMenu!: ElementRef;
  @ViewChild('dropDownLabel', { static: true }) dropDownLabel!: ElementRef;

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if (
      !this.dropDownMenu.nativeElement.contains(event.target) &&
      !this.dropDownLabel.nativeElement.contains(event.target)
    ) {
      this.showOptions = false;
    }
  }

  @Input() label: string = '';
  @Input() options: LinkContainer = { label: '', links: [] };

  showOptions = false;

  constructor() {}

  getEventState() {
    return this.showOptions ? 'open' : 'closed';
  }

  showOptionsToggle() {
    this.showOptions = !this.showOptions;
  }
}
