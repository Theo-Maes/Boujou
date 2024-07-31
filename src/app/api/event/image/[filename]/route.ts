import { join } from 'path';
import { promises as fs } from 'fs';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);    
    const filename = url.toString().substring(38);

    if (!filename) {
      return NextResponse.json({ error: 'Filename is required' }, { status: 400 });
    }

    const filePath = join(process.cwd(), 'public', 'event', filename);
    const fileContents = await fs.readFile(filePath);
    const fileExtension = filename.split('.').pop();
    let mimeType = 'application/octet-stream';

    if (fileExtension === 'jpg' || fileExtension === 'jpeg') {
      mimeType = 'image/jpeg';
    } else if (fileExtension === 'png') {
      mimeType = 'image/png';
    }

    return new NextResponse(fileContents, {
      status: 200,
      headers: {
        'Content-Type': mimeType,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Image not found' }, { status: 404 });
  }
}
