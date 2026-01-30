// app/blog/search/page.tsx
import { Suspense } from "react";
import SearchClient from "./SearchClient";

export const dynamic = "force-dynamic";

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchFallback />}>
      <SearchClient />
    </Suspense>
  );
}

function SearchFallback() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Search Posts</h1>
      <div className="flex gap-2 mb-8">
        <div className="flex-1 px-4 py-3 border rounded-lg bg-gray-100 animate-pulse h-12" />
        <div className="bg-gray-300 px-8 py-3 rounded-lg animate-pulse w-24" />
      </div>
    </div>
  );
}
