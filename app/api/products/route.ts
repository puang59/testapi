import { NextResponse } from 'next/server';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  inStock?: boolean;
  rating?: number;
  createdAt?: string;
}

const products: Product[] = [
  { id: 1, name: 'Laptop', price: 999.99, category: 'Electronics' },
  { id: 2, name: 'Phone', price: 699.99, category: 'Electronics' },
  { id: 3, name: 'Book', price: 19.99, category: 'Education' },
];

const productNames = ['Widget', 'Gadget', 'Thingamajig', 'Doohickey', 'Whatchamacallit'];
const categories = ['Electronics', 'Clothing', 'Food', 'Books', 'Toys', 'Tools'];

export async function GET() {
  const randomProducts: Product[] = Array.from({ length: Math.floor(Math.random() * 5) + 1 }, () => ({
    id: Math.floor(Math.random() * 10000),
    name: productNames[Math.floor(Math.random() * productNames.length)],
    price: parseFloat((Math.random() * 1000).toFixed(2)),
    category: categories[Math.floor(Math.random() * categories.length)],
    inStock: Math.random() > 0.5,
    rating: parseFloat((Math.random() * 5).toFixed(1)),
  }));

  return NextResponse.json({
    products: [...products, ...randomProducts],
    total: products.length + randomProducts.length,
    timestamp: Date.now(),
  });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<Product>;
    const newProduct: Product = {
      id: Math.floor(Math.random() * 10000),
      name: body.name || productNames[Math.floor(Math.random() * productNames.length)],
      price: body.price || parseFloat((Math.random() * 1000).toFixed(2)),
      category: body.category || categories[Math.floor(Math.random() * categories.length)],
      inStock: body.inStock ?? (Math.random() > 0.5),
      rating: parseFloat((Math.random() * 5).toFixed(1)),
      createdAt: new Date().toISOString(),
    };
    return NextResponse.json(newProduct, { status: 201 });
  } catch {
    const randomProduct: Product = {
      id: Math.floor(Math.random() * 10000),
      name: productNames[Math.floor(Math.random() * productNames.length)],
      price: parseFloat((Math.random() * 1000).toFixed(2)),
      category: categories[Math.floor(Math.random() * categories.length)],
      inStock: Math.random() > 0.5,
      rating: parseFloat((Math.random() * 5).toFixed(1)),
      createdAt: new Date().toISOString(),
    };
    return NextResponse.json(randomProduct, { status: 201 });
  }
}

