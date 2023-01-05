import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vesti',
  templateUrl: './vesti.component.html',
  styleUrls: ['./vesti.component.css'],
})
export class VestiComponent implements OnInit {
  category = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.initCategory();
  }
  initCategory() {
    this.route.paramMap.subscribe((params) => {
      this.category = params.get('category')?.replaceAll('š', 's') || '';
    });
  }
}
