import VoiceFlowAgent from "@/components/global/voiceflow";
import { CompareDemo } from "./_components/Comparecode";
import Footer from "./_components/Footer";
import { TypewriterEffectSmoothDemo } from "./_components/headingtabs";
import HeroSection from "./_components/HeroSection";
import Features from "./_components/Features";
import HowItWorks from "./_components/HowItWorks";
import Instructors from "./_components/Instructors";
import { TabsDemo } from "./_components/tabsdemo";
import Feedback from "./_components/TestimonialCards";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <HeroSection />
      <Features />
      <HowItWorks />
      <CompareDemo />
      <TypewriterEffectSmoothDemo />
      <TabsDemo />
      <Instructors />
      <Feedback />
      <Footer />
      <VoiceFlowAgent />
    </main>
  );
}
