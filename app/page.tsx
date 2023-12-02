import Hero from "@/components/hero";
import Nav from "@/components/navbar";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
    </main>
  );
}
