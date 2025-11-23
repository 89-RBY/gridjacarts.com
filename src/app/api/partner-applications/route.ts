import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser, createUser } from '@/lib/auth';
import {
  getPartnerApplications,
  createPartnerApplication,
  updatePartnerApplication,
  deletePartnerApplication,
  createPartner,
} from '@/lib/data';

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const applications = await getPartnerApplications();
    return NextResponse.json({ applications });
  } catch (error) {
    console.error('Error fetching applications:', error);
    return NextResponse.json({ error: 'Failed to fetch applications' }, { status: 500 });
  }
}

// Public endpoint for submitting applications
export async function POST(request: NextRequest) {
  try {
    const applicationData = await request.json();

    // Validate required fields
    const requiredFields = ['companyName', 'contactPerson', 'email', 'phone', 'address', 'taxId', 'message'];
    for (const field of requiredFields) {
      if (!applicationData[field]) {
        return NextResponse.json({ error: `${field} is required` }, { status: 400 });
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(applicationData.email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    const newApplication = await createPartnerApplication({
      companyName: applicationData.companyName,
      contactPerson: applicationData.contactPerson,
      email: applicationData.email,
      phone: applicationData.phone,
      address: applicationData.address,
      taxId: applicationData.taxId,
      message: applicationData.message,
    });

    return NextResponse.json({
      application: newApplication,
      message: 'Application submitted successfully',
    });
  } catch (error) {
    console.error('Error creating application:', error);
    return NextResponse.json({ error: 'Failed to submit application' }, { status: 500 });
  }
}

// Approve or reject application
export async function PUT(request: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { id, action, markup = 20, notes = '' } = await request.json();

    if (!id || !action) {
      return NextResponse.json({ error: 'Application ID and action required' }, { status: 400 });
    }

    if (!['approve', 'reject'].includes(action)) {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    const applications = await getPartnerApplications();
    const application = applications.find((a) => a.id === id);

    if (!application) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }

    if (application.status !== 'pending') {
      return NextResponse.json({ error: 'Application already processed' }, { status: 400 });
    }

    if (action === 'approve') {
      // Create user account
      const newUser = await createUser({
        email: application.email,
        name: application.contactPerson,
        password: 'partner123', // Default password - should be emailed
        role: 'partner',
      });

      // Create partner profile
      const now = new Date();
      const fiscalYearStart = new Date(now.getFullYear(), 0, 1); // January 1st of current year

      await createPartner({
        userId: newUser.id,
        companyName: application.companyName,
        contactPerson: application.contactPerson,
        email: application.email,
        phone: application.phone,
        address: application.address,
        taxId: application.taxId,

        // Tier System - all new partners start at BRONZE
        currentTier: 'BRONZE',
        annualRevenue: 0,
        fiscalYearStart: fiscalYearStart.toISOString(),
        lastTierUpdate: now.toISOString(),

        // Legacy field for backward compatibility
        markup: markup,

        status: 'approved',
        notes: notes,
        approvedAt: new Date().toISOString(),
        approvedBy: user.id,
      });

      // Update application status
      await updatePartnerApplication(id, {
        status: 'approved',
        reviewedAt: new Date().toISOString(),
        reviewedBy: user.id,
      });

      return NextResponse.json({
        message: 'Application approved. Partner account created with default password: partner123',
      });
    } else {
      // Reject application
      await updatePartnerApplication(id, {
        status: 'rejected',
        reviewedAt: new Date().toISOString(),
        reviewedBy: user.id,
      });

      return NextResponse.json({ message: 'Application rejected' });
    }
  } catch (error) {
    console.error('Error processing application:', error);
    const message = error instanceof Error ? error.message : 'Failed to process application';
    return NextResponse.json({ error: message }, { status: 500 });
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
      return NextResponse.json({ error: 'Application ID required' }, { status: 400 });
    }

    const deleted = await deletePartnerApplication(id);

    if (!deleted) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Application deleted successfully' });
  } catch (error) {
    console.error('Error deleting application:', error);
    return NextResponse.json({ error: 'Failed to delete application' }, { status: 500 });
  }
}
