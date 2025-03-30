import { writeClient } from "@/app/sanity/lib/view-client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  console.log("req ==================:", req.body);

  const { id, userViews } = await req.json();
  await writeClient
    .patch(id)
    .set({ views: userViews.views + 1 })
    .commit();
  return NextResponse.next();
}
