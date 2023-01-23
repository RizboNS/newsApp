import { Component, OnInit } from '@angular/core';
import { calendarDummyData } from 'src/app/models/calendar-events-by-day.model';

@Component({
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
    // if (e.target.classList.contains('calendar-event-header')) {
    //   e.target.nextElementSibling.classList.toggle('show');
    //   e.target.lastChild.classList.toggle('show');
    // } else {
    //   e.target.parentElement.nextElementSibling.classList.toggle('show');
    // }
    this.selectedEventIndex = index === this.selectedEventIndex ? -1 : index;
  }
}
