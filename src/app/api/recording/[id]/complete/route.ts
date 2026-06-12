import { client } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const body = await req.json();
  const { id } = await params;

  const completeProcessing = await client.video.update({
    where: {
      source: body.videoUrl,
    },
    data: {
      processing: false,
    },
  });
  if (completeProcessing) {
    return NextResponse.json({ status: 200 });
  }

  return NextResponse.json({ status: 400 });
}
