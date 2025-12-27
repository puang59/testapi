import { NextResponse } from "next/server";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  createdAt?: string;
  updatedAt?: string;
}

let todos: Todo[] = [
  { id: 1, title: "Learn Next.js", completed: false },
  { id: 2, title: "Build API", completed: true },
];

export async function GET() {
  return NextResponse.json({
    todos,
    count: todos.length,
    completed: todos.filter((t) => t.completed).length,
    pending: todos.filter((t) => !t.completed).length,
  });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<Todo>;
    const newTodo: Todo = {
      id: todos.length > 0 ? Math.max(...todos.map((t) => t.id)) + 1 : 1,
      title: body.title || `Random task ${Math.floor(Math.random() * 1000)}`,
      completed: body.completed ?? false,
      createdAt: new Date().toISOString(),
    };
    todos.push(newTodo);
    return NextResponse.json(newTodo, { status: 201 });
  } catch {
    const randomTodo: Todo = {
      id: todos.length > 0 ? Math.max(...todos.map((t) => t.id)) + 1 : 1,
      title: `Random task ${Math.floor(Math.random() * 1000)}`,
      completed: Math.random() > 0.5,
      createdAt: new Date().toISOString(),
    };
    todos.push(randomTodo);
    return NextResponse.json(randomTodo, { status: 201 });
  }
}

export async function DELETE() {
  const deletedCount = todos.length;
  todos = [];
  return NextResponse.json({
    message: "All todos deleted",
    deletedCount,
  });
}
