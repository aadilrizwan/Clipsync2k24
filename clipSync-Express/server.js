// const cors = require('cors')
// const http = require('http')
// const express = require('express')
// const { Server } = require('socket.io')
// const fs = require('fs');
// const { Readable } = require('stream');
// const axios = require('axios');
// const {S3Client , PutObjectCommand} = require('@aws-sdk/client-s3')
// const OpenAI = require('openai');
// const dotenv = require('dotenv');
// dotenv.config()

// const openai = new OpenAI({
//     apiKey : process.env.OPEN_AI_KEY,
// })

// const s3 = new S3Client({
//     credentials: {
//         accessKeyId: process.env.ACCESS_KEY,
//         secretAccessKey: process.env.SECRET_KEY,
//     },
//     region: process.env.BUCKET_REGION,
// })

// const app = express();
// const server = http.createServer(app);
// app.use(cors())

// const io = new Server(server, {
//     cors:{
//         origin:process.env.ELECTRON_HOST,
//         methods:['GET', 'POST'],
//     },
// });

// const recordedChunks = [];
// io.on('connection', (socket)=>{
//     console.log('Socket is Connected');

//     socket.on('video-chunks',async (data)=>{
//     console.log('Video Chunk is sent');

//     const writestream = fs.createWriteStream('temp_upload/' + data.filename)
//     recordedChunks.push(data.chunks)
//     const videoBlob = new Blob(recordedChunks ,{
//         type: 'video/webm; codecs=vp9',
//     })
//     const buffer = Buffer.from(await videoBlob.arrayBuffer())
//     const readStream = Readable.from(buffer)
//     readStream.pipe(writestream).on('finish',()=>{
//     console.log('Chunk Saved')
//     })
//     });

//     socket.on('process-video',async (data)=>{
//         console.log('Processing video...');

//         recordedChunks=[];
//         fs.readFile('temp_upload/' + data.filename, async(err,file)=>{
//             const processing = await axios.post(
//                 `${process.env.NEXT_API_HOST}recording/${data.userId}/processing`
//             )
//             if(processing.data.status !== 200)
//                     return console.log("Error: Something went wrong with creating the processing file");

//             const Key = data.filename
//             const Bucket  = process.env.BUCKET_NAME
//             const ContentType = 'video/webm'
//             const command  = new PutObjectCommand({
//                 Key,
//                 Bucket,
//                 ContentType,
//                 Body:file,
//             })

//             const fileStatus = await s3.send(command)

//             if(fileStatus['$metadata'].httpStatusCode === 200)
//             {
//                 console.log("Video has been uploaded successfully to AWS");

//                 if(processing.data.plan === "PRO")
//                 {
//                     fs.stat('temp_upload/' + data.filename , async (err,stat)=>{
//                         if(!err)
//                         {
//                             //whisperAi 25 md

//                             if(stat.size < 25000000)
//                             {
//                                 const transcription  = await openai.audio.transcriptions.create({
//                                     file: fs.createReadStream(`temp_upload/${data.filename}`),
//                                     model:"whisper-1",
//                                     response_format: 'text',
//                                 })

//                                 if(transcription)
//                                 {
//                                     const completion = await openai.chat.completions.create({
//                                         model:'gpt-3.5-turbo',
//                                         response_format: {type:'json_object'},
//                                         messages:[
//                                             {
//                                                 role: 'system',
//                                                 content: `You are going to generate a title and a nice description using the speech to text transcription provided: transcription(${transcription}) and then return it in json format as {"title": <the title you gave>,"summary": <the summary you created>}`,
//                                             },
//                                         ],
//                                     })

//                                     const titleAndSummeryGenerated = await axios.post(`${process.env.NEXT_API_HOST}recording/${data.userId}/transcribe`,
//                                         {
//                                             filename : data.filename,
//                                             content: completion.choices[0].message.content,
//                                             transcript : transcription,
//                                         }
//                                     )

//                                     if(titleAndSummeryGenerated.data.status!==200){
//                                         console.log("Something went wrong when cerating the title and description")
//                                     }
//                                 }
//                             }

//                         }
//                     })
//                 }

//                 const stopProcessing  = await axios.post(
//                     `${process.env.NEXT_API_HOST}recording/${data.userId}/complete`,
//                     {
//                         filename : data.filename,
//                     }
//                 )
//                 if(stopProcessing.data.status!==200){
//                     console.log("Something went wrong while stopping the process and trying to complete the processing stage.")
//                 }

//                 if(stopProcessing.data.status === 200)
//                 {
//                     fs.unlink('temp_upload/' + data.filename, (err)=>{
//                         if(!err)
//                             console.log(data.filename + " " + "deleted successfully")

//                     })
//                 }
//             }else{
//                 console.log("Error Upload Failed! process aborted")
//             }
//         })

//         });

//     socket.on('disconnect',async (data)=>{
//         console.log('Socket.id is disconnected', socket.id);
//         });
// })
// server.listen(5001,()=>{
//     console.log("Listening on port 5001");
// });

// Required Modules
// const cors = require("cors");
// const http = require("http");
// const express = require("express");
// const { Server } = require("socket.io");
// const fs = require("fs");
// const { Readable } = require("stream");
// const axios = require("axios");
// const cloudinary = require("cloudinary").v2;
// const dotenv = require("dotenv");

// // Load environment variables
// dotenv.config();

// // Cloudinary Configuration
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // Create Express app and HTTP server
// const app = express();
// const server = http.createServer(app);
// app.use(cors());

// // Create WebSocket server
// const io = new Server(server, {
//   cors: {
//     origin: process.env.ELECTRON_HOST,
//     methods: ["GET", "POST"],
//   },
// });

// // This array will hold the chunks received
// let recordedChunks = [];

// // WebSocket connection event
// io.on("connection", (socket) => {
//   console.log("Socket is Connected");

//   // Event: Receiving video chunks
//   socket.on("video-chunks", async (data) => {
//     console.log("Video Chunk is sent");

//     const filePath = `temp_upload/${data.filename}`;
//     const writestream = fs.createWriteStream(filePath, { flags: "a" }); // Append to existing file
//     recordedChunks.push(data.chunks); // Store chunks temporarily

//     // Combine chunks into a single buffer
//     const buffer = Buffer.concat(recordedChunks);
//     const readStream = Readable.from(buffer); // Convert buffer to readable stream

//     // Save chunks to temp file
//     readStream.pipe(writestream).on("finish", () => {
//       console.log("Chunk Saved");
//     });
//   });

//   // Event: Processing the video (uploading to Cloudinary)
//   socket.on("process-video", async (data) => {
//     console.log("Processing video...");

//     const filePath = `temp_upload/${data.filename}`;
//     recordedChunks = []; // Clear recorded chunks after processing

//     // Read file from temp directory
//     fs.readFile(filePath, async (err, file) => {
//       if (err) return console.error("Error reading file:", err);

//       const processing = await axios.post(
//         `${process.env.NEXT_API_HOST}recording/${data.userId}/processing`,
//         { filename: data.filename }
//       );

//       if (processing.data.status !== 200) {
//         return console.error(
//           "Error: Something went wrong with creating the processing file"
//         );
//       }

//       // Upload the video file to Cloudinary
//       cloudinary.uploader.upload(
//         filePath,
//         {
//           resource_type: "video",
//           public_id: `uploads/${data.filename}`,
//         },
//         async (error, result) => {
//           if (error) {
//             console.log("Upload to Cloudinary failed:", error);
//           } else {
//             console.log(
//               "Video has been uploaded successfully to Cloudinary:",
//               result.secure_url
//             );

//             // Process further based on the plan (if user has "PRO" plan)
//             if (processing.data.plan === "PRO") {
//               fs.stat(filePath, async (err, stat) => {
//                 if (!err && stat.size < 25000000) {
//                   // File smaller than 25MB
//                   const transcription = await cloudinary.uploader.transcribe(
//                     filePath,
//                     {
//                       model: "whisper-1", // Assuming you want to use Whisper for transcription
//                     }
//                   );

//                   if (transcription) {
//                     const completion = await openai.chat.completions.create({
//                       model: "gpt-3.5-turbo",
//                       messages: [
//                         {
//                           role: "system",
//                           content: `You are going to generate a title and a nice description using the speech to text transcription provided: transcription(${transcription}) and return it in JSON format as {"title": <the title you gave>, "summary": <the summary you created>}`,
//                         },
//                       ],
//                     });

//                     // Post title and summary back to your API
//                     const titleAndSummaryGenerated = await axios.post(
//                       `${process.env.NEXT_API_HOST}recording/${data.userId}/transcribe`,
//                       {
//                         filename: data.filename,
//                         content: completion.choices[0].message.content,
//                         transcript: transcription,
//                       }
//                     );

//                     if (titleAndSummaryGenerated.data.status !== 200) {
//                       console.log(
//                         "Something went wrong while creating the title and description"
//                       );
//                     }
//                   }
//                 }
//               });
//             }

//             // Mark processing as complete
//             const stopProcessing = await axios.post(
//               `${process.env.NEXT_API_HOST}recording/${data.userId}/complete`,
//               {
//                 filename: data.filename,
//               }
//             );

//             if (stopProcessing.data.status !== 200) {
//               console.log("Something went wrong while stopping the process.");
//             }

//             // Delete the temporary file
//             if (stopProcessing.data.status === 200) {
//               fs.unlink(filePath, (err) => {
//                 if (!err) console.log(`${data.filename} deleted successfully`);
//               });
//             }
//           }
//         }
//       );
//     });
//   });

//   // Event: WebSocket disconnect
//   socket.on("disconnect", () => {
//     console.log("Socket disconnected", socket.id);
//   });
// });

// // Start the server
// server.listen(5001, () => {
//   console.log("Listening on port 5001");
// });


















//main code 
/** 
const cors = require("cors");
const http = require("http");
const express = require("express");
const { Server } = require("socket.io");
const fs = require("fs").promises;
const { createWriteStream } = require("fs");
const { Readable } = require("stream");
const axios = require("axios");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
const OpenAI = require('openai');

// Load environment variables
dotenv.config();

const openai = new OpenAI({
  apiKey : process.env.OPEN_AI_KEY,
})

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Create Express app and HTTP server
const app = express();
const server = http.createServer(app);
app.use(cors());

// Create WebSocket server
const io = new Server(server, {
  cors: {
    origin: process.env.ELECTRON_HOST,
    methods: ["GET", "POST"],
  },
});

// WebSocket connection event
io.on("connection", (socket) => {
  console.log("Socket is Connected");

  // Event: Receiving video chunks
  socket.on("video-chunks", (data) => {
    console.log("Video Chunk is sent");

    const filePath = `temp_upload/${data.filename}`;
    const writestream = createWriteStream(filePath, { flags: "a" });

    // Convert chunks to a readable stream and save to file
    const buffer = Buffer.from(data.chunks);
    const readStream = Readable.from(buffer);
    readStream.pipe(writestream).on("finish", () => {
      console.log("Chunk saved");
    }).on("error", (err) => {
      console.error("Error saving chunk:", err);
    });
  });

  // Event: Processing the video (uploading to Cloudinary)
  socket.on("process-video", async (data) => {
    console.log("Processing video...");

    const filePath = `temp_upload/${data.filename}`;

    try {
      // Read file from temp directory
      const file = await fs.readFile(filePath);

      const processingResponse = await axios.post(
        `${process.env.NEXT_API_HOST}recording/${data.userId}/processing`,
        { filename: data.filename }
      );

      if (processingResponse.data.status !== 200) {
        return console.error("Error creating the processing file");
      }

      // Upload the video file to Cloudinary
      const uploadResult = await cloudinary.uploader.upload(filePath, {
        resource_type: "video",
        public_id: `uploads/${data.filename}`,
      });

      console.log("Video uploaded to Cloudinary:", uploadResult.secure_url);

      // Check for "PRO" plan and process transcription
      if (processingResponse.data.plan === "PRO") {
        const stat = await fs.stat(filePath);
        if (stat.size < 25000000) {
          const transcription = await openai.audio.transcriptions.create({
            file: fs.createReadStream(filePath),
            model: "whisper-1",
            response_format: "text",
          });

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

      // Mark processing as complete
      const completeResponse = await axios.post(
        `${process.env.NEXT_API_HOST}recording/${data.userId}/complete`,
        {
          filename: data.filename,
        }
      );

      if (completeResponse.data.status === 200) {
        await fs.unlink(filePath);
        console.log(`${data.filename} deleted successfully`);
      } else {
        console.error("Error stopping the process.");
      }
    } catch (err) {
      console.error("Error processing video:", err);
    }
  });

  // Event: WebSocket disconnect
  socket.on("disconnect", () => {
    console.log("Socket disconnected", socket.id);
  });
});

// Start the server
server.listen(5001, () => {
  console.log("Listening on port 5001");
});
**/








const fs = require("fs");
const fsp = fs.promises; // For using async/await methods from `fs.promises`
const cors = require("cors");
const http = require("http");
const express = require("express");
const { Server } = require("socket.io");
const { Readable } = require("stream");
const axios = require("axios");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
const OpenAI = require('openai');

// Load environment variables
dotenv.config();

const openai = new OpenAI({
  apiKey : process.env.OPEN_AI_KEY,
})

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Create Express app and HTTP server
const app = express();
const server = http.createServer(app);
app.use(cors());

// Create WebSocket server
const io = new Server(server, {
  cors: {
    origin: process.env.ELECTRON_HOST,
    methods: ["GET", "POST"],
  },
});

// WebSocket connection event
io.on("connection", (socket) => {
  console.log("Socket is Connected");

  // Event: Receiving video chunks
  socket.on("video-chunks", (data) => {
    console.log("Video Chunk is sent");

    const filePath = `temp_upload/${data.filename}`;
    const writestream = fs.createWriteStream(filePath, { flags: "a" });

    // Convert chunks to a readable stream and save to file
    const buffer = Buffer.from(data.chunks);
    const readStream = Readable.from(buffer);
    readStream.pipe(writestream).on("finish", () => {
      console.log("Chunk saved");
    }).on("error", (err) => {
      console.error("Error saving chunk:", err);
    });
  });

  // Event: Processing the video (uploading to Cloudinary)
  socket.on("process-video", async (data) => {
    console.log("Processing video...");

    const filePath = `temp_upload/${data.filename}`;

    try {
      // Read file from temp directory
      const file = await fsp.readFile(filePath);

      const processingResponse = await axios.post(
        `${process.env.NEXT_API_HOST}recording/${data.userId}/processing`,
        { filename: data.filename }
      );

      if (processingResponse.data.status !== 200) {
        return console.error("Error creating the processing file");
      }

      // Upload the video file to Cloudinary
      const uploadResult = await cloudinary.uploader.upload(filePath, {
        resource_type: "video",
        public_id: `uploads/${data.filename}`,
      });

      console.log("Video uploaded to Cloudinary:", uploadResult.secure_url);

      // Check for "PRO" plan and process transcription
      if (processingResponse.data.plan === "PRO") {
        const stat = await fsp.stat(filePath);
        if (stat.size < 25000000) {
          const transcription = await openai.audio.transcriptions.create({
            file: fs.createReadStream(filePath), // Use `fs.createReadStream`
            model: "whisper-1",
            response_format: "text",
          });
          
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

      // Mark processing as complete
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

  // Event: WebSocket disconnect
  socket.on("disconnect", () => {
    console.log("Socket disconnected", socket.id);
  });
});

// Start the server
server.listen(5001, () => {
  console.log("Listening on port 5001");
});
