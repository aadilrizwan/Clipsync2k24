<p align="center">
  <img src="public/logo.png" alt="ClipSync Logo" width="80" />
</p>

<h1 align="center">ClipSync</h1>

<p align="center">
  <strong>Asynchronous video messaging platform for modern teams</strong>
</p>

<p align="center">
  Record your screen, webcam, or both — share instantly — let AI handle the rest.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-18-61DAFB?logo=react" alt="React" />
  <img src="https://img.shields.io/badge/Electron-41-47848F?logo=electron" alt="Electron" />
  <img src="https://img.shields.io/badge/Prisma-5-2D3748?logo=prisma" alt="Prisma" />
  <img src="https://img.shields.io/badge/Stripe-Payments-635BFF?logo=stripe" alt="Stripe" />
  <img src="https://img.shields.io/badge/Gemini_AI-Transcripts-4285F4?logo=google" alt="Gemini AI" />
  <img src="https://img.shields.io/badge/License-Proprietary-red" alt="License" />
</p>

---

## Overview

**ClipSync** is a full-stack video messaging platform designed for asynchronous communication. It replaces lengthy meetings and walls of text with quick, contextual video messages that keep teams aligned — no matter the timezone.

The project is structured as a **monorepo** containing three interconnected services:

| Service | Directory | Stack | Purpose |
|---|---|---|---|
| **Web App** | `/` (root) | Next.js 16, React 18, TailwindCSS | Dashboard, landing page, auth, video playback, billing |
| **Media Server** | `/clipSync-Express` | Express.js, Socket.IO, Cloudinary | Real-time video chunk upload, cloud processing, AI transcription |
| **Desktop Recorder** | `/desktopclip` | Electron 41, Vite, React | Native screen/webcam capture with floating overlay UI |

---

## Key Features

- **HD Screen & Webcam Capture** — Record screen, camera, or both simultaneously via the Electron desktop app with a frameless, always-on-top overlay UI.
- **Real-Time Chunk Upload** — Video data streams to the Express server over Socket.IO as chunks, then uploads to **Cloudinary** for cloud storage.
- **Gemini AI Transcription** — PRO plan videos under 25 MB are automatically transcribed using **Gemini 1.5 Flash**, generating titles, summaries, and full transcripts.
- **Team Workspaces** — Organize videos in workspaces and folders; invite members with role-based access (Admin / Member).
- **Threaded Comments** — Nested comment replies on videos with real-time notifications.
- **Shareable Video Links** — Copy direct links or rich embed snippets for sharing via Slack, email, or any platform.
- **Stripe Subscription Billing** — FREE and PRO plans with Stripe Checkout integration for monthly/annual subscriptions.
- **Clerk Authentication** — Secure sign-up/sign-in with email, Google, and social providers via Clerk.
- **Dark Mode by Default** — Polished dark theme with Plus Jakarta Sans typography and Radix UI primitives.
- **Voiceflow AI Chatbot** — Integrated conversational AI assistant on the landing page.
- **Email Invitations** — Workspace invites sent via Nodemailer with accept-link workflows.
- **Video View Tracking** — Automatic view count tracking for analytics.
- **Trash & Soft Delete** — Videos, folders, and workspaces support soft-delete with recovery.

---

## Tech Stack

### Web Application (Next.js)

| Category | Technologies |
|---|---|
| **Framework** | Next.js 16 (App Router), React 18, TypeScript |
| **Styling** | TailwindCSS 3.4, Radix UI, Framer Motion, Lucide Icons, Tabler Icons |
| **State Management** | Redux Toolkit, React Redux, TanStack React Query |
| **Authentication** | Clerk (`@clerk/nextjs`) |
| **Database** | PostgreSQL via Prisma ORM 5 |
| **Payments** | Stripe (subscriptions + checkout) |
| **Email** | Nodemailer, EmailJS |
| **Forms** | React Hook Form, Zod validation |
| **UI Components** | shadcn/ui (Radix-based), Recharts, Sonner toasts |
| **Fonts** | Plus Jakarta Sans (Google Fonts) |

### Media Server (Express)

| Category | Technologies |
|---|---|
| **Runtime** | Node.js, Express 4 |
| **Real-Time** | Socket.IO 4 |
| **Cloud Storage** | Cloudinary (video upload) |
| **AI** | Google Gemini 1.5 Flash API (transcription) |
| **HTTP Client** | Axios |

### Desktop Recorder (Electron)

| Category | Technologies |
|---|---|
| **Framework** | Electron 41, Vite 6 |
| **UI** | React 18, TailwindCSS, Radix UI, Clerk React |
| **Communication** | Socket.IO Client |
| **Build** | electron-builder, vite-plugin-electron |
| **Capture** | Electron `desktopCapturer` API |

---

## Project Structure

```
Clipsync2k24/
├── prisma/
│   └── schema.prisma           # Database schema (User, Video, Workspace, etc.)
├── public/                     # Static assets (screenshots, logo, images)
├── src/
│   ├── actions/                # Server actions (user.ts, workspace.ts)
│   ├── app/
│   │   ├── (website)/          # Landing page (Hero, Features, HowItWorks, etc.)
│   │   ├── api/
│   │   │   ├── auth/           # Clerk auth webhooks
│   │   │   ├── payment/        # Stripe checkout session
│   │   │   ├── recording/[id]/ # Processing, transcribe, complete endpoints
│   │   │   └── studio/         # Studio config API
│   │   ├── auth/               # Sign-in / Sign-up pages
│   │   ├── contact/            # Contact page
│   │   ├── dashboard/
│   │   │   └── [workspaceId]/  # Workspace dashboard
│   │   │       ├── billing/    # Subscription management
│   │   │       ├── folder/     # Folder view
│   │   │       ├── home/       # Dashboard home
│   │   │       ├── notifications/
│   │   │       ├── settings/   # User settings
│   │   │       ├── starred/    # Starred videos
│   │   │       ├── storage/    # Storage management
│   │   │       ├── trash/      # Deleted items
│   │   │       └── video/      # Video player + details
│   │   ├── docs/               # Documentation page
│   │   ├── invite/             # Invitation accept flow
│   │   ├── payment/            # Payment success/cancel
│   │   ├── preview/            # Public video preview
│   │   └── pricing/            # Pricing page
│   ├── components/
│   │   ├── forms/              # Form components
│   │   ├── global/             # Shared components (sidebar, search, modals, etc.)
│   │   ├── icons/              # Custom icon components
│   │   ├── theme/              # Theme provider (dark/light)
│   │   └── ui/                 # shadcn/ui primitives
│   ├── constants/              # App-wide constants
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Utilities (Prisma client, helpers)
│   ├── react-query/            # React Query provider & config
│   ├── redux/                  # Redux store, slices, provider
│   ├── types/                  # TypeScript type definitions
│   └── middleware.ts           # Clerk auth + CORS middleware
│
├── clipSync-Express/           # ── Media Processing Server ──
│   ├── server.js               # Express + Socket.IO + Cloudinary + Gemini
│   └── package.json
│
└── desktopclip/                # ── Desktop Recorder (Electron) ──
    ├── electron/
    │   ├── main.ts             # Main process (windows, IPC, desktopCapturer)
    │   └── preload.ts          # Context bridge
    ├── src/
    │   ├── App.tsx             # Main renderer app
    │   ├── studio_app.tsx      # Recording studio overlay
    │   ├── web_cam_app.tsx     # Floating webcam overlay
    │   ├── components/         # Desktop UI components
    │   ├── hooks/              # Desktop-specific hooks
    │   ├── layouts/            # Layout wrappers
    │   ├── lib/                # Desktop utilities
    │   └── schemas/            # Zod schemas
    ├── index.html              # Main window entry
    ├── studio.html             # Studio overlay entry
    ├── webcam.html             # Webcam overlay entry
    └── package.json
```

---

## Database Schema

The PostgreSQL database (managed via Prisma) includes the following models:

| Model | Description |
|---|---|
| `User` | User profile linked to Clerk, owns workspaces, videos, and subscriptions |
| `WorkSpace` | PERSONAL or PUBLIC workspace containers for organizing content |
| `Folder` | Sub-organization within workspaces with soft-delete support |
| `Video` | Recorded video with source URL, view count, processing state, and AI summary |
| `Comment` | Threaded comment system with self-referencing replies |
| `Member` | Workspace membership linking users to workspaces |
| `Subscription` | FREE or PRO plan tied to Stripe customer ID |
| `Media` | User studio preferences (screen, mic, camera, preset: HD/SD) |
| `Notification` | User notifications for workspace activity |
| `Invite` | Workspace invitation with sender/receiver relationships and accept state |

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** (or yarn / pnpm)
- **PostgreSQL** database
- Accounts & API keys for: **Clerk**, **Stripe**, **Cloudinary**, **Google Gemini**, **Voiceflow** (optional)

### 1. Clone the Repository

```bash
git clone https://github.com/InFiNiTy0639/Clipsync2k24.git
cd Clipsync2k24
```

### 2. Install Dependencies

```bash
# Web app (root)
npm install

# Media server
cd clipSync-Express
npm install
cd ..

# Desktop app
cd desktopclip
npm install
cd ..
```

### 3. Configure Environment Variables

Create a `.env` file in the **root** directory:

```env
# ── Database ──
DATABASE_URL=postgresql://user:password@localhost:5432/clipsync

# ── Clerk Authentication ──
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/auth/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/auth/sign-up

# ── Stripe Payments ──
STRIPE_CLIENT_SECRET=sk_...
STRIPE_SUBSCRIPTION_PRICE_ID=price_...

# ── Cloudinary ──
NEXT_PUBLIC_CLOUD_FRONT_STREAM_URL=https://...

# ── Email (Nodemailer) ──
MAILER_EMAIL=your-email@gmail.com
MAILER_PASSWORD=your-app-password

# ── Voiceflow (optional) ──
VOICEFLOW_API_KEY=VF.DM...
VOICEFLOW_KNOWLEDGE_BASE_API=https://...

# ── Host ──
NEXT_PUBLIC_HOST_URL=http://localhost:3000
```

Create a `.env` file in **`clipSync-Express/`**:

```env
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
ELECTRON_HOST=http://localhost:5173
NEXT_API_HOST=http://localhost:3000/api/
GEMINI_API=your-gemini-api-key
```

Create a `.env` file in **`desktopclip/`**:

```env
VITE_HOST_URL=http://localhost:5001
VITE_APP_URL=http://localhost:5173
VITE_CLERK_PUBLISHABLE_KEY=pk_...
```

### 4. Set Up the Database

```bash
npx prisma generate
npx prisma db push
```

### 5. Run All Services

Open three terminal windows:

```bash
# Terminal 1 — Web App (port 3000)
npm run dev

# Terminal 2 — Media Server (port 5001)
cd clipSync-Express
npm run dev

# Terminal 3 — Desktop App (port 5173)
cd desktopclip
npm run dev
```

| Service | URL |
|---|---|
| Web App | [http://localhost:3000](http://localhost:3000) |
| Media Server | `ws://localhost:5001` (Socket.IO) |
| Desktop App | [http://localhost:5173](http://localhost:5173) (Electron dev) |

---

## How It Works

```
┌─────────────────┐     Socket.IO      ┌──────────────────┐     Cloudinary     ┌───────────────┐
│  Desktop App    │ ─── video-chunks ──▶│  Express Server  │ ─── upload ───────▶│  Cloud Storage│
│  (Electron)     │     process-video   │  (port 5001)     │                    └───────────────┘
└─────────────────┘                     │                  │
                                        │  Gemini 1.5 API  │     REST API       ┌───────────────┐
                                        │  (transcription)  │ ── POST /api/ ───▶│  Next.js App  │
                                        └──────────────────┘                    │  (port 3000)  │
                                                                                │               │
                                        ┌──────────────────┐     Prisma ORM     │  PostgreSQL   │
                                        │  Clerk Auth      │◀── middleware ─────│  Database     │
                                        └──────────────────┘                    └───────────────┘
```

1. **Record** — The Electron desktop app captures screen/webcam via `desktopCapturer` and streams WebM chunks over Socket.IO.
2. **Upload** — The Express server receives chunks, assembles the file, and uploads to Cloudinary.
3. **Transcribe** — For PRO users, the video is sent to Google Gemini 1.5 Flash for automatic transcription, title, and summary generation.
4. **Store** — Video metadata (source URL, title, summary, transcript) is saved to PostgreSQL via the Next.js API routes.
5. **Share** — Users get instant shareable links, rich embeds, and view tracking on the Next.js dashboard.

---

## Plans & Pricing

| Feature | Free | PRO |
|---|:---:|:---:|
| Screen + Webcam Recording | ✅ | ✅ |
| Cloud Video Storage | ✅ | ✅ |
| Shareable Links | ✅ | ✅ |
| Workspaces & Folders | ✅ | ✅ |
| Team Members | Limited | Unlimited |
| AI Transcription (Gemini) | ❌ | ✅ |
| Auto-Generated Titles & Summaries | ❌ | ✅ |
| HD/SD Preset Selection | SD only | HD + SD |
| Priority Support | ❌ | ✅ |

---

## Scripts Reference

### Web App (root)

| Command | Description |
|---|---|
| `npm run dev` | Start Next.js dev server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npx prisma studio` | Open Prisma Studio (DB GUI) |
| `npx prisma generate` | Regenerate Prisma Client |
| `npx prisma db push` | Push schema to database |

### Media Server (`clipSync-Express/`)

| Command | Description |
|---|---|
| `npm run dev` | Start with Nodemon (auto-reload) |
| `npm start` | Start production server |

### Desktop App (`desktopclip/`)

| Command | Description |
|---|---|
| `npm run dev` | Start Vite + Electron dev mode |
| `npm run build` | Build production Electron app |
| `npm run preview` | Preview Vite build |

---

## Author

**MA RIZWAN** ([@InFiNiTy0639](https://github.com/InFiNiTy0639))

---

## License

**Proprietary — All Rights Reserved**

Copyright © 2026 MA RIZWAN (InFiNiTy0639)

This software and all associated files are the exclusive intellectual property of the owner.
Unauthorized use, copying, modification, distribution, or reverse engineering is **strictly prohibited**.
See [`LICENCE`](LICENCE) for full details.
