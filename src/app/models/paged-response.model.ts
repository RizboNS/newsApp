import { Story } from './story.model';

export interface PagedResponse {
  pageCount: number;
  pageSize: number;
  page: string;
  stories: Story[];
}
