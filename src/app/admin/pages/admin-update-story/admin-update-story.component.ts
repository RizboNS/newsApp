import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { QuillEditorComponent } from 'ngx-quill';
import { take } from 'rxjs';
import { CategoryMap } from 'src/app/models/category.model';
import { Story } from 'src/app/models/story.model';
import { NewsService } from 'src/app/services/news.service';
import { articleTypesSetTypes } from 'src/app/data/article-types';
import { Tag } from 'src/app/models/tag.model';

@Component({
  selector: 'app-admin-update-story',
  templateUrl: './admin-update-story.component.html',
  styleUrls: ['./admin-update-story.component.css'],
})
export class AdminUpdateStoryComponent {
  categories = CategoryMap;
  types = articleTypesSetTypes;
  editorForm!: FormGroup;
  previewVeiwMode: string = 'Desktop';
  chosenTags: string[] = [];

  @ViewChild('editor', { static: false }) editor:
    | QuillEditorComponent
    | undefined;

  alertTitle: string = '';
  alertMessage: string = '';
  alertShow: boolean = false;
  showAlertMsg: boolean = false;
  manageTagsModalShow: boolean = false;
  isBlogSelected = false;

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
  editorStyle = {
    height: '695px',
  };

  constructor(
    private newsService: NewsService,
    private router: Router,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.editorForm = this.fb.group({
      htmlData: [''],
      title: ['', Validators.required],
      type: ['type', Validators.required],
      category: [1],
      publish: [false],
      publishDate: [this.getDate()],
      publishTime: [this.getTime()],
      updateTime: [],
      createdTime: [],
    });
    const id = this.readIdFromRoute();
    this.newsService
      .getStoryById(id)
      .pipe(take(1))
      .subscribe({
        next: async (res) => {
          const story = res.data;
          console.log(story);
          this.editorForm.patchValue({
            htmlData: story.htmlData,
            title: story.title,
            type: story.type,
            category: story.category,
            publish: story.publish,
            publishDate: this.splitDateAndTime(story.publishTime)[0],
            publishTime: this.splitDateAndTime(story.publishTime)[1],
            updateTime: story.updateTime,
            createdTime: story.createdTime,
          });
          if (story.tagNames !== undefined) {
            this.chosenTags = story.tagNames;
          }

          this.onTypeChange();
        },
        error: async (err) => {
          this.alertTitle = 'Error';
          this.alertMessage = err.message;
          this.alertShow = true;
        },
      });
  }
  readIdFromRoute(): string {
    return this.route.snapshot.params['id'];
  }
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
  splitDateAndTime(dateTime: string | undefined): string[] {
    if (dateTime === undefined) {
      return ['', ''];
    }
    let dateAndTime = dateTime.split('T');
    return dateAndTime;
  }
  onSubmit(): void {
    let story: Story = this.mapStory();
    console.log(story);
    this.newsService
      .updateStory(story)
      .pipe(take(1))
      .subscribe({
        next: async (res) => {
          if (res.success) {
            await this.showAlert('Success', 'Story updated successfully');
            this.navigateToStory(res.data.id);
          }
        },
        error: (err) => {
          this.showAlert('Error', err.error.message);
          console.log(err);
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

  mapTags(tags: string[]): Tag[] {
    let tagList: Tag[] = [];
    tags.forEach((tag) => {
      tagList.push({ tagName: tag });
    });
    return tagList;
  }
  mapStory(): Story {
    let story: Story = {
      id: this.readIdFromRoute(),
      title: this.editorForm.value.title,
      type: this.editorForm.value.type,
      htmlData:
        this.editorForm.value.htmlData == null
          ? ''
          : this.editorForm.value.htmlData,
      category: Number(this.editorForm.value.category),
      publish: this.editorForm.value.publish,
      publishTime: this.mergeDateAndTime(
        this.editorForm.value.publishDate,
        this.editorForm.value.publishTime
      ),
      tags: this.mapTags(this.chosenTags),
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
  onTypeChange() {
    if (this.editorForm.value.type === 'blog') {
      this.editorForm.controls['category'].clearValidators();
      this.editorForm.controls['category'].setValue(''); // remove category value
      this.editorForm.controls['category'].updateValueAndValidity();
      this.isBlogSelected = true;
    } else {
      this.editorForm.controls['category'].setValidators(Validators.required);
      this.editorForm.controls['category'].setValue(1); // set default category value
      this.editorForm.controls['category'].updateValueAndValidity();
      this.isBlogSelected = false;
    }
  }
  onChosenTagChange(chosenTags: string[]): void {
    this.chosenTags = chosenTags;
    console.log(this.chosenTags);
  }
  openManageTagsModal() {
    this.manageTagsModalShow = true;
  }
  async validationErrorMsg() {
    await this.showAlert(
      'Validation Error',
      'Please fill all the required fields.'
    );
  }
}
