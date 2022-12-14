import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminCreateStoryComponent } from './pages/admin-create-story/admin-create-story.component';
import { AdminPanelComponent } from './pages/admin-panel/admin-panel.component';
import { AdminStoriesComponent } from './pages/admin-stories/admin-stories.component';
import { AdminStoryComponent } from './pages/admin-story/admin-story.component';

const routes: Routes = [
  { path: 'admin/story/:id', component: AdminStoryComponent },
  { path: 'admin/stories', component: AdminStoriesComponent },
  { path: 'admin/create-story', component: AdminCreateStoryComponent },
  { path: 'admin', component: AdminPanelComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
