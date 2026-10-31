import { Benefits } from "./components/Benefits";
import { EmotionalBlock } from "./components/EmotionalBlock";
import { FinalCta } from "./components/FinalCta";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Method } from "./components/Method";
import { Numbers } from "./components/Numbers";
import { TestimonialsVideo } from "./components/TestimonialsVideo";
import { Transformations } from "./components/Transformations";
import { Schedule } from "./components/Schedule";
import { Quote } from "./components/Quote";
import { quotes } from "./data/site";

export default function App() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#050505] text-white">
      <Hero />
      <Transformations />
      <Benefits />
      <Quote
        quote={quotes.wellington.quote}
        author={quotes.wellington.author}
        align="right"
      />
      <Schedule />
      <Quote
        quote={quotes.vera.quote}
        author={quotes.vera.author}
        align="left"
      />
      <Method />
      <Quote
        quote={quotes.joyce.quote}
        author={quotes.joyce.author}
        align="right"
      />
      <Numbers />
      <TestimonialsVideo />
      <EmotionalBlock />
      <Quote
        quote={quotes.marinalva.quote}
        author={quotes.marinalva.author}
        align="left"
      />
      <FinalCta />
      <Footer />
    </main>
  );
}
