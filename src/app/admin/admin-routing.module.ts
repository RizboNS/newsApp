import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminStoryComponent } from './pages/admin-story/admin-story.component';
import { AdminStoriesComponent } from './pages/admin-stories/admin-stories.component';
import { AdminCreateStoryComponent } from './pages/admin-create-story/admin-create-story.component';
import { AdminPanelComponent } from './pages/admin-panel/admin-panel.component';
import { AdminUpdateStoryComponent } from './pages/admin-update-story/admin-update-story.component';
import { ManageTagsComponent } from './ui/manage-tags/manage-tags.component';
import { AdminCreateCalendarEventComponent } from './pages/admin-create-calendar-event/admin-create-calendar-event.component';
import { AdminEventsComponent } from './pages/admin-events/admin-events.component';
import { AdminEventsWeeklyComponent } from './pages/admin-events-weekly/admin-events-weekly.component';
import { AdminCalendarEventsUpdateComponent } from './pages/admin-calendar-events-update/admin-calendar-events-update.component';

const routes: Routes = [
  { path: 'admin/events/weekly', component: AdminEventsWeeklyComponent },
  { path: 'admin/events', component: AdminEventsComponent },
  {
    path: 'admin/update-calendar-event/:id',
    component: AdminCalendarEventsUpdateComponent,
  },
  {
    path: 'admin/create-calendar-event',
    component: AdminCreateCalendarEventComponent,
  },
  { path: 'admin/manage-tags', component: ManageTagsComponent },
  { path: 'admin/update-story/:id', component: AdminUpdateStoryComponent },
  { path: 'admin/story/:id', component: AdminStoryComponent },
  { path: 'admin/stories', component: AdminStoriesComponent },
  { path: 'admin/create-story', component: AdminCreateStoryComponent },
  { path: 'admin', component: AdminPanelComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
