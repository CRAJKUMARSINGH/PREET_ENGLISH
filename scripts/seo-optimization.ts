#!/usr/bin/env tsx
// Week 14: SEO Optimization
import { prisma } from '../lib/prisma';
import fs from 'fs';

async function generateSitemap() {
  const lessons = await prisma.lesson.findMany({
    where: { isPublished: true },
  });
  
  const urls = lessons.map(lesson => ({
    loc: `https://preetenglish.com/lessons/${lesson.slug}`,
    lastmod: lesson.updatedAt.toISOString(),
    changefreq: 'weekly',
    priority: 0.8,
  }));
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.map(url => `
  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('')}
</urlset>`;
  
  fs.writeFileSync('public/sitemap.xml', sitemap);
  console.log(`✅ Generated sitemap with ${urls.length} URLs`);
}

generateSitemap();
