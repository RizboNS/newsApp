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

@NgModule({
  declarations: [AppComponent, StoryComponent, HomeComponent],
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
