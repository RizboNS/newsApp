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
    console.log(url);
    if (url.length === 1) {
      this.type = url[0].path || 'all';
    } else if (url.length > 1) {
      this.type = url[1].path || 'all';
    }
    this.type = this.type === 'kategorija' ? 'all' : this.type;
  }

  initCategory() {
    this.route.paramMap.subscribe((params) => {
      this.category =
        params.get('category')?.replaceAll('š', 's').replaceAll('-', '') || '';
    });
  }
}
