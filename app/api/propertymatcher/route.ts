import { NextRequest, NextResponse } from "next/server";

// shape coming from Bubble
type Payload = {
  conversation_id?: string;
  limit?: number;
  criteria: {
    location?: string;
    min_price?: number;
    max_price?: number;
    beds_min?: number;
    baths_min?: number;
    property_types?: string[];
    keywords?: string;
  };
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Payload;

    // TODO: replace with your real logic:
    // call your OpenAI Workflow/Agent, Apify, MLS, etc.
    // For now, return a stub so Bubble can parse it.
    const results = [
      {
        title: "Sample listing",
        url: "https://www.centris.ca/en/sample",
        price: 499000,
        beds: 2,
        baths: 1,
        address: "123 Example St, Laval, QC",
        source: "Demo",
      },
    ];

    return NextResponse.json({
      conversation_id: body.conversation_id ?? null,
      count: Math.min(body.limit ?? 6, results.length),
      items: results.slice(0, body.limit ?? 6),
      criteria_used: body.criteria,
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "unknown error";
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
