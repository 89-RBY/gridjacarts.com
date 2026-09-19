import { SITE_URL } from '@/lib/seo';

export default function OrganizationJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'Gridjac Arts',
        legalName: 'Gridjac Arts SRL',
        url: SITE_URL,
        logo: `${SITE_URL}/apple-icon`,
        email: 'info@gridjacarts.com',
        sameAs: [
          'https://facebook.com/gridjacarts',
          'https://instagram.com/gridjacarts',
          'https://linkedin.com/company/gridjacarts',
        ],
      },
      {
        '@type': 'LocalBusiness',
        name: 'Gridjac Arts — Romania',
        parentOrganization: { '@id': `${SITE_URL}/#organization` },
        url: SITE_URL,
        email: 'info@gridjacarts.com',
        telephone: '+40770362294',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Str. Principală, nr. 159',
          addressLocality: 'Balcauți',
          addressRegion: 'SV',
          postalCode: '727025',
          addressCountry: 'RO',
        },
      },
      {
        '@type': 'LocalBusiness',
        name: 'Gridjac Arts — Italia',
        parentOrganization: { '@id': `${SITE_URL}/#organization` },
        url: SITE_URL,
        email: 'info@gridjacarts.com',
        telephone: '+393203779506',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Via Trecate 43',
          addressLocality: 'Roma',
          postalCode: '00166',
          addressCountry: 'IT',
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: 'Gridjac Arts',
        publisher: { '@id': `${SITE_URL}/#organization` },
        inLanguage: ['it', 'en', 'ro'],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
