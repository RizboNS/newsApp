import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminStoryComponent } from './pages/admin-story/admin-story.component';
import { AdminStoriesComponent } from './pages/admin-stories/admin-stories.component';
import { AdminPanelComponent } from './pages/admin-panel/admin-panel.component';
import { AdminCreateStoryComponent } from './pages/admin-create-story/admin-create-story.component';
import { AdminHeaderComponent } from './components/admin-header/admin-header.component';
import { AdminRoutingModule } from './admin-routing.module';
import { QuillModule } from 'ngx-quill';
import { AlertWindowComponent } from './ui/alert-window/alert-window.component';
import { FormsModule } from '@angular/forms';
import { AdminUpdateStoryComponent } from './pages/admin-update-story/admin-update-story.component';
import { ManageTagsComponent } from './ui/manage-tags/manage-tags.component';
import { AddTagsToStoryComponent } from './components/add-tags-to-story/add-tags-to-story.component';
import { AdminCreateCalendarEventComponent } from './pages/admin-create-calendar-event/admin-create-calendar-event.component';
import { AdminEventsComponent } from './pages/admin-events/admin-events.component';
import { AdminEventsWeeklyComponent } from './pages/admin-events-weekly/admin-events-weekly.component';
import { AdminCalendarEventsUpdateComponent } from './pages/admin-calendar-events-update/admin-calendar-events-update.component';

@NgModule({
  declarations: [
    AdminStoryComponent,
    AdminStoriesComponent,
    AdminPanelComponent,
    AdminCreateStoryComponent,
    AdminHeaderComponent,
    AlertWindowComponent,
    AdminUpdateStoryComponent,
    ManageTagsComponent,
    AddTagsToStoryComponent,
    AdminCreateCalendarEventComponent,
    AdminEventsComponent,
    AdminEventsWeeklyComponent,
    AdminCalendarEventsUpdateComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    QuillModule,
    FormsModule,
  ],
  exports: [AdminHeaderComponent],
})
export class AdminModule {}
