import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SanitizeHtmlPipe } from './pipes/sanitize-html.pipe';
import { LoadingComponent } from './ui/loading/loading.component';

@NgModule({
  declarations: [SanitizeHtmlPipe, LoadingComponent],
  imports: [CommonModule],
  exports: [SanitizeHtmlPipe, LoadingComponent],
})
export class SharedModule {}
