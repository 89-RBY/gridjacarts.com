import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendWelcomeEmail } from '@/lib/email';

export const dynamic = 'force-dynamic';

// GET - Get all newsletter subscribers (admin only)
export async function GET(request: NextRequest) {
  try {
    const subscribers = await prisma.newsletterSubscriber.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({
      subscribers: subscribers.map((s: typeof subscribers[0]) => ({
        id: s.id,
        email: s.email,
        status: s.status,
        source: s.source,
        createdAt: s.createdAt.toISOString(),
      })),
    });
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    return NextResponse.json({ error: 'Failed to fetch subscribers' }, { status: 500 });
  }
}

// POST - Subscribe to newsletter
export async function POST(request: NextRequest) {
  try {
    const { email, website } = await request.json();

    // Honeypot: bots fill hidden fields, humans don't
    if (website) {
      return NextResponse.json({ message: 'Subscribed successfully' }, { status: 200 });
    }

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    // Check if already subscribed
    const existing = await prisma.newsletterSubscriber.findUnique({
      where: { email },
    });

    if (existing) {
      if (existing.status === 'unsubscribed') {
        // Reactivate subscription
        await prisma.newsletterSubscriber.update({
          where: { email },
          data: { status: 'active', updatedAt: new Date() },
        });

        return NextResponse.json({ message: 'Subscription reactivated successfully' });
      }
      return NextResponse.json({ error: 'Email already subscribed' }, { status: 400 });
    }

    // Create new subscription
    const subscriber = await prisma.newsletterSubscriber.create({
      data: {
        email,
        status: 'active',
        source: 'website',
      },
    });

    // Send welcome email
    try {
      await sendWelcomeEmail(email);
    } catch (emailError) {
      console.error('Error sending welcome email:', emailError);
      // Don't fail the subscription if email fails
    }

    return NextResponse.json({
      message: 'Successfully subscribed to newsletter',
      subscriber: {
        id: subscriber.id,
        email: subscriber.email,
      },
    });
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
  }
}

// DELETE - Unsubscribe from newsletter
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const email = searchParams.get('email');

    if (!id && !email) {
      return NextResponse.json({ error: 'ID or email required' }, { status: 400 });
    }

    const whereClause = id ? { id } : { email: email! };

    await prisma.newsletterSubscriber.update({
      where: whereClause,
      data: { status: 'unsubscribed', updatedAt: new Date() },
    });

    return NextResponse.json({ message: 'Successfully unsubscribed' });
  } catch (error) {
    console.error('Error unsubscribing:', error);
    return NextResponse.json({ error: 'Failed to unsubscribe' }, { status: 500 });
  }
}
