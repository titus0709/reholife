import Image from 'next/image';
import Link from 'next/link';
import { fetchGraphQL } from '@/lib/graphql';
import { GET_RELATED_POSTS } from '@/lib/queries';

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
      mediaDetails: { width: number; height: number };
    };
  };
}

export default async function RelatedPosts({
  categoryIds,
  currentPostId,
}: {
  categoryIds: string[];
  currentPostId: string;
}) {
  let posts: Post[] = [];

  try {
    const data = await fetchGraphQL<{ posts: { nodes: Post[] } }>(
      GET_RELATED_POSTS,
      {
        categoryIn: categoryIds,
        notIn: [currentPostId],
        first: 3,
      }
    );
    posts = data.posts.nodes;
  } catch (err) {
    console.error('Error fetching related posts:', err);
  }

  if (posts.length === 0) return null;

  return (
    <section className="mt-16 pt-8 border-t">
      <h2 className="text-3xl font-bold mb-6">Related Posts</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <article key={post.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition">
            {post.featuredImage && (
              <Link href={`/blog/${post.slug}`}>
                <Image
                  src={post.featuredImage.node.sourceUrl}
                  alt={post.featuredImage.node.altText || post.title}
                  width={post.featuredImage.node.mediaDetails.width}
                  height={post.featuredImage.node.mediaDetails.height}
                  className="w-full h-40 object-cover"
                />
              </Link>
            )}
            
            <div className="p-4">
              <Link href={`/blog/${post.slug}`}>
                <h3 className="text-lg font-semibold mb-2 hover:text-blue-600">
                  {post.title}
                </h3>
              </Link>
              
              <time className="text-sm text-gray-500">
                {new Date(post.date).toLocaleDateString()}
              </time>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}