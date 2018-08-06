export class Post {
  id: number;
  title: string;
  author: string;
  created_at: string;
  body: string;
  preview: string;
  thumbnail: string;
  categories: { id: number, name: string }[];
}
