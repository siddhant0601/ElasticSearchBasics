// Import the Elasticsearch client
const { Client } = require('@elastic/elasticsearch');
const fs = require('fs');

// Create an Elasticsearch client instance
const client = new Client({
  node: 'https://localhost:9200',  // Elasticsearch server URL
  auth: {
    username: 'elastic',          // Your Elasticsearch username
    password: 'L6PMd7exD+J14oPCY7H3',
    // apiKey: 'd2tkeHFaSUJ0U0xQb2NncmtrRkE6dDEwc0NHQWVSa0d3aVpZTWhocU9udw==', // Uncomment if using API key
  },
  tls: {
    ca: fs.readFileSync(
      'C:/Users/siddh/OneDrive/Desktop/elasticSearch/elasticsearch-8.15.3-windows-x86_64/elasticsearch-8.15.3/config/certs/http_ca.crt'
    ),
    rejectUnauthorized: false,  // Disable SSL verification (safe for dev)
  },
});

// Function to test the connection
async function testConnection() {
  try {
    const health = await client.cluster.health({});
    console.log('Elasticsearch cluster health:', health);
  } catch (err) {
    console.error('Error connecting to Elasticsearch:', err);
  }
}

// Function to create an index
async function createIndex() {
  const indexName = 'your-index'; // Change this to your desired index name

  try {
    const response = await client.indices.create({
      index: indexName,
      body: {
        settings: {
          number_of_shards: 1, // Number of shards
          number_of_replicas: 0  // Number of replicas
        },
        mappings: {
          properties: {
            title: { type: 'text' },
            content: { type: 'text' },
            timestamp: { type: 'date' }
          }
        }
      }
    });

    console.log(`Index created: ${response.index}`);
  } catch (err) {
    if (err.meta.statusCode === 400) {
      console.log(`Index already exists: ${indexName}`);
    } else {
      console.error('Error creating index:', err);
    }
  }
}

// Function to insert documents into the index
async function insertData() {
  const indexName = 'your-index'; // Ensure this matches the index created
  const documents = [
    { title: 'Document 1', content: 'This is the first document.', timestamp: new Date() },
    { title: 'Document 2', content: 'This is the second document.', timestamp: new Date() },
  ];

  for (const doc of documents) {
    try {
      await client.index({
        index: indexName,
        document: doc
      });
      console.log('Document indexed:', doc);
    } catch (err) {
      console.error('Error indexing document:', err);
    }
  }

  // Wait for the indexing to be refreshed
  await client.indices.refresh({ index: indexName });
}

// Function to perform a basic search
async function searchIndex(indexName, query) {
  try {
    const result = await client.search({
      index: indexName,
      body: {
        query: {
          match: { title: query }  // Using the correct field
        }
      }
    });

    // Log the entire response for debugging
    console.log('Full search result:', JSON.stringify(result.body, null, 2));

    // Safely access hits
    const hits = result.body.hits && result.body.hits.hits ? result.body.hits.hits : [];
    console.log('Search hits:', hits);
  } catch (err) {
    console.error('Error performing search:', err);
  }
}

// Main function to run the operations
async function run() {
  await testConnection();  // Test the connection first
  await createIndex();     // Create the index
  await insertData();      // Insert some documents
  await searchIndex('your-index', 'Document 1'); // Perform a search for 'Document 1'
}

// Execute the main function
run();
