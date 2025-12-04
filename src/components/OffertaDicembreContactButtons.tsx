'use client';

import { Phone, Mail, MessageCircle } from 'lucide-react';

export default function OffertaDicembreContactButtons() {
  const whatsappNumber = '393203779506'; // IT number without +
  const phoneNumber = '+39 320 377 9506';
  const email = 'robert.gridjac@gridjacarts.com';

  const whatsappMessage = encodeURIComponent(
    '🎉 Ciao! Sono interessato all\'Offerta Dicembre 2025 di GridjaCards. Vorrei maggiori informazioni sui pacchetti disponibili.'
  );

  const emailSubject = encodeURIComponent('Richiesta Offerta Dicembre 2025 - GridjaCards');
  const emailBody = encodeURIComponent(
    'Buongiorno,\n\nSono interessato all\'Offerta Dicembre 2025 di GridjaCards.\n\nVorrei ricevere maggiori informazioni sui seguenti pacchetti:\n- Startup (€999/anno)\n- Pro (€1.749/anno)\n- Premium (€2.999/anno)\n\nGrazie,\n[Il tuo nome]'
  );

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex flex-col items-center justify-center gap-4"
      >
        <div className="absolute inset-0 bg-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative z-10 flex flex-col items-center gap-4">
          <div className="bg-white/20 p-4 rounded-full group-hover:scale-110 transition-transform duration-300">
            <MessageCircle className="w-12 h-12" />
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2">WhatsApp</h3>
            <p className="text-sm opacity-90">Risposta immediata</p>
            <p className="text-xs mt-2 opacity-75">{phoneNumber}</p>
          </div>
        </div>
      </a>

      {/* Email Button */}
      <a
        href={`mailto:${email}?subject=${emailSubject}&body=${emailBody}`}
        className="group relative bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex flex-col items-center justify-center gap-4"
      >
        <div className="absolute inset-0 bg-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative z-10 flex flex-col items-center gap-4">
          <div className="bg-white/20 p-4 rounded-full group-hover:scale-110 transition-transform duration-300">
            <Mail className="w-12 h-12" />
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2">Email</h3>
            <p className="text-sm opacity-90">Scrivi in dettaglio</p>
            <p className="text-xs mt-2 opacity-75 break-all px-2">{email}</p>
          </div>
        </div>
      </a>

      {/* Phone Button */}
      <a
        href={`tel:${phoneNumber}`}
        className="group relative bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex flex-col items-center justify-center gap-4"
      >
        <div className="absolute inset-0 bg-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative z-10 flex flex-col items-center gap-4">
          <div className="bg-white/20 p-4 rounded-full group-hover:scale-110 transition-transform duration-300">
            <Phone className="w-12 h-12" />
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2">Telefono</h3>
            <p className="text-sm opacity-90">Chiamata diretta</p>
            <p className="text-xs mt-2 opacity-75">{phoneNumber}</p>
          </div>
        </div>
      </a>
    </div>
  );
}
