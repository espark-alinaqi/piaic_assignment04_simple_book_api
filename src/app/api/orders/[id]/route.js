import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '../../../../lib/auth';
import { pool } from '../../../../lib/db';

export async function PATCH(request, { params }) {
    const { id } = params;
    const { customerName } = await request.json();

    try {
        const client = verifyToken(request);
        await pool.query(
            'UPDATE orders SET customer_name = $1 WHERE id = $2 AND client_id = $3',
            [customerName, id, client.id]
        );
        return NextResponse.json({ message: 'Order updated' });
    } catch (err) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
}

export async function DELETE(request, { params }) {
    const { id } = params;
    try {
        const client = verifyToken(request);
        await pool.query('DELETE FROM orders WHERE id = $1 AND client_id = $2', [id, client.id]);
        return NextResponse.json({ message: 'Order deleted' });
    } catch (err) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
}
