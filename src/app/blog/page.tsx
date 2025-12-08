'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';

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
  author: {
    node: {
      name: string;
    };
  };
  categories: {
    nodes: Array<{ name: string; slug: string }>;
  };
}

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [endCursor, setEndCursor] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async (after: string | null = null) => {
    try {
      const isInitial = after === null;
      if (isInitial) setLoading(true);
      else setLoadingMore(true);

      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ first: 9, after }),
      });

      if (!response.ok) throw new Error('Failed to fetch posts');

      const data = await response.json();

      if (isInitial) {
        setPosts(data.posts.nodes);
      } else {
        setPosts((prev) => [...prev, ...data.posts.nodes]);
      }

      setHasMore(data.posts.pageInfo.hasNextPage);
      setEndCursor(data.posts.pageInfo.endCursor);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-amber-200">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-extrabold mb-8 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">
            Welcome to Reholife Blogs...
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="border border-amber-800/20 rounded-lg overflow-hidden animate-pulse bg-gradient-to-b from-gray-900 to-black"
              >
                <div className="w-full h-48 bg-amber-900/10" />
                <div className="p-6">
                  <div className="h-4 bg-amber-900/10 rounded mb-4" />
                  <div className="h-8 bg-amber-900/10 rounded mb-4" />
                  <div className="h-20 bg-amber-900/10 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-amber-200">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-8 text-amber-300">Error</h1>
          <div className="bg-amber-900/20 border border-amber-800 p-4 rounded">
            <p className="text-amber-100">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="min-h-screen bg-black text-amber-200">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-extrabold mb-8 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">
            Blog
          </h1>
          <p className="text-amber-200">No posts found. Create some posts in WordPress!</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />

      <div className="min-h-screen bg-black text-amber-200">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-extrabold mb-8 text-center bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">
            Reholife Blogs
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <article
                key={post.id}
                className="relative border border-amber-800/30 rounded-lg overflow-hidden transform transition hover:-translate-y-2 hover:scale-[1.01] hover:shadow-2xl will-change-transform"
                style={{ animation: 'fadeUp 420ms ease forwards', animationDelay: `${index * 80}ms`, opacity: 0 }}
              >
                {post.featuredImage ? (
                  <Link href={`/blog/${post.slug}`}>
                    <div className="relative w-full h-48">
                      <Image
                        src={post.featuredImage.node.sourceUrl}
                        alt={post.featuredImage.node.altText || post.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 33vw"
                        style={{ objectFit: 'cover' }}
                        className="rounded-t-lg"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                      <div className="absolute left-4 bottom-3 flex gap-2">
                        {post.categories.nodes.slice(0, 2).map((cat) => (
                          <span
                            key={cat.slug}
                            className="text-[11px] font-medium bg-amber-900/30 text-amber-200 px-2 py-1 rounded backdrop-blur"
                          >
                            {cat.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div className="w-full h-48 bg-amber-900/10 flex items-center justify-center">
                    <span className="text-amber-500">No Image</span>
                  </div>
                )}

                <div className="p-6 bg-gradient-to-b from-black/60 to-black">
                  {/* small category row for accessibility on non-image cases */}
                  {post.featuredImage ? null : (
                    <div className="flex gap-2 mb-2 flex-wrap">
                      {post.categories.nodes.slice(0, 2).map((cat) => (
                        <span key={cat.slug} className="text-xs bg-amber-900/20 px-2 py-1 rounded text-amber-200">
                          {cat.name}
                        </span>
                      ))}
                    </div>
                  )}

                  <Link href={`/blog/${post.slug}`}>
                    <h2 className="text-2xl font-semibold mb-2 leading-tight hover:text-amber-300 transition-colors">
                      {post.title}
                    </h2>
                  </Link>

                  <div
                    className="text-amber-200/80 mb-4 line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: post.excerpt }}
                  />

                  <div className="flex items-center text-sm text-amber-300/70 justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-amber-200">{post.author.node.name}</span>
                      <span className="mx-2">•</span>
                      <time className="text-amber-300/80">{new Date(post.date).toLocaleDateString()}</time>
                    </div>

                    <Link href={`/blog/${post.slug}`} className="hidden md:inline-block">
                      <span className="px-3 py-2 rounded-lg border border-amber-700/40 text-amber-200 text-sm hover:bg-amber-700/10 transition">
                        Read
                      </span>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {hasMore && (
            <div className="mt-12 text-center">
              <button
                onClick={() => fetchPosts(endCursor)}
                disabled={loadingMore}
                className="bg-amber-500 text-black px-8 py-3 rounded-lg hover:shadow-xl disabled:bg-amber-800 disabled:text-amber-400 disabled:cursor-not-allowed transition"
              >
                {loadingMore ? 'Loading...' : 'Load More Posts'}
              </button>
            </div>
          )}

          {!hasMore && posts.length > 9 && (
            <div className="mt-12 text-center text-amber-300/70">
              <p>You've reached the end!</p>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeUp {
          from { transform: translateY(8px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        /* fallback micro-animation utility */
        .will-change-transform { will-change: transform, opacity; }
      `}</style>
    </>
  );
}
