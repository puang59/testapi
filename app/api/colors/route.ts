import { NextResponse } from 'next/server';

interface RGB {
  r: number;
  g: number;
  b: number;
}

interface HSL {
  h: number;
  s: number;
  l: number;
}

interface Color {
  name: string;
  hex: string;
  rgb: RGB;
  hsl?: HSL;
  timestamp?: number;
  createdAt?: string;
}

const colors: string[] = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'black', 'white', 'gray'];

export async function GET() {
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const hex = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
  const rgb = {
    r: Math.floor(Math.random() * 256),
    g: Math.floor(Math.random() * 256),
    b: Math.floor(Math.random() * 256),
  };

  return NextResponse.json({
    name: randomColor,
    hex,
    rgb,
    hsl: {
      h: Math.floor(Math.random() * 360),
      s: Math.floor(Math.random() * 100),
      l: Math.floor(Math.random() * 100),
    },
    timestamp: Date.now(),
  });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<Color>;
    const color: Color = {
      name: body.name || colors[Math.floor(Math.random() * colors.length)],
      hex: body.hex || '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'),
      rgb: body.rgb || {
        r: Math.floor(Math.random() * 256),
        g: Math.floor(Math.random() * 256),
        b: Math.floor(Math.random() * 256),
      },
      createdAt: new Date().toISOString(),
    };
    return NextResponse.json(color, { status: 201 });
  } catch {
    const randomColor: Color = {
      name: colors[Math.floor(Math.random() * colors.length)],
      hex: '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'),
      rgb: {
        r: Math.floor(Math.random() * 256),
        g: Math.floor(Math.random() * 256),
        b: Math.floor(Math.random() * 256),
      },
      createdAt: new Date().toISOString(),
    };
    return NextResponse.json(randomColor, { status: 201 });
  }
}

