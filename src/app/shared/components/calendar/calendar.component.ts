import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { calendarTypes } from 'src/app/data/calendar-types';
import { CalendarEventsByDay } from 'src/app/models/calendar-events-by-day.model';
import { NewsService } from 'src/app/services/news.service';

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
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent {
  private calendarEvents: CalendarEventsByDay[] = [];
  selectedEventByDay: CalendarEventsByDay = {
    date: '',
    events: [],
  };
  selectedEventsByWeek: CalendarEventsByDay[] = [];

  startDate: string = '';
  endDate: string = '';

  @Output() changeRoute: EventEmitter<string> = new EventEmitter<string>();

  routePathDaily = 'daily';
  routePathWeekly = 'weekly';

  selectedRoute: string = '';
  selectedDate: string = '';
  selectedEventId: string = '';
  arrowId: string = '';
  calendarFilters = calendarTypes;
  filtersActive: string[] = [];
  allMarked = true;
  constructor(
    private newsService: NewsService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.onRouteChange('');
  }

  onRouteChange(routePath: string) {
    this.changeRoute.emit(routePath);
    const url = this.route.snapshot.url;
    if (url.length === 2) {
      this.selectedRoute = 'daily';
    } else if (url.length === 3) {
      this.selectedRoute = 'weekly';
    }
    this.arrangeDates();
    this.getEventsFromApi();
    this.arrowId = '';
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

  prev() {
    if (this.selectedRoute === 'daily') {
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
    } else if (this.selectedRoute === 'weekly') {
      const startDate = new Date(
        Date.UTC(
          new Date(this.startDate).getFullYear(),
          new Date(this.startDate).getMonth(),
          new Date(this.startDate).getDate() - 7,
          0,
          0,
          0
        )
      );
      const endDate = new Date(
        Date.UTC(
          new Date(this.endDate).getFullYear(),
          new Date(this.endDate).getMonth(),
          new Date(this.endDate).getDate() - 7,
          0,
          0,
          0
        )
      );

      this.startDate = startDate.toISOString().slice(0, -1);
      this.endDate = endDate.toISOString().slice(0, -1);
      this.startDate = this.startDate.replace('Z', '').replaceAll('"', '');
      this.endDate = this.endDate.replace('Z', '').replaceAll('"', '');

      this.changeSelectedDate('prev');

      this.checkForSelectedDateExistence();
    }
  }
  next() {
    if (this.selectedRoute === 'daily') {
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
    } else if (this.selectedRoute === 'weekly') {
      const endDate = new Date(
        Date.UTC(
          new Date(this.endDate).getFullYear(),
          new Date(this.endDate).getMonth(),
          new Date(this.endDate).getDate() + 7,
          0,
          0,
          0
        )
      );
      const startDate = new Date(
        Date.UTC(
          new Date(this.startDate).getFullYear(),
          new Date(this.startDate).getMonth(),
          new Date(this.startDate).getDate() + 7,
          0,
          0,
          0
        )
      );

      this.endDate = endDate.toISOString().slice(0, -1);
      this.startDate = startDate.toISOString().slice(0, -1);
      this.endDate = this.endDate.replace('Z', '').replaceAll('"', '');
      this.startDate = this.startDate.replace('Z', '').replaceAll('"', '');

      this.changeSelectedDate('next');

      this.checkForSelectedDateExistence();
    }
  }
  private checkForSelectedDateExistence() {
    if (this.selectedRoute === 'daily') {
      const index = this.calendarEvents.findIndex(
        (day) => day.date === this.selectedDate.slice(0, -4)
      );
      if (index === -1) {
        this.getEventsFromApi();
      } else {
        this.selectedEventByDay = this.calendarEvents[index];
      }
    } else if (this.selectedRoute === 'weekly') {
      console.log(this.calendarEvents);
      const startDateIndex = this.calendarEvents.findIndex(
        (day) => day.date === this.startDate.slice(0, -4)
      );
      console.log(startDateIndex);
      const endDateIndex = this.calendarEvents.findIndex(
        (day) => day.date === this.endDate.slice(0, -4)
      );
      console.log(endDateIndex);
      if (startDateIndex === -1 || endDateIndex === -1) {
        this.getEventsFromApi();
      } else {
        this.selectedEventsByWeek = this.calendarEvents.slice(
          startDateIndex,
          endDateIndex + 1
        );
      }
    }
  }
  private arrangeDates() {
    if (this.selectedRoute === 'daily') {
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

      this.selectedDate = this.selectedDate
        .replace('Z', '')
        .replaceAll('"', '');
      this.startDate = this.startDate.replace('Z', '').replaceAll('"', '');
      this.endDate = this.endDate.replace('Z', '').replaceAll('"', '');
    } else if (this.selectedRoute === 'weekly') {
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
      const day = today.getUTCDay();

      const monday = new Date(
        Date.UTC(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() - day + (day === 0 ? -6 : 1),
          0,
          0,
          0
        )
      );

      const sunday = new Date(
        Date.UTC(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() - day + (day === 0 ? 0 : 7),
          0,
          0,
          0
        )
      );

      this.selectedDate = today.toISOString().slice(0, -1);
      this.startDate = monday.toISOString().slice(0, -1);
      this.endDate = sunday.toISOString().slice(0, -1);

      this.selectedDate = this.selectedDate
        .replace('Z', '')
        .replaceAll('"', '');
      this.startDate = this.startDate.replace('Z', '').replaceAll('"', '');
      this.endDate = this.endDate.replace('Z', '').replaceAll('"', '');
    }
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
          }
        });

        this.initEvents();
        const index = this.calendarEvents.findIndex(
          (day) => day.date === this.selectedDate.slice(0, -4)
        );
        if (this.selectedRoute === 'daily') {
          this.selectedEventByDay = this.calendarEvents[index];
        } else if (this.selectedRoute === 'weekly') {
          const startDateIndex = this.calendarEvents.findIndex(
            (day) => day.date === this.startDate.slice(0, -4)
          );
          const endDateIndex = this.calendarEvents.findIndex(
            (day) => day.date === this.endDate.slice(0, -4)
          );
          this.selectedEventsByWeek = this.calendarEvents.slice(
            startDateIndex,
            endDateIndex + 1
          );
        }
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
  flip(id: string) {
    this.selectedEventId = id === this.selectedEventId ? '' : id;
    this.arrowId = id === this.arrowId ? '' : id;
  }

  getEventState(id: string) {
    return this.selectedEventId === id ? 'open' : 'closed';
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
