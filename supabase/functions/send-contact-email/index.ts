const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Max-Age': '86400',
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const rateLimitWindowMs = 10 * 60 * 1000;
const maxRequestsPerWindow = 5;
const attempts = new Map<string, { count: number; resetAt: number }>();
const timeSlots = [
  '10:30 - 11:30',
  '11:30 - 12:30',
  '12:30 - 13:30',
  '13:30 - 14:30',
  '14:30 - 15:30',
  '15:30 - 16:30',
  '16:30 - 17:30',
  '17:30 - 18:30',
  '18:30 - 19:30',
  '19:30 - 20:30',
  '20:00 - 21:00',
];
const weekdayOnlySlots = timeSlots.filter((slot) => slot !== '10:30 - 11:30' && slot !== '20:00 - 21:00');

const jsonResponse = (body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });

const preflightResponse = (req: Request) => {
  const requestedHeaders = req.headers.get('access-control-request-headers');

  return new Response(null, {
    status: 200,
    headers: {
      ...corsHeaders,
      ...(requestedHeaders ? { 'Access-Control-Allow-Headers': requestedHeaders } : {}),
    },
  });
};

const cleanText = (value: unknown, maxLength: number) =>
  String(value ?? '').replace(/[\r\n]+/g, ' ').trim().slice(0, maxLength);

const escapeHtml = (value: unknown) =>
  cleanText(value, 1000)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const getLocalDay = (dateString: string) => {
  if (!dateString) return null;
  const [year, month, day] = dateString.split('-').map(Number);
  if (!year || !month || !day) return null;
  return new Date(year, month - 1, day).getDay();
};

const isTuesday = (dateString: string) => getLocalDay(dateString) === 2;

const isWeekend = (dateString: string) => {
  const day = getLocalDay(dateString);
  return day === 0 || day === 6;
};

const isValidTimeForDate = (preferredTime: string, preferredDate: string) => {
  if (!preferredTime) return true;
  if (!timeSlots.includes(preferredTime)) return false;
  if (!preferredDate || isWeekend(preferredDate)) return true;
  return weekdayOnlySlots.includes(preferredTime);
};

const getRateLimitKey = (req: Request, email: string) => {
  const ip = req.headers.get('cf-connecting-ip') || req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  return `${ip}:${email.toLowerCase()}`;
};

const isRateLimited = (key: string) => {
  const now = Date.now();
  const current = attempts.get(key);

  if (!current || current.resetAt <= now) {
    attempts.set(key, { count: 1, resetAt: now + rateLimitWindowMs });
    return false;
  }

  current.count += 1;
  attempts.set(key, current);
  return current.count > maxRequestsPerWindow;
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return preflightResponse(req);
  }

  if (req.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405);
  }

  try {
    const body = await req.json().catch(() => null);

    if (!body || typeof body !== 'object') {
      return jsonResponse({ error: 'Invalid request body' }, 400);
    }

    const name = cleanText(body.name, 120);
    const email = cleanText(body.email, 160).toLowerCase();
    const phone = cleanText(body.phone, 40);
    const preferredDate = cleanText(body.preferredDate, 20);
    const preferredTime = cleanText(body.preferredTime, 30);
    const message = cleanText(body.message, 1000);
    const website = cleanText(body.website, 120);

    if (website) {
      return jsonResponse({ success: true });
    }

    if (!name || !email) {
      return jsonResponse({ error: 'Name and email are required' }, 400);
    }

    if (!emailPattern.test(email)) {
      return jsonResponse({ error: 'A valid email is required' }, 400);
    }

    if (isTuesday(preferredDate)) {
      return jsonResponse({ error: 'KidSalonia is closed on Tuesday' }, 400);
    }

    if (!isValidTimeForDate(preferredTime, preferredDate)) {
      return jsonResponse({ error: 'Selected time is not available for the chosen date' }, 400);
    }

    if (isRateLimited(getRateLimitKey(req, email))) {
      return jsonResponse({ error: 'Too many requests. Please try again later.' }, 429);
    }

    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    if (!RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not configured');
    }

    const htmlBody = `
      <h2>New Contact Form Submission</h2>
      <table style="border-collapse:collapse;width:100%;max-width:500px;">
        <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Name</td><td style="padding:8px;border-bottom:1px solid #eee;">${escapeHtml(name)}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Email</td><td style="padding:8px;border-bottom:1px solid #eee;">${escapeHtml(email)}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Phone</td><td style="padding:8px;border-bottom:1px solid #eee;">${escapeHtml(phone || 'Not provided')}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Preferred Date</td><td style="padding:8px;border-bottom:1px solid #eee;">${escapeHtml(preferredDate || 'Not specified')}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Preferred Time</td><td style="padding:8px;border-bottom:1px solid #eee;">${escapeHtml(preferredTime || 'Not specified')}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Message</td><td style="padding:8px;border-bottom:1px solid #eee;">${escapeHtml(message || 'No message')}</td></tr>
      </table>
    `;

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'KidSalonia Contact <sales@kidsalonia.com>',
        to: ['kidsalonia@gmail.com'],
        cc: ['ks-kidsalonia@gmail.com'],
        subject: `New Contact: ${name}`,
        html: htmlBody,
        reply_to: email,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error('Resend error:', data);
      return jsonResponse({ error: 'Failed to send email', details: data }, 500);
    }

    return jsonResponse({ success: true, id: data.id });
  } catch (error) {
    console.error('Error:', error);
    return jsonResponse({ error: error.message }, 500);
  }
});
