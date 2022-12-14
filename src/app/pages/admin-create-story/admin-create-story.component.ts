import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-admin-create-story',
  templateUrl: './admin-create-story.component.html',
  styleUrls: ['./admin-create-story.component.css'],
})
export class AdminCreateStoryComponent implements OnInit {
  ngOnInit(): void {
    this.editorForm = new FormGroup({
      editor: new FormControl(''),
    });
  }
  editorForm!: FormGroup;
  editorStyle = {
    height: '80vh',
  };
  onSubmit() {
    console.log(this.editorForm.value.editor);
  }
}
