import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

const ChatbotWidget = () => {
  const [messages, setMessages] = useState<Array<{text: string, sender: string, sources?: any}>>([]);
  const [input, setInput] = useState('');
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // Track if chatbot is open

  // Load stats on component mount
  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Use injected backend URL from Docusaurus config
      const backendUrl = typeof window !== 'undefined' ? (window as any).CHATBOT_BACKEND_URL || 'http://localhost:8000' : 'http://localhost:8000';
      const response = await fetch(`${backendUrl}/stats`);

      if (!response.ok) {
        // Try to get the error details from the response
        let errorMessage = `HTTP error fetching stats! status: ${response.status}`;
        try {
          const errorData = await response.json();
          if (errorData && (errorData.detail || errorData.message)) {
            errorMessage = errorData.detail || errorData.message;
          }
        } catch (e) {
          // If parsing JSON fails, use the status-based message
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
      // Optionally display the error to the user in development mode
      const isDevMode = typeof window !== 'undefined' &&
                       (window as any).location.hostname === 'localhost';
      if (isDevMode) {
        console.warn('Stats fetch error (dev mode):', error.message);
      }
    }
  };

  const handleSend = async () => {
    if (input.trim() && !loading) {
      setLoading(true);
      const newMessages = [...messages, { text: input, sender: 'user', sources: [] }];
      setMessages(newMessages);
      setInput('');

      try {
        // Use injected backend URL from Docusaurus config
        const backendUrl = typeof window !== 'undefined' ? (window as any).CHATBOT_BACKEND_URL || 'http://localhost:8000' : 'http://localhost:8000';
        const response = await fetch(`${backendUrl}/chat`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            question: input,
            top_k: 5
          }),
        });

        if (!response.ok) {
          // Try to get the error details from the response
          let errorMessage = `HTTP error! status: ${response.status}`;
          try {
            const errorData = await response.json();
            if (errorData && (errorData.detail || errorData.message)) {
              errorMessage = errorData.detail || errorData.message;
            }
          } catch (e) {
            // If parsing JSON fails, use the status-based message
          }
          throw new Error(errorMessage);
        }

        const data = await response.json();
        setMessages([...newMessages, {
          text: data.answer || 'No answer received',
          sender: 'bot',
          sources: data.source_chunks || []
        }]);
      } catch (error) {
        console.error('Error sending message:', error);
        // In development mode, show the actual error; in production, show a generic message
        const isDevMode = typeof window !== 'undefined' &&
                         (window as any).location.hostname === 'localhost';
        const errorMessage = isDevMode ? `Error: ${error.message}` : 'Sorry, I encountered an error processing your request.';

        setMessages([...newMessages, {
          text: errorMessage,
          sender: 'bot',
          sources: []
        }]);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleIngest = async () => {
    if (loading) return;

    setLoading(true);
    try {
      // Use injected backend URL from Docusaurus config
      const backendUrl = typeof window !== 'undefined' ? (window as any).CHATBOT_BACKEND_URL || 'http://localhost:8000' : 'http://localhost:8000';
      const response = await fetch(`${backendUrl}/ingest`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          book_url: 'https://your-book-url-here.com', // This should come from user input or config
          chunk_size: 400,
          reindex: false
        }),
      });

      if (!response.ok) {
        // Try to get the error details from the response
        let errorMessage = `HTTP error during ingestion! status: ${response.status}`;
        try {
          const errorData = await response.json();
          if (errorData && (errorData.detail || errorData.message)) {
            errorMessage = errorData.detail || errorData.message;
          }
        } catch (e) {
          // If parsing JSON fails, use the status-based message
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      setMessages(prev => [...prev, {
        text: `Ingestion completed: ${data.chunks_stored} chunks stored.`,
        sender: 'system',
        sources: []
      }]);

      // Refresh stats after ingestion
      fetchStats();
    } catch (error) {
      console.error('Error during ingestion:', error);
      setMessages(prev => [...prev, {
        text: 'Error during ingestion: ' + error.message,
        sender: 'system',
        sources: []
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${styles.chatbotContainer} ${isOpen ? styles.open : ''}`} onClick={(e) => e.stopPropagation()}>
      {/* Chatbot toggle button */}
      <div className={styles.chatbotToggle} onClick={() => setIsOpen(!isOpen)}>
        <div className={styles.chatbotIcon}>💬</div>
        {isOpen && (
          <div className={styles.chatbotTitle}>Book Chatbot</div>
        )}
      </div>

      {/* Chatbot content - only show when open */}
      {isOpen && (
        <div className={styles.chatbotContent}>
          <div className={styles.header}>
            <h3>Book Chatbot</h3>
            <button className={styles.closeButton} onClick={() => setIsOpen(false)}>×</button>
            {stats && (
              <div className={styles.stats}>
                <span>Chunks: {stats.total_chunks}</span>
              </div>
            )}
          </div>

          <div className={styles.messageHistory}>
            {messages.map((msg, index) => (
              <div key={index} className={`${styles.message} ${styles[msg?.sender || 'user']}`}>
                <strong>{msg?.sender || 'User'}:</strong> {msg?.text || ''}
                {msg.sources && msg.sources.length > 0 && (
                  <details className={styles.sources}>
                    <summary>Sources</summary>
                    {msg.sources.map((source, idx) => (
                      <div key={idx} className={styles.source}>
                        <a href={source?.source_url || '#'} target="_blank" rel="noopener noreferrer">
                          {source?.page_path || 'Source'}
                        </a>
                        <p>{source?.text_content ? source.text_content.substring(0, 100) + '...' : 'No content available'}</p>
                      </div>
                    ))}
                  </details>
                )}
              </div>
            ))}
          </div>

          <div className={styles.inputArea}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask a question about the book..."
              disabled={loading}
            />
            <button onClick={handleSend} disabled={loading}>
              {loading ? 'Sending...' : 'Send'}
            </button>
          </div>

          <div className={styles.adminControls}>
            <button onClick={handleIngest} disabled={loading}>
              {loading ? 'Processing...' : 'Ingest Book Content'}
            </button>
            <button onClick={fetchStats} disabled={loading}>
              Refresh Stats
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotWidget;