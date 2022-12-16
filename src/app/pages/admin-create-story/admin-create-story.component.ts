import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CategoryMap } from 'src/app/models/category.model';
import { Story } from 'src/app/models/story.model';
import { NewsService } from 'src/app/services/news.service';
import 'quill-divider';

@Component({
  selector: 'app-admin-create-story',
  templateUrl: './admin-create-story.component.html',
  styleUrls: ['./admin-create-story.component.css'],
})
export class AdminCreateStoryComponent implements OnInit {
  categories = CategoryMap;
  icon: string = '';
  editorForm!: FormGroup;
  previewVeiwMode: string = 'Desktop';

  quillConfig = {
    toolbar: [
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
      ['link', 'image', 'video'],
      ['divider'],
    ],
    divider: {
      cssText: 'border: none;border-bottom: 1px inset;',
    },
  };

  constructor(private newsService: NewsService) {}
  ngOnInit(): void {
    this.editorForm = new FormGroup({
      htmlData: new FormControl(''),
      title: new FormControl(''),
      description: new FormControl(''),
      category: new FormControl(1),
      publish: new FormControl(false),
      publishDate: new FormControl(this.getDate()),
      publishTime: new FormControl(this.getTime()),
    });
  }
  editorStyle = {
    height: '80vh',
  };
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

  onFileSelect(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.icon = reader.result as string;
      };
    }
  }
  onSubmit(): void {
    let story: Story = this.editorForm.value;
    story.category = Number(story.category);
    story.icon = this.icon;
    console.log(story);
    this.newsService.createStory(story).subscribe((res) => {
      console.log(res);
      // TO DO Navigate to the story page and open the story
    });
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
