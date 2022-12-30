import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryMap } from 'src/app/models/category.model';
import { Story } from 'src/app/models/story.model';
import { NewsService } from 'src/app/services/news.service';
import 'quill-divider';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import Quill from 'quill';
import { QuillEditorComponent } from 'ngx-quill';

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

  @ViewChild('editor', { static: false }) editor:
    | QuillEditorComponent
    | undefined;

  alertTitle: string = '';
  alertMessage: string = '';
  alertShow: boolean = false;

  showAlertMsg: boolean = false;

  imageSrc: any;

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
        ['link', 'image', 'video'],
        ['divider'],
      ],
      handlers: {
        image: () => {
          this.addImage();
        },
      },
    },
    divider: {
      cssText: 'border: none;border-bottom: 1px inset;',
    },
  };

  constructor(
    private newsService: NewsService,
    private router: Router,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.editorForm = this.fb.group({
      htmlData: [''],
      title: ['', Validators.required],
      description: ['', Validators.required],
      category: [1],
      publish: [false],
      publishDate: [this.getDate()],
      publishTime: [this.getTime()],
    });
  }
  editorStyle = {
    height: '80vh',
  };

  addImage() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.addEventListener('change', (event: Event) => {
      const inputElement = event.target as HTMLInputElement;

      const files = inputElement.files ?? new FileList();

      if (!files.length || !files[0].type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      const file = files[0];
      const altTag = prompt('Enter an alt tag for the image:');
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        const dataUrl = reader.result;
        const data = `<img alt="${altTag}" src="${dataUrl}" />`;
        if (this.editor && this.editor.quillEditor) {
          const range = this.editor.quillEditor.getSelection();
          const index = range
            ? range.index
            : this.editor.quillEditor.getLength();
          this.editor.quillEditor.clipboard.dangerouslyPasteHTML(
            index,
            data,
            'user'
          );
          const newIndex = index + data.length;
          this.editor.quillEditor.setSelection(newIndex, 0, 'api');
        }
      });
      reader.readAsDataURL(file);
    });

    input.click();
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
  private mergeDateAndTime(date: string, time: string): string {
    let dateTime = date + 'T' + time;
    return dateTime;
  }
  onFileSelect(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.icon = reader.result as string;
      };
      this.imageSrc = this.sanitizer.bypassSecurityTrustUrl(
        URL.createObjectURL(file)
      );
    }
  }
  removeImage() {
    this.icon = '';
    this.imageSrc = '';
  }

  onSubmit(): void {
    let story: Story = this.mapStory();
    console.log(story);
    this.newsService
      .createStory(story)
      .pipe(take(1))
      .subscribe({
        next: async (res) => {
          if (res.success) {
            await this.showAlert('Success', 'Story created successfully');
            this.navigateToStory(res.data.id);
          }
        },
        error: (err) => {
          this.showAlert('Error', err.error.message);
        },
      });
  }
  async showAlert(title: string, message: string) {
    this.alertTitle = title;
    this.alertMessage = message;
    this.alertShow = true;
    await new Promise((resolve) => setTimeout(resolve, 50));
    while (this.alertShow) {
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
  }

  navigateToStory(id: string | undefined): void {
    if (id === undefined) {
      return;
    }
    this.router.navigate(['/admin/story/' + id]);
  }
  mapStory(): Story {
    let story: Story = {
      title: this.editorForm.value.title,
      description: this.editorForm.value.description,
      htmlData: this.editorForm.value.htmlData,
      category: Number(this.editorForm.value.category),
      publish: this.editorForm.value.publish,
      publishTime: this.mergeDateAndTime(
        this.editorForm.value.publishDate,
        this.editorForm.value.publishTime
      ),
      icon: this.icon,
    };
    return story;
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

  async validationErrorMsg() {
    await this.showAlert(
      'Validation Error',
      'Please fill all the required fields and upload an icon.'
    );
  }
}
