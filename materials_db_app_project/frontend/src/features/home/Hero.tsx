import { APP_NAME } from "../../constants";
import "./Hero.scss";

function HeroPointLabel({ text = "" }) {
  return (
    <div className="flex gap-2 items-center">
      <div
        className="rounded-full hero-point"
      ></div>
      <span className="hero-point-label">{text}</span>
    </div>
  );
}

export function Hero() {
  return (
    <div className="hero">
      <div className="flex flex-col gap-3 items-center">
        <h1 className="hero-heading">{APP_NAME}</h1>
        <p className="hero-paragraph">
          Discover and explore our curated collection of reclaimed materials
        </p>
        <div className="flex flex-1 gap-4">
          <HeroPointLabel text="Sustainable Materials" />
          <HeroPointLabel text="AI-Powered Analysis" />
        </div>
      </div>
    </div>
  );
}
