import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import 'quill-divider';

@Component({
  selector: 'app-admin-create-calendar-event',
  templateUrl: './admin-create-calendar-event.component.html',
  styleUrls: ['./admin-create-calendar-event.component.css'],
})
export class AdminCreateCalendarEventComponent implements OnInit {
  editorForm!: FormGroup;
  previewVeiwMode: string = 'Desktop';
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
  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.editorForm = this.fb.group({
      htmlData: [''],
      title: ['', Validators.required],
      date: [this.getDate()],
      time: [this.getTime()],
    });
  }
  onSubmit() {
    console.log(this.editorForm.value);
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
}