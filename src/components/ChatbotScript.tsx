'use client';

import { useEffect, useState } from 'react';

export default function ChatbotScript() {
  const [chatbotCode, setChatbotCode] = useState<string>('');

  useEffect(() => {
    // Fetch chatbot code from settings
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data.settings?.chatbotCode) {
          setChatbotCode(data.settings.chatbotCode);
        }
      })
      .catch((error) => {
        console.error('Failed to load chatbot settings:', error);
      });
  }, []);

  useEffect(() => {
    if (!chatbotCode) return;

    // Create a script element and inject the chatbot code
    const script = document.createElement('script');
    script.innerHTML = chatbotCode;
    script.id = 'chatbot-injected-script';

    // Check if script already exists to avoid duplicates
    const existingScript = document.getElementById('chatbot-injected-script');
    if (existingScript) {
      existingScript.remove();
    }

    document.body.appendChild(script);

    // Cleanup function
    return () => {
      const scriptToRemove = document.getElementById('chatbot-injected-script');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [chatbotCode]);

  return null;
}
