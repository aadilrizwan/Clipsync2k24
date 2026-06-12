import React from "react";

export default function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "One-Click Record",
      description: "Launch the ClipSync recording interface from your dashboard. Toggle your screen, webcam, and microphone settings to record your video instantly."
    },
    {
      num: "02",
      title: "Cloud & Gemini AI Sync",
      description: "Your video streams directly to the cloud. Our backend immediately processes the file and uses Gemini 1.5 Flash to generate transcripts, titles, and summaries."
    },
    {
      num: "03",
      title: "Share & Discuss",
      description: "Send the dynamic video link to clients or team members. Receive first-viewer email alerts and engage in nested thread comments right on the video timeline."
    }
  ];

  return (
    <section className="py-20 px-6 w-full max-w-5xl mx-auto flex flex-col gap-12 border-t border-neutral-900/40">
      <div className="flex flex-col gap-3 text-center md:text-left max-w-2xl">
        <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-100 tracking-tight">
          How ClipSync works in 3 steps
        </h2>
        <p className="text-neutral-400 text-sm md:text-base leading-relaxed">
          From screen recording to intelligent transcription, ClipSync does the heavy lifting so you can communicate faster.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {steps.map((step, index) => (
          <div 
            key={index}
            className="group flex flex-col gap-4 bg-[#09090b]/20 border border-neutral-900 rounded-3xl p-8 hover:border-neutral-800 transition duration-300 relative overflow-hidden"
          >
            <div className="text-5xl md:text-6xl font-extrabold text-neutral-900 group-hover:text-indigo-500/10 transition-colors duration-300 absolute right-6 top-6 select-none font-mono">
              {step.num}
            </div>
            
            <div className="flex flex-col gap-2 relative z-10 mt-6">
              <h3 className="text-lg font-bold text-neutral-200 group-hover:text-white transition-colors duration-300">
                {step.title}
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed font-normal">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
