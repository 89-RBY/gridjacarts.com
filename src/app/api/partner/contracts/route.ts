import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function GET() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user and partner
    const user = await prisma.user.findUnique({
      where: { email: currentUser.email },
      include: { partner: true },
    });

    if (!user?.partner) {
      return NextResponse.json({ error: 'Partner not found' }, { status: 404 });
    }

    // Get all contracts for this partner
    const contracts = await prisma.contract.findMany({
      where: { partnerId: user.partner.id },
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

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: currentUser.email },
      include: { partner: true },
    });

    if (!user?.partner) {
      return NextResponse.json({ error: 'Partner not found' }, { status: 404 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const contractType = formData.get('contractType') as string || 'partnership';

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only PDF and Word documents are allowed.' },
        { status: 400 }
      );
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 10MB.' },
        { status: 400 }
      );
    }

    // Generate contract number
    const year = new Date().getFullYear();
    const count = await prisma.contract.count({
      where: { partnerId: user.partner.id },
    });
    const contractNumber = `CONTR-${year}-${user.partner.id.slice(-4).toUpperCase()}-${String(count + 1).padStart(3, '0')}`;

    // Use external volume for contract storage
    const uploadsDir = process.env.CONTRACTS_STORAGE_PATH || '/data_gridjacarts/contracts';
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true });
    }

    // Save file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName = `${contractNumber}-${file.name}`;
    const filePath = join(uploadsDir, fileName);
    await writeFile(filePath, buffer);

    console.log(`Contract saved to: ${filePath}`);

    // Create contract record - URL points to API endpoint that will serve from volume
    const contract = await prisma.contract.create({
      data: {
        partnerId: user.partner.id,
        contractNumber,
        contractType,
        fileName: file.name,
        fileUrl: `/api/contracts/files/${fileName}`,
        fileSize: file.size,
        mimeType: file.type,
        status: 'PENDING',
      },
    });

    return NextResponse.json({
      contract: {
        ...contract,
        signedAt: contract.signedAt?.toISOString(),
        expiresAt: contract.expiresAt?.toISOString(),
        uploadedAt: contract.uploadedAt.toISOString(),
        createdAt: contract.createdAt.toISOString(),
        updatedAt: contract.updatedAt.toISOString(),
      },
    }, { status: 201 });
  } catch (error: any) {
    console.error('Contracts POST API error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
