import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Tag } from 'src/app/models/tag.model';

@Component({
  selector: 'app-manage-tags',
  templateUrl: './manage-tags.component.html',
  styleUrls: ['./manage-tags.component.css'],
})
export class ManageTagsComponent {
  newTag: string = '';
  @Input() manageTagsModalShow: boolean = false;
  @Output() state = new EventEmitter<boolean>();
  tags: Tag[] = [
    { tagName: 'Korona' },
    { tagName: 'Arhitektura' },
    { tagName: 'Nesto o Necemu' },
    { tagName: 'Industrija' },
    { tagName: 'Rat' },
    { tagName: 'Kultura' },
    { tagName: 'Bezveze' },
    { tagName: 'Majke' },
    { tagName: 'Muzika' },
    { tagName: 'Zivot' },
  ];

  onDeleteTag(tag: any) {
    this.tags = this.tags.filter((t) => t !== tag);
  }
  onAddTag() {
    if (this.newTag) {
      this.tags.push({ tagName: this.newTag });
      this.newTag = '';
    }
  }
  onClose(): void {
    this.state.emit(false);
    this.manageTagsModalShow = false;
  }
}
