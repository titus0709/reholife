// components/PostMeta.tsx
import Link from "next/link";

export default function PostMeta({ categories = [], tags = [] }: { categories?: any[], tags?: any[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((c: any) => (
        <Link href={`/blogs/category/${c.slug}`} key={c.id} className="text-xs px-2 py-1 bg-gray-800 text-gold rounded">
          {c.name}
        </Link>
      ))}

      {tags.map((t: any) => (
        <Link href={`/blogs/tag/${t.slug}`} key={t.id} className="text-xs px-2 py-1 bg-gray-700 text-gray-300 rounded">
          #{t.name}
        </Link>
      ))}
    </div>
  );
}
