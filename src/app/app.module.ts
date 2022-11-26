import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { QuillModule } from 'ngx-quill';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateNewsComponent } from './pages/create-news/create-news.component';

@NgModule({
  declarations: [AppComponent, CreateNewsComponent],
  imports: [BrowserModule, AppRoutingModule, QuillModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
