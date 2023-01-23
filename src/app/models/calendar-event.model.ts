export interface CalendarEvent {
  id?: string;
  title: string;
  content: string;
  dateAndTime: string;
  date?: string;
  time?: string;
}
export const calendarDummyData: CalendarEvent[] = [
  {
    id: '1',
    title: 'Kulturni centar Beograda',
    content: 'Kulturni centar Beograda',
    dateAndTime: '2023-01-01T10:00:00',
  },
  {
    id: '2',
    title: 'Kulturni centar Beograda',
    content: 'Kulturni centar Beograda',
    dateAndTime: '2022-11-01T11:00:00',
  },
  {
    id: '3',
    title: 'Kulturni centar Beograda',
    content: 'Kulturni centar Beograda',
    dateAndTime: '2022-12-01T12:00:00',
  },
  {
    id: '4',
    title: 'Kulturni centar Beograda',
    content: 'Kulturni centar Beograda',
    dateAndTime: '2020-01-01T13:00:00',
  },
];
