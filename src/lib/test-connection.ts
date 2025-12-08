import { fetchGraphQL } from './graphql';

const TEST_QUERY = `
  query TestConnection {
    posts(first: 1) {
      nodes {
        title
      }
    }
    generalSettings {
      title
      url
    }
  }
`;

async function testConnection() {
  try {
    const data = await fetchGraphQL<any>(TEST_QUERY);
    console.log('✅ WordPress Connected!');
    console.log('Site:', data.generalSettings.title);
    console.log('URL:', data.generalSettings.url);
    console.log('First Post:', data.posts.nodes[0]?.title || 'No posts found');
  } catch (error) {
    console.error('❌ Connection Failed:', error);
  }
}

testConnection();