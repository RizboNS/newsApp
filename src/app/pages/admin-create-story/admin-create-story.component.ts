import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CategoryMap } from 'src/app/models/category.model';
import { Story } from 'src/app/models/story.model';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-admin-create-story',
  templateUrl: './admin-create-story.component.html',
  styleUrls: ['./admin-create-story.component.css'],
})
export class AdminCreateStoryComponent implements OnInit {
  categories = CategoryMap;
  icon: string = '';
  editorForm!: FormGroup;
  constructor(private newsService: NewsService) {}
  ngOnInit(): void {
    this.editorForm = new FormGroup({
      htmlData: new FormControl(''),
      title: new FormControl(''),
      description: new FormControl(''),
      category: new FormControl(1),
    });
  }
  editorStyle = {
    height: '80vh',
  };
  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.icon = reader.result as string;
      };
    }
  }
  onSubmit() {
    let story: Story = this.editorForm.value;
    story.category = Number(story.category);
    story.icon = this.icon;
    console.log(story);
    this.newsService.createStory(story).subscribe((res) => {
      console.log(res);
      // TO DO Navigate to the story page and open the story
    });
  }
}
