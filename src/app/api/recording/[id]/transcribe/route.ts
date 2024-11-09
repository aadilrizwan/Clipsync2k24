import { client } from '@/lib/prisma'
import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await req.json()
  const { id } = await params

  const content = JSON.parse(body.content)

  const transcribed = await client.video.update({
    where: {
      userId: id,
      source: body.videoUrl,
    },
    data: {
      title: content.title,
      description: content.summary,
      summery: body.transcript,
    },
  })
  if (transcribed) {
    console.log('🟢 Transcribed')
    const options = {
      method: 'POST',
      url: process.env.VOICEFLOW_KNOWLEDGE_BASE_API,
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        Authorization: process.env.VOICEFLOW_API_KEY,
      },
      data: {
        data: {
          schema: {
            searchableFields: ['title', 'transcript'],
            metadataFields: ['title', 'transcript'],
          },
          name: content.title,
          items: [
            {
              title: content.title,
              transcript: body.transcript,
            },
          ],
        },
      },
    }

    const updateKB = await axios.request(options)

    if (updateKB.status === 200 || updateKB.status !== 200) {
      console.log("Knowledge base: ", updateKB.data)
      return NextResponse.json({ status: 200 })
    }
  }
  console.log('🔴 Transcription went wrong')

  return NextResponse.json({ status: 400 })
}
