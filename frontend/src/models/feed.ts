import { Post } from './posts';

export interface GetFeedResponse {
  count: number;
  next: string;
  results: Post[];
}
