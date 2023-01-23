import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { QuillModule } from 'ngx-quill';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoryComponent } from './components/story/story.component';
import { SharedModule } from './shared/shared.module';
import { AdminModule } from './admin/admin.module';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { StoriesComponent } from './components/stories/stories.component';
import { CarouselComponent } from './ui/carousel/carousel.component';
import { VestiComponent } from './pages/vesti/vesti.component';
import { CalendarPageComponent } from './pages/calendar-page/calendar-page.component';
import { CalendarPageWeeklyComponent } from './pages/calendar-page-weekly/calendar-page-weekly.component';
import { CalendarDetailsComponent } from './componenets/calendar-details/calendar-details.component';

@NgModule({
  declarations: [
    AppComponent,
    StoryComponent,
    HomeComponent,
    HeaderComponent,
    StoriesComponent,
    CarouselComponent,
    VestiComponent,
    CalendarPageComponent,
    CalendarPageWeeklyComponent,
    CalendarDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    QuillModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    AdminModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
