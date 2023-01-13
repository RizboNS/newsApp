import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})
export class CarouselComponent implements OnInit {
  @Input() images: string[] | undefined = [];

  imagesToShow: string[] = [];
  activeIndex = 0;

  ngOnInit(): void {
    this.initImages();
    this.slideImages();
  }

  initImages(): void {
    if (this.images) {
      this.imagesToShow = this.images.slice(0, 3);
    }
  }
  slideImages(): void {
    let randomInerval = this.getRandomInterval();
    setInterval(() => {
      this.activeIndex = (this.activeIndex + 1) % this.imagesToShow.length;
    }, randomInerval);
  }
  getRandomInterval(): number {
    return Math.floor(Math.random() * 7000) + 4000;
  }
}
