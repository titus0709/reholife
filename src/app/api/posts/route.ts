import { NextRequest, NextResponse } from 'next/server';
import { fetchGraphQL } from '@/lib/graphql';
import { GET_ALL_POSTS } from '@/lib/queries';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { first = 10, after = null } = body;

    const data = await fetchGraphQL(GET_ALL_POSTS, { first, after });

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Posts API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts', message: error.message },
      { status: 500 }
    );
  }
}