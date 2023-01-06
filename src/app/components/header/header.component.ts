import { Component } from '@angular/core';
import { articleTypes } from 'src/app/data/article-types';
import { CategoryMap } from 'src/app/models/category.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  categories = CategoryMap;
  articleTypes = articleTypes;
  bannerShow = true;

  bannerClose() {
    this.bannerShow = false;
  }
}
