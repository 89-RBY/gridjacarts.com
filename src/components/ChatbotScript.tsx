'use client';

import { useEffect, useState } from 'react';

export default function ChatbotScript() {
  const [chatbotCode, setChatbotCode] = useState<string>('');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Fetch chatbot code from settings
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data.settings?.chatbotCode) {
          console.log('[ChatbotScript] Chatbot code loaded from settings');
          setChatbotCode(data.settings.chatbotCode);
        } else {
          console.log('[ChatbotScript] No chatbot code found in settings');
        }
      })
      .catch((error) => {
        console.error('[ChatbotScript] Failed to load chatbot settings:', error);
      });
  }, []);

  useEffect(() => {
    if (!chatbotCode || isLoaded) return;

    console.log('[ChatbotScript] Injecting chatbot script into page');

    // Remove existing script if any
    const existingScript = document.getElementById('chatbot-injected-script');
    if (existingScript) {
      existingScript.remove();
    }

    // Create a div container for chatbot (some chatbots need this)
    let container = document.getElementById('chatbot-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'chatbot-container';
      document.body.appendChild(container);
    }

    // Create and inject the script
    const script = document.createElement('script');
    script.id = 'chatbot-injected-script';
    script.innerHTML = chatbotCode;

    // If the code contains a src attribute pattern, extract and use it
    const srcMatch = chatbotCode.match(/src=['"]([^'"]+)['"]/);
    if (srcMatch) {
      script.src = srcMatch[1];
      script.async = true;
    }

    document.body.appendChild(script);
    setIsLoaded(true);
    console.log('[ChatbotScript] Chatbot script injected successfully');

    // Cleanup function
    return () => {
      const scriptToRemove = document.getElementById('chatbot-injected-script');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
      const containerToRemove = document.getElementById('chatbot-container');
      if (containerToRemove) {
        containerToRemove.remove();
      }
    };
  }, [chatbotCode, isLoaded]);

  return null;
}
