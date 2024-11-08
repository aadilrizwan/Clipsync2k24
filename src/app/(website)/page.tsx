import { CompareDemo } from "./_components/Comparecode";
import Footer from "./_components/Footer";
import HeroSection from "./_components/HeroSection";
import Instructors from "./_components/Instructors";
import { TabsDemo } from "./_components/tabsdemo";
import Feedback from "./_components/TestimonialCards";
export default function Home() {
  return (
    <main className="min-h-screen bg-blue/[0.96] antialiased bg-grid-white/[0.02]">
    <HeroSection/>
    <Instructors/>
    <Feedback/>
    <CompareDemo/>
    <TabsDemo/>
    <Footer/>
    </main>
  );
}
