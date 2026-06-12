const fs = require("fs");
const fsp = fs.promises;
const path = require("path");
const cors = require("cors");
const http = require("http");
const express = require("express");
const { Server } = require("socket.io");
const { Readable } = require("stream");
const axios = require("axios");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");

dotenv.config();

const uploadDir = path.join(__dirname, "temp_upload");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

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

  socket.on("video-chunks", async (data) => {
    console.log("Video Chunk is sent");

    const filePath = path.join(uploadDir, data.filename);
    const buffer = Buffer.from(data.chunks);
    try {
      await fsp.appendFile(filePath, buffer);
      console.log("Chunk saved");
    } catch (err) {
      console.error("Error saving chunk:", err);
    }
  });

  socket.on("process-video", async (data) => {
    console.log("Processing video...");

    const filePath = path.join(uploadDir, data.filename);

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
        const stat = await fsp.stat(filePath);

        console.log("STAT: ", stat);

        if (stat.size < 25000000) {
          console.log("Size OK, calling Gemini API...");
          try {
            const base64Data = file.toString("base64");
            const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API}`;
            
            const requestBody = {
              contents: [
                {
                  parts: [
                    {
                      inlineData: {
                        mimeType: "video/webm",
                        data: base64Data
                      }
                    },
                    {
                      text: "Analyze this video. Transcribe the audio content precisely, and generate a brief title and summary based on the transcript."
                    }
                  ]
                }
              ],
              generationConfig: {
                responseMimeType: "application/json",
                responseSchema: {
                  type: "OBJECT",
                  properties: {
                    transcript: { type: "STRING" },
                    title: { type: "STRING" },
                    summary: { type: "STRING" }
                  },
                  required: ["transcript", "title", "summary"]
                }
              }
            };

            const geminiResponse = await axios.post(geminiUrl, requestBody, {
              headers: { "Content-Type": "application/json" }
            });

            console.log("Gemini API Call Succeeded");

            if (
              geminiResponse.data &&
              geminiResponse.data.candidates &&
              geminiResponse.data.candidates[0] &&
              geminiResponse.data.candidates[0].content &&
              geminiResponse.data.candidates[0].content.parts &&
              geminiResponse.data.candidates[0].content.parts[0]
            ) {
              const textContent = geminiResponse.data.candidates[0].content.parts[0].text;
              const result = JSON.parse(textContent);
              
              console.log("Parsed Gemini Output:", result);

              try {
                await axios.post(
                  `${process.env.NEXT_API_HOST}recording/${data.userId}/transcribe`,
                  {
                    videoUrl: uploadResult.secure_url,
                    filename: data.filename,
                    content: JSON.stringify({
                      title: result.title || "Untitled Video",
                      summary: result.summary || "No summary available."
                    }),
                    transcript: result.transcript || "",
                  }
                );
                console.log("Transcribe route updated successfully");
              } catch (error) {
                console.error("Error in transcribe request:", error.response?.data || error.message);
              }
            }
          } catch (err) {
            console.error("Error transcribing the audio with Gemini:", err.response?.data || err.message || err);
          }
        }
      }

      console.log("Before completeResponse");

      const completeResponse = await axios.post(
        `${process.env.NEXT_API_HOST}recording/${data.userId}/complete`,
        {
          videoUrl: uploadResult.secure_url,
          filename: data.filename,
        }
      );

      console.log("After CompleteResponse");

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

  console.log("Work Properly");

  socket.on("disconnect", () => {
    console.log("Socket disconnected", socket.id);
  });
});

server.listen(5001, () => {
  console.log("Listening on port 5001");
});
