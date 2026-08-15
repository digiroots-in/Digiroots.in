import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getDb } from './_lib/mongodb.js';

interface ContactPayload {
  businessName: string;
  email: string;
  phone: string;
  selectedServices: string[];
}

function isValidPayload(body: unknown): body is ContactPayload {
  const b = body as Partial<ContactPayload> | null | undefined;
  return (
    typeof b?.businessName === 'string' && b.businessName.trim() !== '' &&
    typeof b?.email === 'string' && b.email.trim() !== '' &&
    typeof b?.phone === 'string' && b.phone.trim() !== '' &&
    Array.isArray(b?.selectedServices)
  );
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ success: false, error: 'Method not allowed' });
    return;
  }

  if (!isValidPayload(req.body)) {
    res.status(400).json({ success: false, error: 'Invalid contact payload' });
    return;
  }

  try {
    const db = await getDb();
    await db.collection('contacts').insertOne({
      businessName: req.body.businessName,
      email: req.body.email,
      phone: req.body.phone,
      selectedServices: req.body.selectedServices,
      createdAt: new Date(),
    });
    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Failed to save contact submission:', err);
    res.status(500).json({ success: false, error: 'Failed to save submission' });
  }
}
