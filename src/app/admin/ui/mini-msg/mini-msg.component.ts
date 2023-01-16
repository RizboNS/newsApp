import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-mini-msg',
  templateUrl: './mini-msg.component.html',
  styleUrls: ['./mini-msg.component.css'],
})
export class MiniMsgComponent {
  @ViewChild('savedMsgEl') savedMsgEl!: ElementRef;
  @ViewChild('savedMsgContainer') savedMsgContainer!: ElementRef;

  constructor(private renderer: Renderer2) {}

  onSuccessMsg(msg: string): void {
    const newSavedMsgEl = this.renderer.createElement('p');
    const content = this.renderer.createText(msg);
    this.renderer.appendChild(newSavedMsgEl, content);
    this.renderer.addClass(newSavedMsgEl, 'savedMsg');
    this.renderer.addClass(newSavedMsgEl, 'savedMsgShow');
    this.renderer.appendChild(
      this.savedMsgContainer.nativeElement,
      newSavedMsgEl
    );
    setTimeout(() => {
      this.renderer.addClass(newSavedMsgEl, 'savedMsgHide');
    }, 3000);
    setTimeout(() => {
      this.renderer.removeChild(
        this.savedMsgContainer.nativeElement,
        newSavedMsgEl
      );
    }, 4000);
  }
  onErrorMsg(msg: string): void {
    const newSavedMsgEl = this.renderer.createElement('p');

    const content = this.renderer.createText(msg);
    this.renderer.appendChild(newSavedMsgEl, content);
    this.renderer.addClass(newSavedMsgEl, 'errorMsg');
    this.renderer.addClass(newSavedMsgEl, 'errorMsgShow');
    this.renderer.appendChild(
      this.savedMsgContainer.nativeElement,
      newSavedMsgEl
    );

    setTimeout(() => {
      this.renderer.addClass(newSavedMsgEl, 'errorMsgHide');
    }, 3000);
    setTimeout(() => {
      this.renderer.removeChild(
        this.savedMsgContainer.nativeElement,
        newSavedMsgEl
      );
    }, 4000);
  }
}
