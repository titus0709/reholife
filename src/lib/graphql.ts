import { GraphQLClient } from 'graphql-request';

const endpoint = process.env.WORDPRESS_API_URL || 'http://reholife-new.local/graphql';

export const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    'Content-Type': 'application/json',
  },
  // Ensure proper request format
  method: 'POST',
});

// Error handling helper
export async function fetchGraphQL<T>(
  query: string,
  variables?: Record<string, any>
): Promise<T> {
  try {
    console.log('Fetching from:', endpoint);
    console.log('Query:', query.substring(0, 100) + '...');
    
    const data = await graphQLClient.request<T>(query, variables);
    return data;
  } catch (error: any) {
    console.error('GraphQL Error Details:', {
      endpoint,
      errors: error.response?.errors,
      status: error.response?.status,
      message: error.message,
    });
    throw new Error(`Failed to fetch from WordPress: ${error.message}`);
  }
}