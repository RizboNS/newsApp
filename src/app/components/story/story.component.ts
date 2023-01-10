import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css'],
})
export class StoryComponent implements OnInit {
  titleId: string = '';
  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.asignTitleId();
  }
  asignTitleId(): void {
    this.route.params.subscribe((params) => {
      this.titleId = params['titleId'];
    });
  }
}
