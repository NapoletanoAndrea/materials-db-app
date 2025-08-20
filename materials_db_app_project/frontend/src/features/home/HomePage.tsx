import { APP_NAME } from "../../constants";
import { Navbar } from "../nav/Navbar";
import { Hero } from "./Hero";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
    </>
  );
}
