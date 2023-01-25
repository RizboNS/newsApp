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

  editorStyle = {
    height: '80vh',
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
    });
  }
}
