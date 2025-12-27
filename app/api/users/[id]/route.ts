import { NextResponse } from 'next/server';

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  createdAt?: string;
  updatedAt?: string;
}

// In-memory store (shared with parent route)
let users: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com', age: 28 },
  { id: 2, name: 'Bob', email: 'bob@example.com', age: 32 },
];

const names = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank', 'Grace', 'Henry'];
const domains = ['example.com', 'test.com', 'demo.org', 'sample.net'];

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  const user = users.find(u => u.id === id);
  
  if (!user) {
    return NextResponse.json(
      { error: 'User not found', randomId: Math.floor(Math.random() * 1000) },
      { status: 404 }
    );
  }
  
  return NextResponse.json(user);
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  const userIndex = users.findIndex(u => u.id === id);
  
  if (userIndex === -1) {
    return NextResponse.json(
      { error: 'User not found' },
      { status: 404 }
    );
  }
  
  try {
    const body = (await request.json()) as Partial<User>;
    const updatedUser: User = {
      ...users[userIndex],
      ...body,
      id,
      updatedAt: new Date().toISOString(),
    };
    users[userIndex] = updatedUser;
    return NextResponse.json(updatedUser);
  } catch {
    const updatedUser: User = {
      ...users[userIndex],
      name: names[Math.floor(Math.random() * names.length)],
      age: Math.floor(Math.random() * 50) + 18,
      updatedAt: new Date().toISOString(),
    };
    users[userIndex] = updatedUser;
    return NextResponse.json(updatedUser);
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  const userIndex = users.findIndex(u => u.id === id);
  
  if (userIndex === -1) {
    return NextResponse.json(
      { error: 'User not found' },
      { status: 404 }
    );
  }
  
  try {
    const body = (await request.json()) as Partial<User>;
    const updatedUser: User = {
      ...users[userIndex],
      ...body,
      updatedAt: new Date().toISOString(),
    };
    users[userIndex] = updatedUser;
    return NextResponse.json(updatedUser);
  } catch {
    users[userIndex].age = Math.floor(Math.random() * 50) + 18;
    users[userIndex].updatedAt = new Date().toISOString();
    return NextResponse.json(users[userIndex]);
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  const userIndex = users.findIndex(u => u.id === id);
  
  if (userIndex === -1) {
    return NextResponse.json(
      { error: 'User not found', deleted: false },
      { status: 404 }
    );
  }
  
  const deletedUser = users.splice(userIndex, 1)[0];
  return NextResponse.json({
    message: 'User deleted successfully',
    deletedUser,
    randomNumber: Math.floor(Math.random() * 1000),
  });
}

