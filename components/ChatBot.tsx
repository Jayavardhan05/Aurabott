import { useState, useRef, useEffect } from 'react';

export default function ChatBot() {
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<{ role: string; content: string }[]>([]);
  const [chatError, setChatError] = useState<string | null>(null);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newMessage = { role: 'user', content: chatInput.trim() };
    const updatedMessages = [...chatMessages, newMessage];
    setChatMessages(updatedMessages);
    setChatInput('');
    setChatError(null);
    setIsChatLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setChatError(errorData.error || 'Failed to get response from AI.');
        setIsChatLoading(false);
        return;
      }

      const data = await response.json();
      const aiMessage = data.choices?.[0]?.message?.content || data.message || 'No response from AI.';
      setChatMessages((prev) => [...prev, { role: 'assistant', content: aiMessage }]);
    } catch (err) {
      setChatError('An unexpected error occurred.');
      console.error(err);
    } finally {
      setIsChatLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2>Chat with Bot</h2>
      <div
        style={{
          border: '1px solid #ccc',
          padding: '10px',
          height: '400px',
          overflowY: 'auto',
          marginBottom: '10px',
          backgroundColor: '#f9f9f9',
        }}
      >
        {chatMessages.map((msg, index) => (
          <p key={index} style={{ textAlign: msg.role === 'user' ? 'right' : 'left' }}>
            <strong>{msg.role === 'user' ? 'You' : 'Bot'}:</strong> {msg.content}
          </p>
        ))}
        <div ref={messagesEndRef} />
        {isChatLoading && <p>Loading...</p>}
      </div>
      {chatError && <p style={{ color: 'red' }}>{chatError}</p>}
      <form onSubmit={handleChatSubmit} style={{ display: 'flex' }}>
        <input
          type="text"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          placeholder="Ask a question..."
          disabled={isChatLoading}
          style={{ flexGrow: 1, padding: '8px' }}
        />
        <button type="submit" disabled={isChatLoading} style={{ marginLeft: '8px' }}>
          Send
        </button>
      </form>
    </div>
  );
}
