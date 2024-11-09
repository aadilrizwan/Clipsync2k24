const fs = require("fs");
const fsp = fs.promises;
const cors = require("cors");
const http = require("http");
const express = require("express");
const { Server } = require("socket.io");
const { Readable } = require("stream");
const axios = require("axios");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
const OpenAI = require('openai');

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
const server = http.createServer(app);
app.use(cors());

const io = new Server(server, {
  cors: {
    origin: process.env.ELECTRON_HOST,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Socket is Connected");

  socket.on("video-chunks", (data) => {
    console.log("Video Chunk is sent");

    const filePath = `temp_upload/${data.filename}`;
    const writestream = fs.createWriteStream(filePath, { flags: "a" });
    const buffer = Buffer.from(data.chunks);
    const readStream = Readable.from(buffer);
    readStream.pipe(writestream).on("finish", () => {
      console.log("Chunk saved");
    }).on("error", (err) => {
      console.error("Error saving chunk:", err);
    });
  });

  socket.on("process-video", async (data) => {
    console.log("Processing video...");

    const filePath = `temp_upload/${data.filename}`;

    try {
      const file = await fsp.readFile(filePath);
      // console.log(data);

      const uploadResult = await cloudinary.uploader.upload(filePath, {
        resource_type: "video",
        public_id: `uploads/${data.filename}`,
      });
      const processingResponse = await axios.post(
        `${process.env.NEXT_API_HOST}recording/${data.userId}/processing`,
        { filename: uploadResult.secure_url }
      );
      if (processingResponse.data.status !== 200) {
        return console.error("Error creating the processing file");
      }

      console.log("Video uploaded to Cloudinary:", uploadResult.secure_url);

      if (processingResponse.data.plan === "PRO") {
        // console.log("Inside Pro");
        const stat = await fsp.stat(filePath);

        console.log("STAT: ", stat);

        if (stat.size < 25000000) {
          console.log("Size OK");

          try {
            const transcription = await openai.audio.transcriptions.create({
              file: fs.createReadStream(filePath),
              model: "whisper-1",
              response_format: "text",
            });
          } catch (err) {
            console.error("Error transcribing the audio:", err);
            return;
          }

          console.log("Transcription Done");

          if (transcription) {
            const completion = await openai.chat.completions.create({
              model: "gpt-3.5-turbo",
              messages: [
                {
                  role: "system",
                  content: `You are going to generate a title and a description based on the transcription provided: transcription(${transcription}) and return it in JSON format as {"title": <title>, "summary": <summary>}`,
                },
              ],
            });

            await axios.post(
              `${process.env.NEXT_API_HOST}recording/${data.userId}/transcribe`,
              {
                filename: data.filename,
                content: completion.choices[0].message.content,
                transcript: transcription,
              }
            );
          }
        }
      }

      const completeResponse = await axios.post(
        `${process.env.NEXT_API_HOST}recording/${data.userId}/complete`,
        {
          filename: data.filename,
        }
      );

      if (completeResponse.data.status === 200) {
        await fsp.unlink(filePath);
        console.log(`${data.filename} deleted successfully`);
      } else {
        console.error("Error stopping the process.");
      }
    } catch (err) {
      console.error("Error processing video:", err);
    }
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected", socket.id);
  });
});

server.listen(5001, () => {
  console.log("Listening on port 5001");
});
