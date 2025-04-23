const fetch = require('node-fetch');

const GEMINI_API_KEY = 'AIzaSyDRsGvr0oXDrwHGMcET0JXFyL__APfME5c';

async function testApiKey() {
  const payload = {
    model: 'gemini-1',
    messages: [{ role: 'user', content: 'Hello' }],
  };

  try {
    const response = await fetch('https://api.gemini.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GEMINI_API_KEY}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('API key test failed:', data);
    } else {
      console.log('API key test succeeded:', data);
    }
  } catch (error) {
    console.error('Error testing API key:', error);
  }
}

testApiKey();
