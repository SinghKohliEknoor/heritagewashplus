import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function GET() {
  try {
    // Get the gallery data from the table
    const { data: galleryData, error: tableError } = await supabase
      .from('gallery_images')
      .select('*')
      .order('uploaded_at', { ascending: false });

    if (tableError) {
      console.error('Database error:', tableError);
      return NextResponse.json({ error: tableError.message }, { status: 500 });
    }

    if (!galleryData || galleryData.length === 0) {
      return NextResponse.json([], { status: 200 });
    }

    // Since your URLs in the database are already full public URLs, we can return them directly
    const response = NextResponse.json(galleryData);
    
    // Add CORS headers to allow image loading
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
    
    return response;
  } catch (error) {
    console.error('Gallery API error:', error);
    return NextResponse.json({ error: 'Failed to fetch gallery images' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const beforeFile = formData.get('before') as File;
    const afterFile = formData.get('after') as File;
    const caption = formData.get('caption') as string;

    if (!beforeFile || !afterFile || !caption) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Generate unique filenames
    const timestamp = Date.now();
    const beforeFileName = `before_${timestamp}_${beforeFile.name}`;
    const afterFileName = `after_${timestamp}_${afterFile.name}`;

    // Upload before image
    const { data: beforeUpload, error: beforeError } = await supabase.storage
      .from('gallery')
      .upload(beforeFileName, beforeFile);

    if (beforeError) {
      return NextResponse.json({ error: `Before image upload failed: ${beforeError.message}` }, { status: 500 });
    }

    // Upload after image
    const { data: afterUpload, error: afterError } = await supabase.storage
      .from('gallery')
      .upload(afterFileName, afterFile);

    if (afterError) {
      // Clean up before image if after upload fails
      await supabase.storage.from('gallery').remove([beforeFileName]);
      return NextResponse.json({ error: `After image upload failed: ${afterError.message}` }, { status: 500 });
    }

    // Save to database
    const { data: dbData, error: dbError } = await supabase
      .from('gallery_images')
      .insert({
        before_url: beforeUpload.path,
        after_url: afterUpload.path,
        caption: caption,
        uploaded_at: new Date().toISOString()
      })
      .select()
      .single();

    if (dbError) {
      // Clean up uploaded files if database insert fails
      await supabase.storage.from('gallery').remove([beforeFileName, afterFileName]);
      return NextResponse.json({ error: `Database insert failed: ${dbError.message}` }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: dbData }, { status: 201 });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Failed to upload images' }, { status: 500 });
  }
}
