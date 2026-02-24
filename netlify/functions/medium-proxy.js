exports.handler = async (event) => {
  const MEDIUM_API_KEY = process.env.MEDIUM_API_KEY;

  if (!MEDIUM_API_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'MEDIUM_API_KEY not configured' }),
    };
  }

  const endpoint = event.queryStringParameters?.endpoint;
  if (!endpoint) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing endpoint parameter' }),
    };
  }

  try {
    const response = await fetch(`https://medium2.p.rapidapi.com${endpoint}`, {
      headers: {
        'x-rapidapi-host': 'medium2.p.rapidapi.com',
        'x-rapidapi-key': MEDIUM_API_KEY,
      },
    });

    const data = await response.json();

    return {
      statusCode: response.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch from Medium API' }),
    };
  }
};
