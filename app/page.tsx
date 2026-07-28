import Community from "@/components/Community";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Media from "@/components/Media";
import MobileCta from "@/components/MobileCta";
import Protocol from "@/components/Protocol";
import ScrollJump from "@/components/ScrollJump";
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
      <Media />
      <Footer />
      <MobileCta />
      <ScrollJump />
    </main>
  );
}
