import { NextRequest, NextResponse } from 'next/server';
import { fetchGraphQL } from '@/lib/graphql';

const SEARCH_POSTS = `
  query SearchPosts($search: String!) {
    posts(first: 20, where: { search: $search }) {
      nodes {
        id
        title
        slug
        excerpt
        date
        featuredImage {
          node {
            sourceUrl
            altText
            mediaDetails {
              width
              height
            }
          }
        }
      }
    }
  }
`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { search } = body;

    if (!search || search.trim().length === 0) {
      return NextResponse.json({ posts: { nodes: [] } });
    }

    const data = await fetchGraphQL(SEARCH_POSTS, { search });

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Search API Error:', error);
    return NextResponse.json(
      { error: 'Search failed', message: error.message },
      { status: 500 }
    );
  }
}