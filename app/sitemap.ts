import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://itspayday.in';
  const routes = [
    '',
    '/about',
    '/contact',
    '/fees',
    '/for-communities',
    '/for-lenders',
    '/for-workers',
    '/grievance-redressal',
    '/lsp-disclosure',
    '/privacy',
    '/products/earned-wage-access',
    '/security',
    '/team',
    '/terms',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.7,
  }));
}
