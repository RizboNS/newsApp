import { Component } from '@angular/core';
import { articleTypesRoutes } from 'src/app/data/article-types';
import { CategoryMap } from 'src/app/models/category.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  categories = CategoryMap;
  articleTypes = articleTypesRoutes;
  bannerShow = true;

  bannerClose() {
    this.bannerShow = false;
  }
}
