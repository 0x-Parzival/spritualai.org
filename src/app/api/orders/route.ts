import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Path to the orders file in the project root
const ORDERS_FILE_PATH = path.join(process.cwd(), 'orders.json');

export async function POST(request: Request) {
    try {
        const orderData = await request.json();

        // VALIDATION: Check if orderData exists and has content
        if (!orderData || Object.keys(orderData).length === 0) {
            return NextResponse.json(
                { success: false, error: 'Invalid order data: Body cannot be empty' },
                { status: 400 }
            );
        }

        // 1. Read existing orders
        let orders = [];
        if (fs.existsSync(ORDERS_FILE_PATH)) {
            const fileContent = fs.readFileSync(ORDERS_FILE_PATH, 'utf-8');
            try {
                orders = JSON.parse(fileContent);
            } catch (e) {
                console.error("Error parsing orders.json", e);
                // If corrupted, start fresh
                orders = [];
            }
        }

        // 2. Add ID and save
        const newOrder = {
            id: crypto.randomUUID(),
            ...orderData
        };

        orders.push(newOrder);

        // 3. Write back to file
        fs.writeFileSync(ORDERS_FILE_PATH, JSON.stringify(orders, null, 2));

        return NextResponse.json({ success: true, orderId: newOrder.id });

    } catch (error) {
        console.error("Order processing error:", error);
        return NextResponse.json(
            { success: false, error: 'Failed to process order' },
            { status: 500 }
        );
    }
}
