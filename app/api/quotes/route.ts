import { NextResponse } from 'next/server';

interface Quote {
  id: number;
  quote: string;
  author: string;
  createdAt?: string;
  likes?: number;
  timestamp?: number;
}

const quotes: string[] = [
  'The only way to do great work is to love what you do.',
  'Innovation distinguishes between a leader and a follower.',
  'Life is what happens to you while you\'re busy making other plans.',
  'The future belongs to those who believe in the beauty of their dreams.',
  'It is during our darkest moments that we must focus to see the light.',
];

export async function GET() {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  return NextResponse.json({
    quote: randomQuote,
    author: 'Anonymous',
    id: Math.floor(Math.random() * 1000),
    timestamp: Date.now(),
  });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<Quote>;
    const newQuote: Quote = {
      id: Math.floor(Math.random() * 10000),
      quote: body.quote || quotes[Math.floor(Math.random() * quotes.length)],
      author: body.author || 'Anonymous',
      createdAt: new Date().toISOString(),
      likes: Math.floor(Math.random() * 100),
    };
    return NextResponse.json(newQuote, { status: 201 });
  } catch {
    const randomQuote: Quote = {
      id: Math.floor(Math.random() * 10000),
      quote: quotes[Math.floor(Math.random() * quotes.length)],
      author: 'Anonymous',
      createdAt: new Date().toISOString(),
      likes: Math.floor(Math.random() * 100),
    };
    return NextResponse.json(randomQuote, { status: 201 });
  }
}

