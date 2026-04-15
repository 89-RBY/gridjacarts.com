import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser, createUser } from '@/lib/auth';
import {
  getPartners,
  createPartner,
  updatePartner,
  deletePartner,
  getPartnerByUserId,
} from '@/lib/data';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Partners can only see their own data
    if (user.role === 'partner') {
      const partner = await getPartnerByUserId(user.id);
      return NextResponse.json({ partners: partner ? [partner] : [] });
    }

    // Admin sees all
    const partners = await getPartners();
    return NextResponse.json({ partners });
  } catch (error) {
    console.error('Error fetching partners:', error);
    return NextResponse.json({ error: 'Failed to fetch partners' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const partnerData = await request.json();

    // Create user account first
    const newUser = await createUser({
      email: partnerData.email,
      name: partnerData.contactPerson,
      password: partnerData.password || 'partner123', // Default password
      role: 'partner',
    });

    // Create partner profile
    const now = new Date();
    const fiscalYearStart = new Date(now.getFullYear(), 0, 1); // January 1st of current year

    const newPartner = await createPartner({
      userId: newUser.id,
      companyName: partnerData.companyName,
      contactPerson: partnerData.contactPerson,
      email: partnerData.email,
      phone: partnerData.phone,
      address: partnerData.address,
      taxId: partnerData.taxId,

      // Tier System - all new partners start at BRONZE
      currentTier: 'BRONZE',
      annualRevenue: 0,
      fiscalYearStart: fiscalYearStart.toISOString(),
      lastTierUpdate: now.toISOString(),

      // Legacy field for backward compatibility
      markup: partnerData.markup || 20,

      status: 'approved',
      notes: partnerData.notes || '',
      approvedAt: new Date().toISOString(),
      approvedBy: user.id,
    });

    return NextResponse.json({ partner: newPartner, message: 'Partner created successfully' });
  } catch (error) {
    console.error('Error creating partner:', error);
    const message = error instanceof Error ? error.message : 'Failed to create partner';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { id, ...updates } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'Partner ID required' }, { status: 400 });
    }

    const updatedPartner = await updatePartner(id, updates);

    if (!updatedPartner) {
      return NextResponse.json({ error: 'Partner not found' }, { status: 404 });
    }

    return NextResponse.json({ partner: updatedPartner, message: 'Partner updated successfully' });
  } catch (error) {
    console.error('Error updating partner:', error);
    return NextResponse.json({ error: 'Failed to update partner' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Partner ID required' }, { status: 400 });
    }

    const deleted = await deletePartner(id);

    if (!deleted) {
      return NextResponse.json({ error: 'Partner not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Partner deleted successfully' });
  } catch (error) {
    console.error('Error deleting partner:', error);
    return NextResponse.json({ error: 'Failed to delete partner' }, { status: 500 });
  }
}
