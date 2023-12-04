import Contact from "@/components/contact";
import Expert from "@/components/expert";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Info from "@/components/info";
import Nav from "@/components/navbar";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Info />
      <Expert />
      <Contact />
      <Footer />
    </main>
  );
}
