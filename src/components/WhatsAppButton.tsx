'use client';

import { trackFloatingButtonClick } from '@/lib/analytics';

const WHATSAPP_NUMBER = '393203779506';

const copy: Record<string, { message: string; label: string }> = {
  it: { message: 'Ciao Gridjac Arts, vorrei informazioni su un progetto.', label: 'Scrivici su WhatsApp' },
  en: { message: 'Hi Gridjac Arts, I would like some information about a project.', label: 'Message us on WhatsApp' },
  ro: { message: 'Bună Gridjac Arts, aș dori informații despre un proiect.', label: 'Scrie-ne pe WhatsApp' },
};

export default function WhatsAppButton({ locale }: { locale: string }) {
  const { message, label } = copy[locale] || copy.it;
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      onClick={() => trackFloatingButtonClick('whatsapp')}
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/30 transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
    >
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden="true">
        <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.8h-.01a9.8 9.8 0 0 1-5-1.37l-.36-.21-3.72.97 1-3.63-.24-.37a9.82 9.82 0 0 1-1.5-5.24c0-5.43 4.42-9.85 9.86-9.85 2.63 0 5.1 1.03 6.96 2.89a9.78 9.78 0 0 1 2.88 6.97c0 5.43-4.42 9.84-9.85 9.84m8.38-18.23A11.77 11.77 0 0 0 12.05 0C5.5 0 .17 5.33.17 11.88c0 2.1.55 4.14 1.59 5.94L.07 24l6.3-1.65a11.87 11.87 0 0 0 5.68 1.45h.01c6.55 0 11.88-5.33 11.88-11.88 0-3.17-1.23-6.16-3.47-8.4" />
      </svg>
    </a>
  );
}
