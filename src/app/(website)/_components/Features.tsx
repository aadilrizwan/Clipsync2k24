import React from "react";
import { Tv, Zap, BrainCircuit, Users } from "lucide-react";

export default function Features() {
  const items = [
    {
      icon: <Tv className="w-6 h-6 text-indigo-400 group-hover:text-indigo-300 transition-colors" />,
      title: "HD Screen Capture",
      description: "Record your screen, camera input, or both simultaneously with high-definition rendering. Ideal for developers, support agents, and design reviews."
    },
    {
      icon: <Zap className="w-6 h-6 text-amber-400 group-hover:text-amber-300 transition-colors" />,
      title: "Instant Share Links",
      description: "Videos are instantly processed and uploaded to the cloud. Share links are auto-copied, letting you send clips to slack, email, or clients instantly."
    },
    {
      icon: <BrainCircuit className="w-6 h-6 text-emerald-400 group-hover:text-emerald-300 transition-colors" />,
      title: "Gemini AI Audio Transcripts",
      description: "Powered by Gemini 1.5 Flash. Transcribe speech, generate automated video titles, and create concise descriptions in real-time."
    },
    {
      icon: <Users className="w-6 h-6 text-sky-400 group-hover:text-sky-300 transition-colors" />,
      title: "Team Workspaces",
      description: "Manage projects in custom folder layers. Invite team members to public folders, add comment replies, and track video view counts easily."
    }
  ];

  return (
    <section className="py-20 px-6 w-full max-w-5xl mx-auto flex flex-col gap-12">
      <div className="flex flex-col gap-3 text-center md:text-left max-w-2xl">
        <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-100 tracking-tight">
          Supercharge your workspace communication
        </h2>
        <p className="text-neutral-400 text-sm md:text-base leading-relaxed">
          ClipSync replaces long meetings and walls of text with quick, contextual video messages that keep everyone aligned asynchronously.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {items.map((item, index) => (
          <div 
            key={index}
            className="group flex flex-col gap-5 bg-[#09090b]/40 backdrop-blur-md border border-neutral-900 rounded-3xl p-8 hover:border-neutral-800/80 hover:shadow-2xl hover:shadow-indigo-950/5 hover:-translate-y-0.5 transition-all duration-300"
          >
            <div className="p-3.5 bg-neutral-950/60 border border-neutral-900 rounded-2xl w-fit group-hover:border-neutral-800 transition-all duration-300 shadow-inner">
              {item.icon}
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-bold text-neutral-200 group-hover:text-white transition-colors">
                {item.title}
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed font-normal">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
