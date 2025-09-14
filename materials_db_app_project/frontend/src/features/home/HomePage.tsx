import PageWrapper from "../layout/PageWrapper";
import { Navbar } from "../nav/Navbar";
import { Hero } from "./Hero";
import { ItemsDashboard } from "./ItemsDashboard";

export default function HomePage() {
  return (
    <PageWrapper>
      <Navbar />
      <Hero />
      <ItemsDashboard />
    </PageWrapper>
  );
}
