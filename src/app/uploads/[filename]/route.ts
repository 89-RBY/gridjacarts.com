import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { readFile } from 'fs/promises';
import { existsSync } from 'fs';

export async function GET(
    request: NextRequest,
    { params }: { params: { filename: string } }
) {
    const filename = params.filename;

    // Check locations in order of preference
    const pathsToCheck = [
        process.env.TEAM_STORAGE_PATH ? path.join(process.env.TEAM_STORAGE_PATH, filename) : null,
        process.env.BLOG_STORAGE_PATH ? path.join(process.env.BLOG_STORAGE_PATH, filename) : null,
        path.join(process.cwd(), 'public', 'uploads', filename)
    ].filter(Boolean) as string[];

    let filePath = '';
    for (const p of pathsToCheck) {
        if (existsSync(p)) {
            filePath = p;
            break;
        }
    }

    if (!filePath) {
        return new NextResponse('File not found', { status: 404 });
    }

    try {
        const fileBuffer = await readFile(filePath);
        const ext = path.extname(filename).toLowerCase();
        let contentType = 'application/octet-stream';

        if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
        else if (ext === '.png') contentType = 'image/png';
        else if (ext === '.gif') contentType = 'image/gif';
        else if (ext === '.webp') contentType = 'image/webp';
        else if (ext === '.svg') contentType = 'image/svg+xml';

        return new NextResponse(new Uint8Array(fileBuffer), {
            headers: {
                'Content-Type': contentType,
                'Cache-Control': 'public, max-age=31536000, immutable',
            },
        });
    } catch (error) {
        console.error('Error serving file:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
