import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { getSiteSettings, saveSiteSettings } from '@/lib/data';

export async function GET() {
  try {
    // Public endpoint - analytics and chatbot codes are meant to be visible on the site
    const settings = await getSiteSettings();
    return NextResponse.json({ settings });
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { analyticsCode, chatbotCode } = await request.json();

    const settings = {
      analyticsCode: analyticsCode || '',
      chatbotCode: chatbotCode || '',
      updatedAt: new Date().toISOString(),
    };

    await saveSiteSettings(settings);

    return NextResponse.json({ settings, message: 'Settings updated successfully' });
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}
