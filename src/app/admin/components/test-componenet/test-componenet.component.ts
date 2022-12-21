import { Component, ViewChild } from '@angular/core';
import { QuillEditorComponent, QuillModules } from 'ngx-quill';

@Component({
  selector: 'app-test-componenet',
  template: `
    <button type="button" (click)="addImage()">Add Image</button>
    <quill-editor
      #editor
      [(ngModel)]="editorContent"
      [modules]="modules"
      (onContentChanged)="onContentChanged()"
    >
    </quill-editor>
  `,
  styleUrls: ['./test-componenet.component.css'],
})
export class TestComponenetComponent {
  editorContent: string = '';

  modules: QuillModules = {
    toolbar: [],
  };

  @ViewChild('editor', { static: false }) editor:
    | QuillEditorComponent
    | undefined;

  onContentChanged() {
    if (this.editor !== undefined) {
      const length = this.editorContent.length;
      this.editor.quillEditor.setSelection(length, 0);
    }
  }

  addImage() {
    // Create an input element with type "file"
    const input = document.createElement('input');
    input.type = 'file';

    // Listen for changes to the input element's value
    input.addEventListener('change', (event: Event) => {
      // Get the HTMLInputElement that triggered the event
      const inputElement = event.target as HTMLInputElement;

      // Get the FileList object representing the list of files selected by the user
      const files = inputElement.files ?? new FileList();

      // Check if the list is empty or if the first file is not an image

      if (!files.length || !files[0].type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      // Get the selected file
      const file = files[0];

      // Prompt the user for an atl tag for the image
      const altTag = prompt('Enter an alt tag for the image:');

      // Create a FileReader to read the selected file
      const reader = new FileReader();

      // Listen for the "load" event, which is triggered when the FileReader has finished reading the file
      reader.addEventListener('load', () => {
        // Get the file's data as a data URL
        const dataUrl = reader.result;

        // Insert the image with the provided alt tag and data URL
        this.editorContent += `<img alt="${altTag}" src="${dataUrl}" />`;
      });

      // Start reading the file
      reader.readAsDataURL(file);
    });

    // Simulate a click on the input element to open the file selector dialog
    input.click();
  }
}
