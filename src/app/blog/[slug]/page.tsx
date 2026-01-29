import Image from "next/image";
import { fetchGraphQL } from "@/lib/graphql";
import { GET_POST_BY_SLUG, GET_POST_SLUGS } from "@/lib/queries";
import { notFound } from "next/navigation";
import Link from "next/link";
import RelatedPosts from "@/components/RelatedPosts";

export const dynamic = "force-dynamic";
export const revalidate = 60;


interface CategoryNode {
  name: string;
  slug?: string;
  id?: string | number;
  databaseId?: number;
}

interface PostData {
  post: {
    id?: string | number;
    databaseId?: number;
    title: string;
    content: string;
    date: string;
    featuredImage?: {
      node: {
        sourceUrl: string;
        altText: string | null;
        mediaDetails: { width: number; height: number };
      };
    };
    author?: {
      node?: {
        name?: string;
      };
    };
    categories?: {
      nodes?: Array<CategoryNode>;
    };
    tags?: {
      nodes?: Array<{ name: string }>;
    };
  } | null;
}

export async function generateStaticParams() {
  const data = await fetchGraphQL<{ posts: { nodes: Array<{ slug: string }> } }>(
    GET_POST_SLUGS
  );

  return data.posts.nodes.map((post) => ({
    slug: post.slug,
  }));
}

export const revalidate = 60;

export default async function PostPage({ params }: { params: { slug: string } }) {
  const data = await fetchGraphQL<PostData>(GET_POST_BY_SLUG, {
    slug: params.slug,
  });

  if (!data || !data.post) {
    notFound();
  }

  const post = data.post;

  // Defensive: build categoryIds array (numbers) for RelatedPosts
  const categoryIds: number[] =
    post.categories?.nodes
      ?.map((cat) => {
        // prefer databaseId (WP GraphQL), fallback to numeric id if available
        if (typeof (cat as any).databaseId === "number") return (cat as any).databaseId;
        const maybeId = (cat as any).id;
        return typeof maybeId === "number" ? maybeId : Number(maybeId) || null;
      })
      .filter(Boolean) as number[] || [];

  // currentPostId: prefer databaseId (number) then id
  const currentPostId: number | string | undefined =
    typeof post.databaseId === "number" ? post.databaseId : post.id;

  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      <header className="mb-8">
        <h1 className="text-5xl font-bold mb-4">{post.title}</h1>

        <div className="flex items-center gap-4 text-gray-600 mb-6">
          <span>{post.author?.node?.name ?? "Unknown author"}</span>
          <span>•</span>
          <time>{new Date(post.date).toLocaleDateString()}</time>
        </div>

        {post.categories?.nodes && post.categories.nodes.length > 0 && (
          <div className="flex gap-2 mb-6 flex-wrap">
            {post.categories.nodes.map((cat) => (
              <Link
                key={(cat.slug ?? cat.name) as string}
                href={`/blog/category/${cat.slug ?? ""}`}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded hover:bg-blue-200 transition"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        )}

        {post.featuredImage?.node?.sourceUrl && (
          <Image
            src={post.featuredImage.node.sourceUrl}
            alt={post.featuredImage.node.altText ?? post.title}
            width={post.featuredImage.node.mediaDetails.width}
            height={post.featuredImage.node.mediaDetails.height}
            className="w-full rounded-lg"
            priority
          />
        )}
      </header>

      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {post.tags?.nodes && post.tags.nodes.length > 0 && (
        <footer className="mt-12 pt-6 border-t">
          <div className="flex gap-2">
            <span className="font-semibold">Tags:</span>
            {post.tags.nodes.map((tag) => (
              <span key={tag.name} className="text-blue-600">
                #{tag.name}
              </span>
            ))}
          </div>
        </footer>
      )}

      {/* RelatedPosts: pass safe, typed values */}
      <RelatedPosts
  categoryIds={categoryIds.map(String)}                   // number[] -> string[]
  currentPostId={currentPostId ? String(currentPostId) : ""} // number|string -> string
/>

    </article>
  );
}


