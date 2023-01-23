import { Component, OnInit } from '@angular/core';
import { calendarDummyData } from 'src/app/models/calendar-events-by-day.model';

@Component({
  selector: 'app-calendar-page',
  templateUrl: './calendar-page.component.html',
  styleUrls: ['./calendar-page.component.css'],
})
export class CalendarPageComponent implements OnInit {
  calendarEvents = calendarDummyData;

  constructor() {}
  ngOnInit(): void {
    this.initDates();
  }
  previusDay() {
    console.log('previusDay');
  }
  nextDay() {
    console.log('nextDay');
  }
  initDates() {}
  splitDateAndTime(dateAndTime: string) {
    const date = dateAndTime.split('T')[0];
    const time = dateAndTime.split('T')[1];
    return { date, time };
  }
}
