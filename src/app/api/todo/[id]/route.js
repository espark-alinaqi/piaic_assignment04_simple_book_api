import { NextRequest, NextResponse } from 'next/server';
import { pool } from '../../../../lib/db';

export async function GET(request, { params }) {
    const { id } = params;
    const result = await pool.query('SELECT * FROM todos WHERE id = $1', [id]);

    if (result.rows.length === 0) {
        return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
}
