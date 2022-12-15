import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { QuillModule } from 'ngx-quill';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateNewsComponent } from './pages/create-news/create-news.component';
import { UpdateNewsComponent } from './pages/update-news/update-news.component';
import { StoryComponent } from './components/story/story.component';
import { AdminPanelComponent } from './pages/admin-panel/admin-panel.component';
import { AdminStoriesComponent } from './pages/admin-stories/admin-stories.component';
import { AdminHeaderComponent } from './components/admin-header/admin-header.component';
import { AdminCreateStoryComponent } from './pages/admin-create-story/admin-create-story.component';
import { AdminStoryComponent } from './pages/admin-story/admin-story.component';
import { SanitizeHtmlPipe } from './pipes/sanitize-html.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CreateNewsComponent,
    UpdateNewsComponent,
    StoryComponent,
    AdminPanelComponent,
    AdminStoriesComponent,
    AdminHeaderComponent,
    AdminCreateStoryComponent,
    AdminStoryComponent,
    SanitizeHtmlPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    QuillModule.forRoot({
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote', 'code-block'],
          [{ header: 1 }, { header: 2 }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ script: 'sub' }, { script: 'super' }],
          [{ indent: '-1' }, { indent: '+1' }],
          [{ size: ['small', false, 'large', 'huge'] }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ color: [] }, { background: [] }],
          ['clean'],
          ['link', 'image', 'video'],
        ],
      },
    }),
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
