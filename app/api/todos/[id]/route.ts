import { NextResponse } from 'next/server';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// Shared store with parent route
let todos: Todo[] = [
  { id: 1, title: 'Learn Next.js', completed: false },
  { id: 2, title: 'Build API', completed: true },
];

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  const todo = todos.find(t => t.id === id);
  
  if (!todo) {
    return NextResponse.json(
      { error: 'Todo not found' },
      { status: 404 }
    );
  }
  
  return NextResponse.json(todo);
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  const todoIndex = todos.findIndex(t => t.id === id);
  
  if (todoIndex === -1) {
    return NextResponse.json(
      { error: 'Todo not found' },
      { status: 404 }
    );
  }
  
  try {
    const body = (await request.json()) as Partial<Todo>;
    const updatedTodo: Todo = {
      ...todos[todoIndex],
      ...body,
      updatedAt: new Date().toISOString(),
    };
    todos[todoIndex] = updatedTodo;
    return NextResponse.json(updatedTodo);
  } catch {
    todos[todoIndex].completed = !todos[todoIndex].completed;
    todos[todoIndex].updatedAt = new Date().toISOString();
    return NextResponse.json(todos[todoIndex]);
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  const todoIndex = todos.findIndex(t => t.id === id);
  
  if (todoIndex === -1) {
    return NextResponse.json(
      { error: 'Todo not found' },
      { status: 404 }
    );
  }
  
  const deletedTodo = todos.splice(todoIndex, 1)[0];
  return NextResponse.json({
    message: 'Todo deleted',
    deletedTodo,
  });
}

