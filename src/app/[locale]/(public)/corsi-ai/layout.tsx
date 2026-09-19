// Force dynamic rendering: the page hosts a lead form posted to /api/contact
export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Corsi AI a Roma — Workshop gratuito | GridjaCards Arts',
  description:
    'Workshop gratuito di 2 ore a Roma sull\'uso pratico dell\'intelligenza artificiale. Percorso AI Practitioner in 8 incontri e Builder Lab per volontari su progetti reali.',
};

export default function CorsiAiLayout({ children }: { children: React.ReactNode }) {
  return children;
}
