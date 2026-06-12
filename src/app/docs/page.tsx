"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, ChevronRight, Settings, Users, Share2, Download, Monitor, ShieldAlert } from "lucide-react";

const sections = [
  {
    id: "getting-started",
    title: "Getting Started",
    icon: BookOpen,
    content: [
      { step: "Step 1", text: "To get started with ClipSync, visit the landing page and sign up using your email or Google account." },
      { step: "Step 2", text: "Once registered, log in to access your custom workspace dashboard and start recording." },
    ],
  },
  {
    id: "workspaces",
    title: "Creating Workspaces",
    icon: Settings,
    content: [
      { step: "Step 1", text: "Go to the Workspace section in the left sidebar and click 'Workspaces'." },
      { step: "Step 2", text: "Click 'Create Workspace', enter a name and optional description, and configure visibility permissions." },
      { step: "Step 3", text: "Add folders to structure and categorize your recording folders within workspaces." },
    ],
  },
  {
    id: "team-members",
    title: "Adding Team Members",
    icon: Users,
    content: [
      { step: "Step 1", text: "Select 'Invite Members' inside your workspace settings and enter their email address." },
      { step: "Step 2", text: "Track pending invitations in the Team Members tab on your workspace dashboard." },
      { step: "Step 3", text: "Manage roles, set permission scopes, or revoke workspace access for members." },
    ],
  },
  {
    id: "sharing",
    title: "Sharing Video Links",
    icon: Share2,
    content: [
      { step: "Step 1", text: "Click the share icon on any processed video to generate a secure sharing link." },
      { step: "Step 2", text: "Choose between 'View-Only' or 'Comment/Edit' permission levels for the link recipient." },
      { step: "Step 3", text: "Copy the link to your clipboard or check 'Notify Team Members' to distribute it." },
    ],
  },
  {
    id: "desktop-plugin",
    title: "Desktop Plugin",
    icon: Download,
    content: [
      { step: "Step 1", text: "Download the ClipSync Desktop Plugin from the settings page for Windows, Mac, or Linux." },
      { step: "Step 2", text: "Launch the installer and follow the instructions to set up the plugin on your computer." },
      { step: "Step 3", text: "Log in using your account credentials to access native screen and webcam recording controls." },
    ],
  },
  {
    id: "resolution",
    title: "Selecting Resolution",
    icon: Monitor,
    content: [
      { step: "Step 1", text: "Adjust the target recording resolution in the plugin toolbar options before recording." },
      { step: "Step 2", text: "Select from 480p, 720p, 1080p, or high-definition 4K based on your subscription tier." },
    ],
  },
  {
    id: "pricing-plans",
    title: "Plans and Pricing",
    icon: ShieldAlert,
    content: [
      { step: "Free Plan", text: "Features limited recording time (5 min), basic link sharing, and up to 5 team members per workspace." },
      { step: "Paid Plans", text: "Unlock extended recording times (up to 10 hours), advanced sharing, and unlimited workspaces with AI summaries." },
    ],
  }
];

const Docs = () => {
  const [activeTab, setActiveTab] = useState("getting-started");

  const activeSection = sections.find((s) => s.id === activeTab) || sections[0];

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans relative overflow-hidden bg-grid-white/[0.02]">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-500/5 blur-[140px] rounded-full pointer-events-none" />

      {/* Header Container */}
      <header className="max-w-6xl mx-auto pt-16 pb-8 px-6 flex flex-col md:flex-row md:items-center justify-between border-b border-neutral-900 gap-4">
        <div className="flex items-center gap-x-4">
          <Link
            href="/"
            className="p-2.5 rounded-full border border-neutral-800 bg-neutral-900/40 hover:bg-neutral-800 transition text-neutral-400 hover:text-white"
            title="Back to Home"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400">
              ClipSync Docs
            </h1>
            <p className="text-sm text-neutral-400 mt-1">
              Your guide to screen recording, workspaces, and team broadcasting.
            </p>
          </div>
        </div>
      </header>

      {/* Two-Column Sidebar Layout */}
      <main className="max-w-6xl mx-auto py-12 px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Sidebar Links */}
        <aside className="lg:col-span-4 bg-neutral-900/40 backdrop-blur-sm border border-neutral-900 rounded-3xl p-4 space-y-1">
          <p className="text-xs font-semibold text-neutral-500 px-4 py-2 uppercase tracking-wider">
            Guides & references
          </p>
          {sections.map((section) => {
            const Icon = section.icon;
            const isActive = activeTab === section.id;
            return (
              <button
                key={section.id}
                onClick={() => setActiveTab(section.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-left text-sm font-medium transition ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/10"
                    : "text-neutral-400 hover:bg-neutral-900 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-x-3">
                  <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-neutral-500"}`} />
                  <span>{section.title}</span>
                </div>
                <ChevronRight className={`w-4 h-4 transition ${isActive ? "opacity-100" : "opacity-0"}`} />
              </button>
            );
          })}
        </aside>

        {/* Right Content Panel */}
        <section className="lg:col-span-8 space-y-6">
          <div className="bg-neutral-900/60 backdrop-blur-sm border border-neutral-900 rounded-3xl p-8 lg:p-10 shadow-lg min-h-[400px] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-x-3 mb-6">
                <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-400">
                  <activeSection.icon className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-white">
                  {activeSection.title}
                </h2>
              </div>
              <hr className="border-neutral-900 mb-6" />

              <div className="space-y-6">
                {activeSection.content.map((item, index) => (
                  <div key={index} className="flex gap-x-4 items-start bg-neutral-950/40 p-5 rounded-2xl border border-neutral-900">
                    <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider bg-indigo-500/10 px-3 py-1 rounded-full shrink-0">
                      {item.step}
                    </span>
                    <p className="text-neutral-300 text-sm md:text-base leading-relaxed mt-0.5">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 pt-6 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
              <span>Need help? Contact support at clip.sync.2k24@gmail.com</span>
              <Link href="/pricing" className="text-indigo-400 hover:underline font-medium">
                View Pricing Plans &rarr;
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Docs;
