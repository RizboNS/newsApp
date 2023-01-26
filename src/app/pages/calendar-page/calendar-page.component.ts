import { Component, OnInit } from '@angular/core';
import { calendarDummyData } from 'src/app/models/calendar-events-by-day.model';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { calendarFilters } from 'src/app/data/calendar-filters';
@Component({
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
  selector: 'app-calendar-page',
  templateUrl: './calendar-page.component.html',
  styleUrls: ['./calendar-page.component.css'],
})
export class CalendarPageComponent implements OnInit {
  calendarEvents = calendarDummyData;
  selectedEventIndex = -1;
  arrowIndex = -1;
  calendarFilters = calendarFilters;
  filtersActive: string[] = [];
  allMarked = true;
  constructor() {}
  ngOnInit(): void {
    this.initEvents();
    this.arrowIndex = -1;
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
      event.display = true;
    });
  }
  flip(i: number) {
    this.selectedEventIndex = i === this.selectedEventIndex ? -1 : i;
    this.arrowIndex = i === this.arrowIndex ? -1 : i;
  }

  getEventState(index: number) {
    return this.selectedEventIndex === index ? 'open' : 'closed';
  }

  handleCheckboxClick(filter: string) {
    if (this.allMarked) {
      this.filtersActive = [];
    }
    this.allMarked = false;
    const index = this.filtersActive.indexOf(filter);
    if (index === -1) {
      this.filtersActive.push(filter);
    } else {
      this.filtersActive.splice(index, 1);
    }
    this.filterEvents();
  }
  filterEvents() {
    this.calendarEvents.events.forEach((event) => {
      event.display = this.filtersActive.includes(event.type);
    });
  }
  filterAllEvents() {
    this.allMarked = true;
    this.filtersActive = [];
    this.calendarEvents.events.forEach((event) => {
      event.display = true;
    });
  }
}
