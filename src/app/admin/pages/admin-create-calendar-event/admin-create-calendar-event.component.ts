import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import 'quill-divider';
import { calendarTypes } from 'src/app/data/calendar-types';
import { NewsService } from 'src/app/services/news.service';

@Component({
  animations: [
    trigger('eventAnimationsState', [
      state(
        'open',
        style({
          height: '*',
          opacity: 1,
          transform: 'translateY(0)',
        })
      ),
      state(
        'closed',
        style({
          height: '0',
          opacity: 0,
          transform: 'translateY(-50%)',
        })
      ),
      transition('open => closed', [animate('0.3s')]),
      transition('closed => open', [animate('0.3s')]),
    ]),
  ],
  selector: 'app-admin-create-calendar-event',
  templateUrl: './admin-create-calendar-event.component.html',
  styleUrls: ['./admin-create-calendar-event.component.css'],
})
export class AdminCreateCalendarEventComponent implements OnInit {
  editorForm!: FormGroup;
  previewVeiwMode: string = 'Desktop';
  flipped: boolean = false;
  types = calendarTypes;
  editorStyle = {
    height: '250px',
  };
  quillConfig = {
    toolbar: {
      container: [
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
        ['link'],
        ['divider'],
      ],
    },
    divider: {
      cssText: 'border: none;border-bottom: 1px inset;',
    },
  };
  constructor(private fb: FormBuilder, private newsService: NewsService) {}
  ngOnInit(): void {
    this.editorForm = this.fb.group({
      htmlData: [''],
      title: ['', Validators.required],
      type: [this.types[0], Validators.required],
      date: [this.getDate()],
      time: [this.getTime()],
    });
  }
  onSubmit() {
    let event = this.mapToEvent();
    this.newsService.createCalendarEvent(event).subscribe((res) => {
      console.log(res);
    });
  }
  private getDate() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    let date = yyyy + '-' + mm + '-' + dd;
    return date;
  }
  private getTime(): string {
    let today = new Date();
    let hh = String(today.getHours()).padStart(2, '0');
    let mm = String(today.getMinutes()).padStart(2, '0');
    let time = hh + ':' + mm;
    return time;
  }
  mapToEvent() {
    let event = {
      title: this.editorForm.value.title,
      type: this.editorForm.value.type,
      dateAndTime: this.mergeDateAndTime(
        this.editorForm.value.date,
        this.editorForm.value.time
      ),
      content: this.editorForm.value.htmlData,
    };
    return event;
  }
  private mergeDateAndTime(date: string, time: string): string {
    let dateTime = date + 'T' + time;
    return dateTime;
  }
  onTypeChange() {}
  checkScreenSize(): boolean {
    if (window.matchMedia('(max-width: 768px)').matches) {
      return true;
    }
    return false;
  }
  setPreviewViewMode() {
    if (this.previewVeiwMode === 'Desktop') {
      this.previewVeiwMode = 'Mobile';
    } else {
      this.previewVeiwMode = 'Desktop';
    }
  }
  flip() {
    this.flipped = !this.flipped;
  }
  getEventState() {
    return this.flipped ? 'open' : 'closed';
  }
}
