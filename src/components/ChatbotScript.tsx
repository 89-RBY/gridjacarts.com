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

    // Remove existing scripts if any
    const existingConfig = document.getElementById('chatbot-config-script');
    const existingScript = document.getElementById('chatbot-injected-script');
    if (existingConfig) existingConfig.remove();
    if (existingScript) existingScript.remove();

    // Parse the chatbot code to extract config and script URL
    const configMatch = chatbotCode.match(/window\.LeaChatixConfig\s*=\s*({[^}]+})/);
    const srcMatch = chatbotCode.match(/src=['"]([^'"]+)['"]/);

    if (configMatch && srcMatch) {
      // LeaChatix specific implementation
      // 1. First inject the configuration
      const configScript = document.createElement('script');
      configScript.id = 'chatbot-config-script';
      configScript.innerHTML = `window.LeaChatixConfig = ${configMatch[1]};`;
      document.body.appendChild(configScript);

      // 2. Then inject the chatbot script
      const script = document.createElement('script');
      script.id = 'chatbot-injected-script';
      script.src = srcMatch[1];
      script.async = true;
      document.body.appendChild(script);

      console.log('[ChatbotScript] LeaChatix configured and loaded');
    } else {
      // Fallback for other chatbots
      const script = document.createElement('script');
      script.id = 'chatbot-injected-script';
      script.innerHTML = chatbotCode;

      const fallbackSrcMatch = chatbotCode.match(/src=['"]([^'"]+)['"]/);
      if (fallbackSrcMatch) {
        script.src = fallbackSrcMatch[1];
        script.async = true;
      }

      document.body.appendChild(script);
      console.log('[ChatbotScript] Generic chatbot script injected');
    }

    setIsLoaded(true);

    // Cleanup function
    return () => {
      const configToRemove = document.getElementById('chatbot-config-script');
      const scriptToRemove = document.getElementById('chatbot-injected-script');
      if (configToRemove) configToRemove.remove();
      if (scriptToRemove) scriptToRemove.remove();

      // Clean up LeaChatix global config
      if (typeof window !== 'undefined' && (window as any).LeaChatixConfig) {
        delete (window as any).LeaChatixConfig;
      }
    };
  }, [chatbotCode, isLoaded]);

  return null;
}
