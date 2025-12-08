import Image from 'next/image';
import Link from 'next/link';
import { fetchGraphQL } from '@/lib/graphql';
import { GET_POSTS_BY_CATEGORY } from '@/lib/queries';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  let category;

  try {
    const data = await fetchGraphQL<any>(GET_POSTS_BY_CATEGORY, {
      slug: params.slug,
      first: 20,
    });
    category = data.category;
  } catch (err) {
    console.error('Error:', err);
    notFound();
  }

  if (!category) {
    notFound();
  }

  const posts = category.posts.nodes;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <Link href="/blog" className="text-blue-600 hover:underline mb-6 inline-block">
        ← Back to Blog
      </Link>

      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{category.name}</h1>
        {category.description && (
          <p className="text-gray-600">{category.description}</p>
        )}
        <p className="text-sm text-gray-500 mt-2">{posts.length} posts</p>
      </div>

      {posts.length === 0 ? (
        <p className="text-gray-600">No posts in this category yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post: any) => (
            <article key={post.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition">
              {post.featuredImage && (
                <Link href={`/blog/${post.slug}`}>
                  <Image
                    src={post.featuredImage.node.sourceUrl}
                    alt={post.featuredImage.node.altText || post.title}
                    width={post.featuredImage.node.mediaDetails.width}
                    height={post.featuredImage.node.mediaDetails.height}
                    className="w-full h-48 object-cover"
                  />
                </Link>
              )}
              
              <div className="p-6">
                <Link href={`/blog/${post.slug}`}>
                  <h2 className="text-2xl font-semibold mb-2 hover:text-blue-600">
                    {post.title}
                  </h2>
                </Link>
                
                <div
                  className="text-gray-600 mb-4 line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: post.excerpt }}
                />
                
                <div className="flex items-center text-sm text-gray-500">
                  <span>{post.author.node.name}</span>
                  <span className="mx-2">•</span>
                  <time>{new Date(post.date).toLocaleDateString()}</time>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}