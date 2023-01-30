import { Component, OnInit } from '@angular/core';
import {
  calendarDummyData,
  CalendarEventsByDay,
} from 'src/app/models/calendar-events-by-day.model';
import {
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes,
} from '@angular/animations';
import { calendarTypes } from 'src/app/data/calendar-types';
import { NewsService } from 'src/app/services/news.service';
import { CalendarEvent } from 'src/app/models/calendar-event.model';
@Component({
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition('void => *', animate(600)),
      transition('* => void', animate(600)),
    ]),
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
  private calendarEvents: CalendarEventsByDay[] = [];
  selectedEventByDay: CalendarEventsByDay = {
    date: '',
    events: [],
  };

  startDate: string = '';
  endDate: string = '';

  selectedDate: string = '';
  selectedEventIndex = -1;
  arrowIndex = -1;
  calendarFilters = calendarTypes;
  filtersActive: string[] = [];
  allMarked = true;
  constructor(private newsService: NewsService) {}
  ngOnInit(): void {
    this.arrangeDates();
    this.getEventsFromApi();
    this.arrowIndex = -1;
  }

  changeSelectedDate(operator: string) {
    if (operator === 'next') {
      const selectedDate = new Date(
        Date.UTC(
          new Date(this.selectedDate).getFullYear(),
          new Date(this.selectedDate).getMonth(),
          new Date(this.selectedDate).getDate() + 1,
          0,
          0,
          0
        )
      );
      this.selectedDate = selectedDate.toISOString().slice(0, -1);
      this.selectedDate = this.selectedDate
        .replace('Z', '')
        .replaceAll('"', '');
    } else if (operator === 'prev') {
      const selectedDate = new Date(
        Date.UTC(
          new Date(this.selectedDate).getFullYear(),
          new Date(this.selectedDate).getMonth(),
          new Date(this.selectedDate).getDate() - 1,
          0,
          0,
          0
        )
      );
      this.selectedDate = selectedDate.toISOString().slice(0, -1);
      this.selectedDate = this.selectedDate
        .replace('Z', '')
        .replaceAll('"', '');
    }
  }

  previusDay() {
    const startDate = new Date(
      Date.UTC(
        new Date(this.startDate).getFullYear(),
        new Date(this.startDate).getMonth(),
        new Date(this.startDate).getDate() - 1,
        0,
        0,
        0
      )
    );

    this.startDate = startDate.toISOString().slice(0, -1);
    this.startDate = this.startDate.replace('Z', '').replaceAll('"', '');

    this.changeSelectedDate('prev');

    this.checkForSelectedDateExistence();
  }
  nextDay() {
    const endDate = new Date(
      Date.UTC(
        new Date(this.endDate).getFullYear(),
        new Date(this.endDate).getMonth(),
        new Date(this.endDate).getDate() + 1,
        0,
        0,
        0
      )
    );

    this.endDate = endDate.toISOString().slice(0, -1);
    this.endDate = this.endDate.replace('Z', '').replaceAll('"', '');

    this.changeSelectedDate('next');

    this.checkForSelectedDateExistence();
  }
  private checkForSelectedDateExistence() {
    const index = this.calendarEvents.findIndex(
      (day) => day.date === this.selectedDate.slice(0, -4)
    );
    if (index === -1) {
      this.getEventsFromApi();
    } else {
      this.selectedEventByDay = this.calendarEvents[index];
    }
  }

  private arrangeDates() {
    const today = new Date(
      Date.UTC(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate(),
        0,
        0,
        0
      )
    );
    this.selectedDate = today.toISOString().slice(0, -1);
    this.startDate = today.toISOString().slice(0, -1);
    this.endDate = today.toISOString().slice(0, -1);

    this.selectedDate = this.selectedDate.replace('Z', '').replaceAll('"', '');
    this.startDate = this.startDate.replace('Z', '').replaceAll('"', '');
    this.endDate = this.endDate.replace('Z', '').replaceAll('"', '');
  }

  private splitDateAndTime(dateAndTime: string) {
    const date = dateAndTime.split('T')[0];
    const time =
      dateAndTime.split('T')[1].split(':')[0] +
      ':' +
      dateAndTime.split('T')[1].split(':')[1];
    return { date, time };
  }
  private getEventsFromApi() {
    this.newsService
      .getCalendarEventsByDates(this.startDate, this.endDate)
      .subscribe((res) => {
        this.calendarEvents = res.data;
        this.initEvents();
        const index = this.calendarEvents.findIndex(
          (day) => day.date === this.selectedDate.slice(0, -4)
        );
        this.selectedEventByDay = this.calendarEvents[index];
      });
  }

  private initEvents() {
    this.calendarEvents.forEach((day) => {
      day.events.forEach((event) => {
        const { date, time } = this.splitDateAndTime(event.dateAndTime);
        event.time = time;
        event.date = date;
        event.display = true;
      });
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
  private filterEvents() {
    this.calendarEvents.forEach((day) => {
      day.events.forEach((event) => {
        event.display = this.filtersActive.includes(event.type);
      });
    });
  }
  filterAllEvents() {
    this.allMarked = true;
    this.filtersActive = [];

    this.calendarEvents.forEach((day) => {
      day.events.forEach((event) => {
        event.display = true;
      });
    });
  }
}
