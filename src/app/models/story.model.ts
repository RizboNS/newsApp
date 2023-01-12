import { Category } from './category.model';
import { ImageDb } from './image-db.model';
import { Tag } from './tag.model';

export interface Story {
  id?: string;
  title: string;
  titleId?: string;
  htmlData: string;
  firstText?: string;
  type: string;
  typeDisplay?: string;
  createdTime?: string;
  updateTime?: string;
  publishTime: string;
  publish: boolean;
  category: Category;
  imageDbs?: ImageDb[];
  tags?: Tag[];
}
