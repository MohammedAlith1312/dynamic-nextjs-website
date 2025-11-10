import { NextResponse } from 'next/server';

let cache: { data: any; timestamp: number } | null = null;
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

const En_API_URL = "https://portal.mawarid.com.sa/SystemApi/api/v1/entitytype/dynamic/getbycategoryid?CategoryId=CDN0000012&getfromjson=true";
const Ar_API_URL = "https://portal.mawarid.com.sa/SystemApi/api/v1/entitytype/dynamic/getbycategoryid?CategoryId=CDN0000018&getfromjson=true";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get('locale') === 'ar' ? 'ar' : 'en';

  const API_URL = locale === 'ar' ? Ar_API_URL : En_API_URL;
  const now = Date.now();

  if (cache && cache.timestamp + CACHE_DURATION > now) {
    return NextResponse.json(cache.data);
  }

  try {
    const response = await fetch(API_URL, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer Public",
        "Appcode": "SOL0000008",
        "Area": "System",
        "Clientsecretid": "536d1e85f7a04cd385c27d98ff949cda",
        "Clientuserid": "Public",
        "Companycode": "Mawarid",
      },
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch from API' }, { status: response.status });
    }

    const data = await response.json();
    cache = { data, timestamp: now };
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
