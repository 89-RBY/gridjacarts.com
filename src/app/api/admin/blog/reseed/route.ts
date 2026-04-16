import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { BLOG_POSTS_SEED_DATA } from '@/lib/blog-posts-seed-data';

export const dynamic = 'force-dynamic';

export async function POST() {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    let created = 0;
    let updated = 0;

    for (const post of BLOG_POSTS_SEED_DATA) {
      const existing = await prisma.blogPost.findFirst({
        where: { slug: post.slug },
      });

      const data = {
        slug: post.slug,
        slugRo: post.slugs.ro,
        slugEn: post.slugs.en,
        slugIt: post.slugs.it,
        titleRo: post.title.ro,
        titleEn: post.title.en,
        titleIt: post.title.it,
        contentRo: post.content.ro,
        contentEn: post.content.en,
        contentIt: post.content.it,
        excerptRo: post.excerpt.ro,
        excerptEn: post.excerpt.en,
        excerptIt: post.excerpt.it,
        author: post.author,
        tags: JSON.stringify(post.tags),
        status: post.status,
        publishedAt: new Date(post.publishedAt),
      };

      if (existing) {
        await prisma.blogPost.update({
          where: { id: existing.id },
          data,
        });
        updated++;
      } else {
        await prisma.blogPost.create({ data });
        created++;
      }
    }

    return NextResponse.json({
      message: `Successfully seeded blog posts: ${created} created, ${updated} updated`,
      created,
      updated,
      total: BLOG_POSTS_SEED_DATA.length,
    });
  } catch (error) {
    console.error('Error reseeding blog posts:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: `Failed to reseed blog posts: ${message}` },
      { status: 500 }
    );
  }
}
