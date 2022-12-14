import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CategoryMap } from 'src/app/models/category.model';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-admin-create-story',
  templateUrl: './admin-create-story.component.html',
  styleUrls: ['./admin-create-story.component.css'],
})
export class AdminCreateStoryComponent implements OnInit {
  categories = CategoryMap;

  editorForm!: FormGroup;
  constructor(private newsService: NewsService) {}
  ngOnInit(): void {
    this.editorForm = new FormGroup({
      htmlData: new FormControl(null),
      title: new FormControl(''),
      description: new FormControl(''),
      category: new FormControl(1),
    });
  }
  editorStyle = {
    height: '80vh',
  };
  onSubmit() {
    this.editorForm.value.category = parseInt(this.editorForm.value.category);
    console.log(this.editorForm.value);
    this.newsService.createStory(this.editorForm.value).subscribe((res) => {
      console.log(res);
      // TO DO Navigate to the story page and open the story
    });
  }
}
