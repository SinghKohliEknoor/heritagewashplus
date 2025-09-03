import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function POST(req: Request) {
  const body = await req.json();
  // Validate required fields
  const required = [
    'name', 'phone', 'email', 'carType', 'carMake', 'carModel', 'detailType', 'date', 'time'
  ];
  for (const field of required) {
    if (!body[field]) {
      return NextResponse.json({ error: `Missing field: ${field}` }, { status: 400 });
    }
  }
  // Insert into bookings table
  const { error } = await supabase.from('bookings').insert([
    {
      name: body.name,
      phone: body.phone,
      email: body.email,
      car_type: body.carType,
      car_make: body.carMake,
      car_model: body.carModel,
      detail_type: body.detailType,
      appointment_date: body.date,
      appointment_time: body.time,
    }
  ]);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}
