import Link from 'next/link';
import Image from 'next/image';
import type { WPPost } from '@/types/wordpress';
import { formatDate, generateExcerpt, calculateReadingTime } from '@/lib/utils';

interface BlogCardProps {
  post: WPPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const readingTime = calculateReadingTime(post.content);
  const excerpt = generateExcerpt(post.excerpt, 150);

  return (
    <article className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      {post.featuredImage && (
        <Link href={`/blog/${post.slug}`}>
          <div className="relative h-48 w-full overflow-hidden group">
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </Link>
      )}
      
      <div className="p-6">
        <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
          <time dateTime={post.date}>
            {formatDate(post.date)}
          </time>
          <span>{readingTime} min read</span>
        </div>
        
        <Link href={`/blog/${post.slug}`}>
          <h2 className="text-2xl font-semibold mb-3 hover:text-blue-600 transition-colors cursor-pointer">
            {post.title}
          </h2>
        </Link>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {excerpt}
        </p>
        
        {post.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.categories.slice(0, 3).map(category => (
              <span 
                key={category}
                className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium"
              >
                {category}
              </span>
            ))}
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {post.author.avatar && (
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                width={24}
                height={24}
                className="rounded-full"
              />
            )}
            <span className="text-sm text-gray-600">{post.author.name}</span>
          </div>
          
          <Link 
            href={`/blog/${post.slug}`}
            className="text-blue-600 hover:underline font-medium text-sm"
          >
            Read more →
          </Link>
        </div>
      </div>
    </article>
  );
}