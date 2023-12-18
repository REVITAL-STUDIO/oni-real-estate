import Contact from "@/components/contact";
import Expert from "@/components/expert";
import Hero from "@/components/hero";
import Info from "@/components/info";
import Footer from "@/components/footer";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Hero />
      <Info />
      <Expert />
      <Contact />
    </main>
  );
}
