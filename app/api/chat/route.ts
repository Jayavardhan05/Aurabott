export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: 'Invalid messages format' }), { status: 400 });
    }

    const GEMINI_API_KEY = 'AIzaSyDRsGvr0oXDrwHGMcET0JXFyL__APfME5c';

    // Extract user message content for the request
    const userMessage = messages[messages.length - 1]?.content || '';

    // Prepend system instruction only if userMessage is non-empty and relevant
    const systemInstruction = "You are an assistant that only provides information about Vignans Institute of Information Technology. Please answer accordingly.";

    const promptText = userMessage.trim()
      ? systemInstruction + " " + userMessage
      : systemInstruction;

    const payload = {
      contents: [
        {
          parts: [{ text: promptText }],
        },
      ],
    };

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error:', errorText);
      return new Response(JSON.stringify({ error: errorText }), { status: response.status });
    }

    const data = await response.json();

    // Extract the generated content text from parts array
    const parts = data?.candidates?.[0]?.content?.parts || [];
    const generatedText = parts.map((part: any) => part.text).join('') || 'No response from AI.';

    return new Response(JSON.stringify({ message: generatedText }), { status: 200 });
  } catch (error: any) {
    console.error('Unexpected error in chat route:', error.message || error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
