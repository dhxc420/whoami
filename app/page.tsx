import Community from "@/components/Community";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import MobileCta from "@/components/MobileCta";
import Protocol from "@/components/Protocol";
import Specs from "@/components/Specs";
import Story from "@/components/Story";
import WorldChain from "@/components/WorldChain";

export default function Home() {
  return (
    <main id="top">
      <Hero />
      <Story />
      <Specs />
      <Protocol />
      <WorldChain />
      <Community />
      <Footer />
      <MobileCta />
    </main>
  );
}
