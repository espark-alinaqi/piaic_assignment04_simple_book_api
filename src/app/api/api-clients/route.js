import { NextRequest, NextResponse } from 'next/server';
import { pool } from '../../../lib/db';
import { signToken } from '../../../lib/auth';
import bcrypt from 'bcryptjs';

export async function POST(request) {
    const { clientName, clientEmail } = await request.json();
    const token = signToken({ name: clientName, email: clientEmail });

    try {
        await pool.query(
            'INSERT INTO clients (name, email, token) VALUES ($1, $2, $3)',
            [clientName, clientEmail, token]
        );
        return NextResponse.json({ token }, { status: 201 });
    } catch (err) {
        if (err.code === '23505') {
            return NextResponse.json({ error: 'API client already registered.' }, { status: 409 });
        }
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
