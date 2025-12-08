export interface WPPost {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  categories: string[];
  author: {
    name: string;
    avatar?: string;
  };
}
