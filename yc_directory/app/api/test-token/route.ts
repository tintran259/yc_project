import { NextResponse } from "next/server";
import { writeClient } from "@/sanity/lib/view-client";

export async function GET() {
  try {
    const result = await writeClient.fetch(`*[_type == "author"][0]`);
    return NextResponse.json({ ok: true, result });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
