import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoryComponent } from './components/story/story.component';
import { CalendarPageWeeklyComponent } from './pages/calendar-page-weekly/calendar-page-weekly.component';
import { CalendarPageComponent } from './pages/calendar-page/calendar-page.component';
import { HomeComponent } from './pages/home/home.component';
import { VestiComponent } from './pages/vesti/vesti.component';

const routes: Routes = [
  { path: 'blog', component: VestiComponent },
  { path: 'tag/en-de', component: VestiComponent },
  { path: 'tag/covid-19', component: VestiComponent },
  { path: 'kulturazadecu', component: VestiComponent },
  { path: 'konkursi', component: VestiComponent },
  { path: 'kalendar/n', component: CalendarPageWeeklyComponent },
  { path: 'kalendar', component: CalendarPageComponent },
  { path: 'kritika', component: VestiComponent },
  { path: 'fokus', component: VestiComponent },
  { path: 'intervju', component: VestiComponent },
  { path: 'vesti', component: VestiComponent },
  { path: 'kategorija/:category', component: VestiComponent },
  { path: 'vest/:titleId', component: StoryComponent },
  { path: '', component: HomeComponent },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
