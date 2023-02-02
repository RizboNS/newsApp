import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { CalendarEventsByDay } from 'src/app/models/calendar-events-by-day.model';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-calendar-mini',
  templateUrl: './calendar-mini.component.html',
  styleUrls: ['./calendar-mini.component.css'],
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
})
export class CalendarMiniComponent implements OnInit {
  private calendarEvents: CalendarEventsByDay[] = [];
  calendarEventsByDay: CalendarEventsByDay = {
    date: '',
    events: [],
  };
  arrowId: string = '';
  selectedEventId: string = '';
  selectedDate: string = '';
  startDate: string = '';
  endDate: string = '';

  constructor(private newsService: NewsService) {}
  ngOnInit(): void {
    this.arrangeDates();
    this.getEventsFromApi();
    this.arrowId = '';
    console.log(this.calendarEvents);
  }

  flip(id: string) {
    console.log('flip clicked');
    // this.selectedEventId = id === this.selectedEventId ? '' : id;
    // this.arrowId = id === this.arrowId ? '' : id;
  }
  getEventState(id: string) {
    return this.selectedEventId === id ? 'open' : 'closed';
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
        res.data.forEach((day) => {
          if (
            this.calendarEvents.findIndex((d) => d.date === day.date) === -1
          ) {
            this.calendarEvents.push(day);
          } else {
            const index = this.calendarEvents.findIndex(
              (d) => d.date === day.date
            );
            if (this.calendarEvents[index].events.length != day.events.length)
              this.calendarEvents[index] = day;
          }
        });

        this.initEvents();
        const index = this.calendarEvents.findIndex(
          (day) => day.date === this.selectedDate.slice(0, -4)
        );
        this.calendarEventsByDay = this.calendarEvents[index];
      });
  }
}
