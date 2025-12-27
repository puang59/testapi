import { NextResponse } from 'next/server';

export async function GET() {
  const randomData = {
    number: Math.floor(Math.random() * 1000),
    float: Math.random() * 100,
    boolean: Math.random() > 0.5,
    string: Math.random().toString(36).substring(7),
    timestamp: Date.now(),
    array: Array.from({ length: Math.floor(Math.random() * 10) + 1 }, () => 
      Math.floor(Math.random() * 100)
    ),
  };

  return NextResponse.json(randomData);
}


