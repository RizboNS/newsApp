import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SanitizeHtmlPipe } from './pipes/sanitize-html.pipe';
import { LoadingComponent } from './ui/loading/loading.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { MiniMsgComponent } from './ui/mini-msg/mini-msg.component';
import { DropDownComponent } from './ui/drop-down/drop-down.component';
import { RouterModule } from '@angular/router';
import { CalendarMiniComponent } from './components/calendar-mini/calendar-mini.component';

@NgModule({
  declarations: [
    SanitizeHtmlPipe,
    LoadingComponent,
    CalendarComponent,
    MiniMsgComponent,
    DropDownComponent,
    CalendarMiniComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    SanitizeHtmlPipe,
    LoadingComponent,
    CalendarComponent,
    MiniMsgComponent,
    DropDownComponent,
    CalendarMiniComponent,
  ],
})
export class SharedModule {}
