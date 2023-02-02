import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SanitizeHtmlPipe } from './pipes/sanitize-html.pipe';
import { LoadingComponent } from './ui/loading/loading.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { MiniMsgComponent } from './ui/mini-msg/mini-msg.component';
import { DropDownComponent } from './ui/drop-down/drop-down.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    SanitizeHtmlPipe,
    LoadingComponent,
    CalendarComponent,
    MiniMsgComponent,
    DropDownComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    SanitizeHtmlPipe,
    LoadingComponent,
    CalendarComponent,
    MiniMsgComponent,
    DropDownComponent,
  ],
})
export class SharedModule {}
