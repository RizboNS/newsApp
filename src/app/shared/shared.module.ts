import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SanitizeHtmlPipe } from './pipes/sanitize-html.pipe';
import { LoadingComponent } from './ui/loading/loading.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { MiniMsgComponent } from './ui/mini-msg/mini-msg.component';

@NgModule({
  declarations: [
    SanitizeHtmlPipe,
    LoadingComponent,
    CalendarComponent,
    MiniMsgComponent,
  ],
  imports: [CommonModule],
  exports: [
    SanitizeHtmlPipe,
    LoadingComponent,
    CalendarComponent,
    MiniMsgComponent,
  ],
})
export class SharedModule {}
