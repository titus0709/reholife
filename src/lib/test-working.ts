async function testWordPress() {
  const WORDPRESS_URL = 'http://reholife-new.local/graphql';
  
  const query = `
    query TestQuery {
      generalSettings {
        title
        url
        description
      }
      posts(first: 3) {
        nodes {
          id
          title
          slug
        }
      }
    }
  `;

  console.log('Testing WordPress GraphQL...\n');

  try {
    const response = await fetch(WORDPRESS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: query, // This is what was missing!
      }),
    });

    const result = await response.json();

    if (result.errors) {
      console.error('❌ GraphQL Errors:', result.errors);
      return;
    }

    console.log('✅ Connection Successful!\n');
    console.log('Site Info:');
    console.log('  Title:', result.data.generalSettings.title);
    console.log('  URL:', result.data.generalSettings.url);
    console.log('\nRecent Posts:');
    result.data.posts.nodes.forEach((post: any, i: number) => {
      console.log(`  ${i + 1}. ${post.title} (${post.slug})`);
    });
    console.log('\n✅ Ready to build your blog!');

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

testWordPress();