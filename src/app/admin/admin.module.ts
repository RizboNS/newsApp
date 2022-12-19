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

@NgModule({
  declarations: [
    AdminStoryComponent,
    AdminStoriesComponent,
    AdminPanelComponent,
    AdminCreateStoryComponent,
    AdminHeaderComponent,
    AlertWindowComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    QuillModule,
  ],
  exports: [AdminHeaderComponent],
})
export class AdminModule {}
