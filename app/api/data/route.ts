import { NextResponse } from 'next/server';

interface DataItem {
  id: string;
  data: string;
  value: number;
  timestamp: string;
  randomField: 'active' | 'inactive';
}

let dataStore: DataItem[] = [];

export async function GET() {
  const randomData = {
    items: dataStore,
    random: {
      number: Math.floor(Math.random() * 1000),
      string: Math.random().toString(36).substring(2, 15),
      boolean: Math.random() > 0.5,
      array: Array.from({ length: 5 }, () => Math.floor(Math.random() * 100)),
      object: {
        key1: Math.random().toString(36),
        key2: Math.floor(Math.random() * 100),
        key3: Math.random() > 0.5,
      },
    },
    timestamp: new Date().toISOString(),
    count: dataStore.length,
  };

  return NextResponse.json(randomData);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<DataItem>;
    const newItem: DataItem = {
      id: Math.random().toString(36).substring(7),
      data: (body.data as string) || Math.random().toString(36),
      value: body.value || Math.floor(Math.random() * 1000),
      timestamp: new Date().toISOString(),
      randomField: (body.randomField as 'active' | 'inactive') || (Math.random() > 0.5 ? 'active' : 'inactive'),
    };
    dataStore.push(newItem);
    return NextResponse.json(newItem, { status: 201 });
  } catch {
    const randomItem: DataItem = {
      id: Math.random().toString(36).substring(7),
      data: Math.random().toString(36),
      value: Math.floor(Math.random() * 1000),
      timestamp: new Date().toISOString(),
      randomField: Math.random() > 0.5 ? 'active' : 'inactive',
    };
    dataStore.push(randomItem);
    return NextResponse.json(randomItem, { status: 201 });
  }
}

export async function DELETE() {
  const deletedCount = dataStore.length;
  dataStore = [];
  return NextResponse.json({
    message: 'All data deleted',
    deletedCount,
    randomNumber: Math.floor(Math.random() * 1000),
  });
}

