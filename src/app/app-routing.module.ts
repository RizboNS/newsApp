import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoryComponent } from './components/story/story.component';
import { HomeComponent } from './pages/home/home.component';
import { VestiComponent } from './pages/vesti/vesti.component';

const routes: Routes = [
  { path: 'konkursi', component: VestiComponent },
  { path: 'kritika', component: VestiComponent },
  { path: 'fokus', component: VestiComponent },
  { path: 'intervju', component: VestiComponent },
  { path: 'vesti', component: VestiComponent },
  { path: 'kategorija/:category', component: VestiComponent },
  { path: 'story', component: StoryComponent }, // TO DO - add route params and change to serbian
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
