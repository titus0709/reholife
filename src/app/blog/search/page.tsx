"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
export const dynamic = "force-dynamic";


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

export default function SearchClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const query = searchParams.get("q") || "";

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(query);

  // Keep input in sync with URL
  useEffect(() => {
    setSearchTerm(query);
  }, [query]);

  const handleSearch = async (term: string) => {
    if (!term.trim()) {
      setPosts([]);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ search: term }),
      });

      if (!res.ok) {
        throw new Error("Search request failed");
      }

      const data = await res.json();
      setPosts(data?.posts?.nodes || []);
    } catch (error) {
      console.error("Search error:", error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  // Run search when URL query changes
  useEffect(() => {
    if (query) {
      handleSearch(query);
    } else {
      setPosts([]);
    }
  }, [query]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Search Posts</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          router.push(`/blog/search?q=${encodeURIComponent(searchTerm)}`);
        }}
        className="mb-8"
      >
        <div className="flex gap-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search posts..."
            className="flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Search
          </button>
        </div>
      </form>

      {loading && (
        <p className="text-center text-gray-600">Searching…</p>
      )}

      {!loading && query && posts.length === 0 && (
        <p className="text-center text-gray-600">
          No results found for "{query}"
        </p>
      )}

      {posts.length > 0 && (
        <div className="space-y-6">
          {posts.map((post) => (
            <article
              key={post.id}
              className="border rounded-lg p-6 hover:shadow-lg transition flex gap-6"
            >
              {post.featuredImage && (
                <Link href={`/blog/${post.slug}`} className="flex-shrink-0">
                  <Image
                    src={post.featuredImage.node.sourceUrl}
                    alt={post.featuredImage.node.altText || post.title}
                    width={200}
                    height={150}
                    className="rounded object-cover"
                  />
                </Link>
              )}

              <div className="flex-1">
                <Link href={`/blog/${post.slug}`}>
                  <h2 className="text-2xl font-semibold hover:text-blue-600">
                    {post.title}
                  </h2>
                </Link>

                <div
                  className="text-gray-600 my-3 line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: post.excerpt }}
                />

                <time className="text-sm text-gray-500">
                  {new Date(post.date).toLocaleDateString()}
                </time>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

