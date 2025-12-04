import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function GET(
  request: NextRequest,
  { params }: { params: { filename: string } }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { filename } = params;

    // Security: Prevent path traversal attacks
    if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
      return NextResponse.json({ error: 'Invalid filename' }, { status: 400 });
    }

    // Find the contract in database
    const contract = await prisma.contract.findFirst({
      where: {
        fileUrl: `/api/contracts/files/${filename}`,
      },
      include: {
        partner: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!contract) {
      return NextResponse.json({ error: 'Contract not found' }, { status: 404 });
    }

    // Authorization: Check if user has access to this contract
    const user = await prisma.user.findUnique({
      where: { email: currentUser.email },
      include: { partner: true },
    });

    const isAdmin = user?.role === 'admin';
    const isOwner = user?.partner?.id === contract.partnerId;

    if (!isAdmin && !isOwner) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Read file from volume
    const storageDir = process.env.CONTRACTS_STORAGE_PATH || '/data_gridjacarts/contracts';
    const filePath = join(storageDir, filename);

    if (!existsSync(filePath)) {
      console.error(`File not found: ${filePath}`);
      return NextResponse.json({ error: 'File not found in storage' }, { status: 404 });
    }

    const fileBuffer = await readFile(filePath);

    // Return file with appropriate headers
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': contract.mimeType,
        'Content-Disposition': `inline; filename="${contract.fileName}"`,
        'Content-Length': contract.fileSize.toString(),
        'Cache-Control': 'private, max-age=3600',
      },
    });
  } catch (error) {
    console.error('Error serving contract file:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
