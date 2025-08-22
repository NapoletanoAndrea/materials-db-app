import { Navbar } from "../nav/Navbar";
import { Hero } from "./Hero";
import { ItemsDashboard } from "./ItemsDashboard";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <ItemsDashboard />
    </>
  );
}
