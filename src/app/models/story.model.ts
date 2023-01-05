import { Category } from './category.model';
import { ImageDb } from './image-db.model';

export interface Story {
  id?: string;
  title: string;
  description: string;
  htmlData: string;
  createdTime?: string;
  updateTime?: string;
  publishTime: string;
  publish: boolean;
  category: Category;
  imageDbs?: ImageDb[];
}
