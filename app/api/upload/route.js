// app/api/upload/route.js
import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join, extname } from 'path';
import crypto from 'crypto';
import { FILE_CONFIG } from '../../utils/constants';

const UPLOAD_DIR = join(process.cwd(), 'private', 'uploads');

// Ensure upload directory exists
await mkdir(UPLOAD_DIR, { recursive: true });

export async function POST(request) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('files');

    // Validate files
    if (files.length > FILE_CONFIG.MAX_FILES) {
      return NextResponse.json(
        { error: `Maximum ${FILE_CONFIG.MAX_FILES} files allowed` },
        { status: 400 }
      );
    }

    const fileUrls = [];

    for (const file of files) {
      // Validate file size and type
      if (file.size > FILE_CONFIG.MAX_SIZE) {
        return NextResponse.json(
          { error: 'File too large' },
          { status: 400 }
        );
      }

      if (!FILE_CONFIG.ALLOWED_TYPES.includes(file.type)) {
        return NextResponse.json(
          { error: 'Invalid file type' },
          { status: 400 }
        );
      }

      // Generate unique filename
      const uniqueId = crypto.randomBytes(16).toString('hex');
      const ext = extname(file.name);
      const filename = `${uniqueId}${ext}`;
      const filepath = join(UPLOAD_DIR, filename);

      // Write file
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      await writeFile(filepath, buffer);

      // Generate secure URL
      fileUrls.push(`/api/files/${filename}`);
    }

    return NextResponse.json({ fileUrls });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    );
  }
}