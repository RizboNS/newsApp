import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-news',
  templateUrl: './create-news.component.html',
  styleUrls: ['./create-news.component.css'],
})
export class CreateNewsComponent implements OnInit {
  constructor(private http: HttpClient) {}

  editorContent!: string;
  contentFromApi!: string;
  editorStyle = {
    height: '80vh',
  };
  editorForm!: FormGroup;
  ngOnInit(): void {
    this.editorForm = new FormGroup({
      editor: new FormControl(null),
    });
  }
  onSubmit(): void {
    this.editorContent = this.editorForm.get('editor')?.value;
    console.log(this.editorForm.get('editor')?.value);
  }
  testApi() {
    this.editorContent = this.editorForm.get('editor')?.value;

    this.http
      .post<response>('https://localhost:7289/api/News', {
        htmlData: this.editorContent.toString(),
      })
      .subscribe((res) => {
        this.contentFromApi = res.htmlData;
      });
  }
}
export interface response {
  htmlData: string;
}
