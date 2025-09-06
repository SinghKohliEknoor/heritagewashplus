import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function GET() {
  try {
    // Get the automatic wash images from the gallery bucket
    const { data: files, error } = await supabase.storage
      .from('gallery')
      .list('automatic-wash', {
        limit: 100,
        offset: 0,
      });

    if (error) {
      console.error('Storage error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!files || files.length === 0) {
      return NextResponse.json([], { status: 200 });
    }

    // Generate public URLs for the images
    const imageUrls = files
      .filter(file => file.name.toLowerCase().match(/\.(jpg|jpeg|png|gif|webp)$/))
      .map(file => {
        const { data } = supabase.storage
          .from('gallery')
          .getPublicUrl(`automatic-wash/${file.name}`);
        
        return {
          id: file.name,
          name: file.name,
          url: data.publicUrl,
          washType: file.name.toLowerCase().includes('touchless') ? 'touchless' : 'soft-touch'
        };
      });

    const response = NextResponse.json(imageUrls);
    
    // Add CORS headers to allow image loading
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
    
    return response;
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
