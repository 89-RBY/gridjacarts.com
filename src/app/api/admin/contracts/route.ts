import { NextResponse, NextRequest } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser || currentUser.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const partnerId = searchParams.get('partnerId');

    const where: any = {};
    if (status) where.status = status;
    if (partnerId) where.partnerId = partnerId;

    // Get all contracts with partner information
    const contracts = await prisma.contract.findMany({
      where,
      include: {
        partner: {
          select: {
            companyName: true,
            contactPerson: true,
            email: true,
          },
        },
      },
      orderBy: { uploadedAt: 'desc' },
    });

    return NextResponse.json({
      contracts: contracts.map((c: any) => ({
        ...c,
        signedAt: c.signedAt?.toISOString(),
        expiresAt: c.expiresAt?.toISOString(),
        uploadedAt: c.uploadedAt.toISOString(),
        createdAt: c.createdAt.toISOString(),
        updatedAt: c.updatedAt.toISOString(),
      })),
    });
  } catch (error) {
    console.error('Contracts GET API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser || currentUser.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { id, status, notes, signedAt, expiresAt } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'Contract ID required' }, { status: 400 });
    }

    const updateData: any = {};
    if (status) updateData.status = status;
    if (notes !== undefined) updateData.notes = notes;
    if (signedAt !== undefined) updateData.signedAt = signedAt ? new Date(signedAt) : null;
    if (expiresAt !== undefined) updateData.expiresAt = expiresAt ? new Date(expiresAt) : null;

    const updatedContract = await prisma.contract.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({
      contract: {
        ...updatedContract,
        signedAt: updatedContract.signedAt?.toISOString(),
        expiresAt: updatedContract.expiresAt?.toISOString(),
        uploadedAt: updatedContract.uploadedAt.toISOString(),
        createdAt: updatedContract.createdAt.toISOString(),
        updatedAt: updatedContract.updatedAt.toISOString(),
      },
      message: 'Contract updated successfully'
    });
  } catch (error) {
    console.error('Contract PUT API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser || currentUser.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Contract ID required' }, { status: 400 });
    }

    await prisma.contract.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Contract deleted successfully' });
  } catch (error) {
    console.error('Contract DELETE API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
