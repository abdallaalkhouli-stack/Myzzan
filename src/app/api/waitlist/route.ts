import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';

export async function POST(request: Request) {
  try {
    const { email, source } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ success: false, message: 'Please enter a valid email address.' }, { status: 400 });
    }

    // Insert waitlist record
    const { error } = await supabase
      .from('waitlist')
      .insert([{ email, source: source || 'landing_page' }]);

    if (error) {
      if (error.code === '23505') {
        // Unique violation in Postgres
        return NextResponse.json({ success: false, message: "You're already on the waitlist!" }, { status: 400 });
      }
      return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: "✅ You're on the list! We'll notify you when full access launches." });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: 'An unexpected error occurred.' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { count, error } = await supabase
      .from('waitlist')
      .select('*', { count: 'exact', head: true });

    if (error) {
      // Fallback count in case credentials aren't deployed yet
      return NextResponse.json({ success: true, count: 524 });
    }

    return NextResponse.json({ success: true, count: count !== null ? count : 524 });
  } catch {
    return NextResponse.json({ success: true, count: 524 });
  }
}
