import { NextResponse } from 'next/server';

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  createdAt?: string;
  updatedAt?: string;
}

// In-memory store (for demo purposes)
let users: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com', age: 28 },
  { id: 2, name: 'Bob', email: 'bob@example.com', age: 32 },
];

const names = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank', 'Grace', 'Henry'];
const domains = ['example.com', 'test.com', 'demo.org', 'sample.net'];

export async function GET() {
  return NextResponse.json({
    users,
    count: users.length,
    timestamp: new Date().toISOString(),
  });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<User>;
    const newUser: User = {
      id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
      name: body.name || names[Math.floor(Math.random() * names.length)],
      email: body.email || `${Math.random().toString(36).substring(7)}@${domains[Math.floor(Math.random() * domains.length)]}`,
      age: body.age || Math.floor(Math.random() * 50) + 18,
      createdAt: new Date().toISOString(),
    };
    users.push(newUser);
    return NextResponse.json(newUser, { status: 201 });
  } catch {
    const randomUser: User = {
      id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
      name: names[Math.floor(Math.random() * names.length)],
      email: `${Math.random().toString(36).substring(7)}@${domains[Math.floor(Math.random() * domains.length)]}`,
      age: Math.floor(Math.random() * 50) + 18,
      createdAt: new Date().toISOString(),
    };
    users.push(randomUser);
    return NextResponse.json(randomUser, { status: 201 });
  }
}

