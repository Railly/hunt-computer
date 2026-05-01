import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Manifesto } from "@/components/manifesto";
import { Nav } from "@/components/nav";
import { Now } from "@/components/now";
import { Products } from "@/components/products";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <About />
      <Manifesto />
      <Now />
      <Products />
      <Contact />
      <Footer />
    </main>
  );
}
