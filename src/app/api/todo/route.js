import { NextRequest, NextResponse } from 'next/server';
import { pool } from '../../../lib/db';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const limit = searchParams.get('limit');

    let query = 'SELECT * FROM todos';
    const params = [];

    if (type) {
        query += ' WHERE type = $1';
        params.push(type);
    }

    if (limit) {
        query += params.length ? ' AND' : ' WHERE';
        query += ` LIMIT $${params.length + 1}`;
        params.push(parseInt(limit, 10));
    }

    const result = await pool.query(query, params);
    return NextResponse.json(result.rows);
}

