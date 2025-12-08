import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

interface PageProps {
    params: { locale: string };
}

export async function generateMetadata({ params: { locale } }: PageProps) {
    const t = await getTranslations({ locale, namespace: 'footer' });
    return {
        title: t('privacy'),
    };
}

export default function PrivacyPage({ params: { locale } }: PageProps) {
    const t = useTranslations('footer');

    const content = {
        ro: (
            <>
                <p>Ultima actualizare: {new Date().toLocaleDateString('ro-RO')}</p>
                <h2>1. Introducere</h2>
                <p>
                    Gridjac Arts (&quot;noi&quot;, &quot;nostru&quot;) se angajează să protejeze confidențialitatea utilizatorilor săi. Această Politică de Confidențialitate explică modul în care colectăm, utilizăm, dezvăluim și protejăm informațiile dumneavoastră atunci când vizitați site-ul nostru gridjacarts.com.
                </p>
                <h2>2. Colectarea Datelor</h2>
                <p>
                    Putem colecta date personale precum: Nume, Adresă de e-mail, Număr de telefon, și alte informații pe care ni le furnizați voluntar prin formularele de contact sau abonare la newsletter.
                </p>
                <h2>3. Utilizarea Datelor</h2>
                <p>
                    Folosim datele colectate pentru:
                </p>
                <ul>
                    <li>A furniza și menține serviciile noastre.</li>
                    <li>A vă notifica despre modificări ale serviciilor noastre.</li>
                    <li>A oferi asistență clienților.</li>
                    <li>A monitoriza utilizarea serviciului.</li>
                    <li>A detecta, preveni și aborda probleme tehnice.</li>
                </ul>
                <h2>4. Securitatea Datelor</h2>
                <p>
                    Securitatea datelor dumneavoastră este importantă pentru noi, dar rețineți că nicio metodă de transmitere prin Internet sau metodă de stocare electronică nu este 100% sigură.
                </p>
                <h2>5. Drepturile Dumneavoastră (GDPR)</h2>
                <p>
                    În conformitate cu GDPR, aveți dreptul de a accesa, rectifica, șterge sau limita prelucrarea datelor dumneavoastră personale. Pentru a exercita aceste drepturi, vă rugăm să ne contactați la info@gridjacarts.com.
                </p>
                <h2>6. Contact</h2>
                <p>
                    Dacă aveți întrebări despre această Politică de Confidențialitate, ne puteți contacta:
                </p>
                <ul>
                    <li>Prin email: info@gridjacarts.com</li>
                    <li>La telefon: +40 770 362 294</li>
                </ul>
            </>
        ),
        en: (
            <>
                <p>Last updated: {new Date().toLocaleDateString('en-US')}</p>
                <h2>1. Introduction</h2>
                <p>
                    Gridjac Arts (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website gridjacarts.com.
                </p>
                <h2>2. Data Collection</h2>
                <p>
                    We may collect personal data such as: Name, Email address, Phone number, and other information you voluntarily provide to us via contact forms or newsletter subscriptions.
                </p>
                <h2>3. Use of Data</h2>
                <p>
                    We use the collected data to:
                </p>
                <ul>
                    <li>Provide and maintain our Service.</li>
                    <li>Notify you about changes to our Service.</li>
                    <li>Provide customer support.</li>
                    <li>Monitor the usage of the Service.</li>
                    <li>Detect, prevent and address technical issues.</li>
                </ul>
                <h2>4. Data Security</h2>
                <p>
                    The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure.
                </p>
                <h2>5. Your Rights (GDPR)</h2>
                <p>
                    Under GDPR, you have the right to access, rectify, erase, or restrict the processing of your personal data. To exercise these rights, please contact us at info@gridjacarts.com.
                </p>
                <h2>6. Contact Us</h2>
                <p>
                    If you have any questions about this Privacy Policy, please contact us:
                </p>
                <ul>
                    <li>By email: info@gridjacarts.com</li>
                    <li>By phone: +40 770 362 294 / +39 320 377 9506</li>
                </ul>
            </>
        ),
        it: (
            <>
                <p>Ultimo aggiornamento: {new Date().toLocaleDateString('it-IT')}</p>
                <h2>1. Introduzione</h2>
                <p>
                    Gridjac Arts (&quot;noi&quot;, &quot;nostro&quot;) si impegna a proteggere la privacy dei propri utenti. Questa Informativa sulla Privacy spiega come raccogliamo, utilizziamo, divulghiamo e proteggiamo le tue informazioni quando visiti il nostro sito web gridjacarts.com.
                </p>
                <h2>2. Raccolta Dati</h2>
                <p>
                    Possiamo raccogliere dati personali come: Nome, Indirizzo e-mail, Numero di telefono e altre informazioni che ci fornisci volontariamente tramite moduli di contatto o iscrizione alla newsletter.
                </p>
                <h2>3. Utilizzo dei Dati</h2>
                <p>
                    Utilizziamo i dati raccolti per:
                </p>
                <ul>
                    <li>Fornire e mantenere i nostri servizi.</li>
                    <li>Notificarti le modifiche ai nostri servizi.</li>
                    <li>Fornire assistenza clienti.</li>
                    <li>Monitorare l&#39;utilizzo del servizio.</li>
                    <li>Rilevare, prevenire e risolvere problemi tecnici.</li>
                </ul>
                <h2>4. Sicurezza dei Dati</h2>
                <p>
                    La sicurezza dei tuoi dati è importante per noi, ma ricorda che nessun metodo di trasmissione su Internet o metodo di archiviazione elettronica è sicuro al 100%.
                </p>
                <h2>5. I Tuoi Diritti (GDPR)</h2>
                <p>
                    In conformità con il GDPR, hai il diritto di accedere, rettificare, cancellare o limitare il trattamento dei tuoi dati personali. Per esercitare questi diritti, contattaci all&#39;indirizzo info@gridjacarts.com.
                </p>
                <h2>6. Contatti</h2>
                <p>
                    Se hai domande su questa Informativa sulla Privacy, puoi contattarci:
                </p>
                <ul>
                    <li>Via email: info@gridjacarts.com</li>
                    <li>Al telefono: +39 320 377 9506</li>
                </ul>
            </>
        )
    };

    return (
        <div className="container-custom py-12 md:py-20">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl md:text-4xl font-bold mb-8">{t('privacy')}</h1>
                <div className="prose dark:prose-invert max-w-none">
                    {content[locale as keyof typeof content] || content.en}
                </div>
            </div>
        </div>
    );
}
