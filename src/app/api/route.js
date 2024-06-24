import { NextResponse } from 'next/server';

export async function GET(request) {
    return NextResponse.json({
        status: "API is running",
        routes: [
            "/api/status",
            "/api/books",
            "/api/orders",
            "/api/clients",
            "/api/books/:id",
            "/api/orders/:id",
        ]
    });
}
