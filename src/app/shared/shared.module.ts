import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SanitizeHtmlPipe } from './pipes/sanitize-html.pipe';
import { LoadingComponent } from './ui/loading/loading.component';
import { CalendarComponent } from './components/calendar/calendar.component';

@NgModule({
  declarations: [SanitizeHtmlPipe, LoadingComponent, CalendarComponent],
  imports: [CommonModule],
  exports: [SanitizeHtmlPipe, LoadingComponent, CalendarComponent],
})
export class SharedModule {}
