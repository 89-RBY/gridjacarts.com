import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

export const dynamic = 'force-dynamic';

interface PageProps {
    params: { locale: string };
}

export async function generateMetadata({ params: { locale } }: PageProps) {
    const t = await getTranslations({ locale, namespace: 'footer' });
    return {
        title: t('terms'),
    };
}

export default function TermsPage({ params: { locale } }: PageProps) {
    const t = useTranslations('footer');

    const content = {
        ro: (
            <>
                <p>Ultima actualizare: {new Date().toLocaleDateString('ro-RO')}</p>
                <h2>1. Acceptarea Termenilor</h2>
                <p>
                    Prin accesarea și utilizarea acestui site web, acceptați și sunteți de acord să respectați termenii și dispozițiile acestui acord.
                </p>
                <h2>2. Servicii</h2>
                <p>
                    Gridjac Arts oferă servicii de dezvoltare web, design grafic și marketing digital. Ne rezervăm dreptul de a modifica sau întrerupe serviciile noastre în orice moment.
                </p>
                <h2>3. Proprietate Intelectuală</h2>
                <p>
                    Conținutul, organizarea, grafica, designul și alte aspecte legate de Site sunt protejate de drepturile de autor și alte legi privind proprietatea intelectuală. Copierea, redistribuirea, utilizarea sau publicarea de către dumneavoastră a oricăror astfel de materiale este strict interzisă.
                </p>
                <h2>4. Limitarea Răspunderii</h2>
                <p>
                    Gridjac Arts nu va fi răspunzătoare pentru niciun fel de daune directe, indirecte, incidentale sau consecvente care rezultă din utilizarea sau imposibilitatea de a utiliza serviciile noastre.
                </p>
                <h2>5. Legea Aplicabilă</h2>
                <p>
                    Acești Termeni și Condiții sunt guvernați și interpretați în conformitate cu legile din România și Uniunea Europeană.
                </p>
                <h2>6. Contact</h2>
                <p>
                    Pentru orice întrebări legate de acești Termeni, vă rugăm să ne contactați la info@gridjacarts.com.
                </p>
            </>
        ),
        en: (
            <>
                <p>Last updated: {new Date().toLocaleDateString('en-US')}</p>
                <h2>1. Acceptance of Terms</h2>
                <p>
                    By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
                </p>
                <h2>2. Services</h2>
                <p>
                    Gridjac Arts provides web development, graphic design, and digital marketing services. We reserve the right to modify or discontinue our services at any time.
                </p>
                <h2>3. Intellectual Property</h2>
                <p>
                    The content, organization, graphics, design, and other matters related to the Site are protected under applicable copyrights and other proprietary laws. The copying, redistribution, use or publication by you of any such matters or any part of the Site is strictly prohibited.
                </p>
                <h2>4. Limitation of Liability</h2>
                <p>
                    Gridjac Arts shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or the inability to use our services.
                </p>
                <h2>5. Governing Law</h2>
                <p>
                    These Terms and Conditions shall be governed by and construed in accordance with the laws of Romania and the European Union.
                </p>
                <h2>6. Contact Us</h2>
                <p>
                    If you have any questions about these Terms, please contact us at info@gridjacarts.com.
                </p>
            </>
        ),
        it: (
            <>
                <p>Ultimo aggiornamento: {new Date().toLocaleDateString('it-IT')}</p>
                <h2>1. Accettazione dei Termini</h2>
                <p>
                    Accedendo e utilizzando questo sito web, accetti e acconsenti di essere vincolato dai termini e dalle disposizioni del presente accordo.
                </p>
                <h2>2. Servizi</h2>
                <p>
                    Gridjac Arts offre servizi di sviluppo web, design grafico e marketing digitale. Ci riserviamo il diritto di modificare o interrompere i nostri servizi in qualsiasi momento.
                </p>
                <h2>3. Proprietà Intellettuale</h2>
                <p>
                    Il contenuto, l&#39;organizzazione, la grafica, il design e altri aspetti relativi al Sito sono protetti dalle leggi sul copyright e altre leggi sulla proprietà intellettuale. La copia, ridistribuzione, uso o pubblicazione da parte tua di tali materiali è severamente vietata.
                </p>
                <h2>4. Limitazione di Responsabilità</h2>
                <p>
                    Gridjac Arts non sarà responsabile per danni diretti, indiretti, incidentali o consequenziali derivanti dall&#39;uso o dall&#39;impossibilità di utilizzare i nostri servizi.
                </p>
                <h2>5. Legge Applicabile</h2>
                <p>
                    Questi Termini e Condizioni sono regolati e interpretati in conformità con le leggi dell&#39;Italia e dell&#39;Unione Europea.
                </p>
                <h2>6. Contatti</h2>
                <p>
                    Per qualsiasi domanda relativa a questi Termini, contattaci all&#39;indirizzo info@gridjacarts.com.
                </p>
            </>
        )
    };

    return (
        <div className="container-custom py-12 md:py-20">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl md:text-4xl font-bold mb-8">{t('terms')}</h1>
                <div className="prose dark:prose-invert max-w-none">
                    {content[locale as keyof typeof content] || content.en}
                </div>
            </div>
        </div>
    );
}
