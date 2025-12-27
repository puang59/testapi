import { NextResponse } from 'next/server';

const statusCodes = [200, 201, 202, 204, 400, 401, 403, 404, 500, 502, 503];
const messages = [
  'Success',
  'Created',
  'Accepted',
  'Bad Request',
  'Unauthorized',
  'Forbidden',
  'Not Found',
  'Internal Server Error',
];

export async function GET() {
  const randomStatus = statusCodes[Math.floor(Math.random() * statusCodes.length)];
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];
  
  const data = {
    status: randomStatus,
    message: randomMessage,
    timestamp: new Date().toISOString(),
    random: {
      number: Math.floor(Math.random() * 1000),
      string: Math.random().toString(36).substring(7),
    },
  };

  return NextResponse.json(data, { status: randomStatus });
}


