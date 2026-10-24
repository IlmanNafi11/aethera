import './styles/fonts.css';
import './styles/theme.css';
import { VideoBackground } from './components/VideoBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { Studio } from './components/Studio';
import { About } from './components/About';
import { Philosophy } from './components/Philosophy';
import { Journal } from './components/Journal';
import { ReachUs } from './components/ReachUs';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div id="top" className="relative min-h-screen w-full overflow-x-clip bg-[#FFFFFF]">
      <a
        href="#studio"
        className="sr-only z-50 rounded-full bg-[#000000] px-5 py-3 text-sm text-[#FFFFFF] focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      {/* Hero viewport: the video and its gradient stay inside the first screen */}
      <div className="relative h-[100svh] min-h-[640px] w-full">
        <VideoBackground />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-background via-transparent to-background" />
        <Navbar />
        <Hero />
      </div>

      <Marquee />
      <Studio />
      <About />
      <Philosophy />
      <Journal />
      <ReachUs />
      <Footer />
    </div>
  );
}
