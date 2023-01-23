import { CalendarEvent } from './calendar-event.model';

export interface CalendarEventsByDay {
  dateAndTime: string;
  events: CalendarEvent[];
  pageCount: number;
  pageSize: number;
  page: number;
}
export const calendarDummyData: CalendarEventsByDay = {
  dateAndTime: '2023-01-03T00:00:00',
  pageCount: 1,
  pageSize: 10,
  page: 1,
  events: [
    {
      id: '1',
      title: 'Kulturni centar Beograda',
      content: 'Kulturni centar Beograda',
      dateAndTime: '2023-01-03T14:00:00',
    },
    {
      id: '2',
      title: 'Kulturni centar Beograda',
      content: 'Kulturni centar Beograda',
      dateAndTime: '2023-01-03T16:30:00',
    },
    {
      id: '3',
      title: 'Kulturni centar Beograda',
      content: 'Kulturni centar Beograda',
      dateAndTime: '2023-01-03T17:45:00',
    },
    {
      id: '4',
      title: 'Kulturni centar Beograda',
      content: 'Kulturni centar Beograda',
      dateAndTime: '2023-01-03T18:00:00',
    },
  ],
};

//   {
//     dateAndTime: '2023-01-02T10:00:00',
//     events: [
//       {
//         id: '1',
//         title: 'Kulturni centar Beograda',
//         content: 'Kulturni centar Beograda',
//         dateAndTime: '22023-01-02T10:00:00',
//       },
//       {
//         id: '2',
//         title: 'Kulturni centar Beograda',
//         content: 'Kulturni centar Beograda',
//         dateAndTime: '2023-01-02T11:00:00',
//       },
//       {
//         id: '3',
//         title: 'Kulturni centar Beograda',
//         content: 'Kulturni centar Beograda',
//         dateAndTime: '2023-01-02T14:00:00',
//       },
//       {
//         id: '4',
//         title: 'Kulturni centar Beograda',
//         content: 'Kulturni centar Beograda',
//         dateAndTime: '2023-01-02T19:00:00',
//       },
//     ],
//   },
//   {
//     dateAndTime: '2023-01-01T10:00:00',
//     events: [
//       {
//         id: '1',
//         title: 'Kulturni centar Beograda',
//         content: 'Kulturni centar Beograda',
//         dateAndTime: '2023-01-01T10:00:00',
//       },
//       {
//         id: '2',
//         title: 'Kulturni centar Beograda',
//         content: 'Kulturni centar Beograda',
//         dateAndTime: '2023-01-01T11:00:00',
//       },
//       {
//         id: '3',
//         title: 'Kulturni centar Beograda',
//         content: 'Kulturni centar Beograda',
//         dateAndTime: '2023-01-01T12:00:00',
//       },
//       {
//         id: '4',
//         title: 'Kulturni centar Beograda',
//         content: 'Kulturni centar Beograda',
//         dateAndTime: '2023-01-01T13:00:00',
//       },
//     ],
//   },
// ];