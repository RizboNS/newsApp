import { Component, OnInit } from '@angular/core';
import { calendarDummyData } from 'src/app/models/calendar-events-by-day.model';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
@Component({
  animations: [
    trigger('eventAnimations', [
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
          height: 0,
          opacity: 0,
          transform: 'translateY(-50%)',
        })
      ),
      transition('open => closed', [animate('0.3s')]),
      transition('closed => open', [animate('0.3s')]),
    ]),
  ],
  selector: 'app-calendar-page',
  templateUrl: './calendar-page.component.html',
  styleUrls: ['./calendar-page.component.css'],
})
export class CalendarPageComponent implements OnInit {
  calendarEvents = calendarDummyData;
  selectedEventIndex = -1;
  constructor() {}
  ngOnInit(): void {
    this.initEvents();
  }
  previusDay() {
    console.log('previusDay');
  }
  nextDay() {
    console.log('nextDay');
  }
  splitDateAndTime(dateAndTime: string) {
    const date = dateAndTime.split('T')[0];
    const time =
      dateAndTime.split('T')[1].split(':')[0] +
      ':' +
      dateAndTime.split('T')[1].split(':')[1];
    return { date, time };
  }
  initEvents() {
    this.calendarEvents.events.forEach((event) => {
      const { date, time } = this.splitDateAndTime(event.dateAndTime);
      event.time = time;
      event.date = date;
    });
  }
  flip(index: number) {
    this.selectedEventIndex = index === this.selectedEventIndex ? -1 : index;
  }
  getEventState(index: number) {
    return index === this.selectedEventIndex ? 'open' : 'closed';
  }
}
