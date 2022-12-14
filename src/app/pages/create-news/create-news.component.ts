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

  // editorContent!: string;
  // contentFromApi!: string;
  // storyToPut!: response;
  editorStyle = {
    height: '80vh',
  };
  editorForm!: FormGroup;
  ngOnInit(): void {
    this.editorForm = new FormGroup({
      editor: new FormControl(null),
    });
  }
  // changed(event: any) {
  //   this.http
  //     .get<response>(
  //       'https://localhost:7289/api/Story/2f7e4042-0166-4244-a70c-44b9681bcf2d'
  //     )
  //     .subscribe((res) => {
  //       event.root.innerHTML = res.data.htmlData;
  //       this.storyToPut = res;
  //     });
  // }
  // update() {
  //   console.log('fired');
  //   this.storyToPut.data.htmlData = this.editorForm.get('editor')?.value;
  //   this.http
  //     .put<response>('https://localhost:7289/api/Story', this.storyToPut.data)
  //     .subscribe((res) => {
  //       console.log(res);
  //     });
  // }
  // testApi() {
  //   console.log('fired');
  //   this.editorContent = this.editorForm.get('editor')?.value;
  //   console.log(this.editorForm.get('editor')?.value);
  //   this.http
  //     .post<response>('https://localhost:7289/api/Story', {
  //       htmlData: this.editorContent.toString(),
  //       title: 'string',
  //       description: 'string',
  //       category: 2,
  //     })
  //     .subscribe((res) => {
  //       if (res.data.htmlData != null) {
  //         this.contentFromApi = res.data.htmlData;
  //       }
  //       console.log(res);
  //     });
  // }
}
