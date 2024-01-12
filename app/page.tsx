import Contact from "@/components/contact";
import Expert from "@/components/expert";
import Hero from "@/components/hero";
import Info from "@/components/info";
import Footer from "@/components/footer";
import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/navbar";
import Onit from "@/components/onit";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Info />
      <Expert />
      <Onit />
      <Contact />
      <Footer />
    </main>
  );
}
