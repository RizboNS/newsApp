import { Component, OnInit } from '@angular/core';
import { calendarDummyData } from 'src/app/models/calendar-event.model';

@Component({
  selector: 'app-calendar-page',
  templateUrl: './calendar-page.component.html',
  styleUrls: ['./calendar-page.component.css'],
})
export class CalendarPageComponent implements OnInit {
  calendarEvents = calendarDummyData;
  days: string[] = [];
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
  initDates() {
    this.calendarEvents.forEach((event) => {
      const { date } = this.splitDateAndTime(event.dateAndTime);
      const dateExists = this.days.find((d) => d === date);
      if (dateExists) {
        return;
      } else {
        this.days.push(date.toString());
      }
    });
    // sort days by date
    this.days.sort((a, b) => {
      const dateA = new Date(a);
      const dateB = new Date(b);
      return dateA.getTime() - dateB.getTime();
    });
  }
  splitDateAndTime(dateAndTime: string) {
    const date = dateAndTime.split('T')[0];
    const time = dateAndTime.split('T')[1];
    return { date, time };
  }
}
