import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Gridjac Arts',
    short_name: 'Gridjac',
    description: 'Software house che costruisce web app, integra AI e automatizza processi business.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0e14',
    theme_color: '#0a0e14',
    icons: [
      {
        src: '/apple-icon',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  };
}
