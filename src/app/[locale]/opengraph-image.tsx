import { ImageResponse } from 'next/og';
import { getTranslations } from 'next-intl/server';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: '#0a0e14',
          backgroundImage:
            'radial-gradient(circle at 75% 30%, rgba(0,255,136,0.18), transparent 60%)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            marginBottom: 48,
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: 40,
              fontWeight: 700,
              color: '#00ff88',
              fontFamily: 'monospace',
            }}
          >
            {'>_'}
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 36,
              fontWeight: 700,
              color: '#f5f7fa',
            }}
          >
            Gridjac Arts
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 54,
            fontWeight: 700,
            color: '#f5f7fa',
            lineHeight: 1.15,
            maxWidth: 950,
          }}
        >
          {t('ogTitle')}
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 28,
            color: '#9aa4b2',
            marginTop: 28,
            maxWidth: 900,
          }}
        >
          {t('ogDescription')}
        </div>
      </div>
    ),
    { ...size }
  );
}
