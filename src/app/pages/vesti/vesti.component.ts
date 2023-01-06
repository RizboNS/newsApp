import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vesti',
  templateUrl: './vesti.component.html',
  styleUrls: ['./vesti.component.css'],
})
export class VestiComponent implements OnInit {
  category = '';
  type = 'all';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.initCategory();
    this.initType();
  }

  initType() {
    let url = this.route.snapshot.url;
    this.type = url[0].path || 'all';
    this.type = this.type === 'kategorija' ? 'all' : this.type;
    console.log(this.type);
  }

  initCategory() {
    this.route.paramMap.subscribe((params) => {
      this.category =
        params.get('category')?.replaceAll('š', 's').replaceAll('-', '') || '';
    });
  }
}
