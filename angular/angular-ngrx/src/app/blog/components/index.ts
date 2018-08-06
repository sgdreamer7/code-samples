import { BlogComponent } from './blog/blog.component';
import { BlogHeaderComponent } from './blog-header/blog-header.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostComponent } from './post/post.component';

export const components: any[] = [
  BlogComponent,
  BlogHeaderComponent,
  PostListComponent,
  PostComponent
];

export * from './blog/blog.component';
export * from './blog-header/blog-header.component';
export * from './post-list/post-list.component';
export * from './post/post.component';
