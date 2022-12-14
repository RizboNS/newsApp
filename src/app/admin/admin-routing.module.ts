import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminStoryComponent } from './pages/admin-story/admin-story.component';
import { AdminStoriesComponent } from './pages/admin-stories/admin-stories.component';
import { AdminCreateStoryComponent } from './pages/admin-create-story/admin-create-story.component';
import { AdminPanelComponent } from './pages/admin-panel/admin-panel.component';
import { AdminUpdateStoryComponent } from './pages/admin-update-story/admin-update-story.component';
import { ManageTagsComponent } from './ui/manage-tags/manage-tags.component';

const routes: Routes = [
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
