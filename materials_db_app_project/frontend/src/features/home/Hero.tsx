import { APP_NAME } from "../../constants";
import "./Hero.scss";

function HeroPointLabel({ text = "" }) {
  return (
    <div className="flex gap-2 items-center">
      <div
        className="w-2 h-2 rounded-full"
        style={{ backgroundColor: "red" }}
      ></div>
      <span className="">{text}</span>
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
        <div className="flex flex-1">
          <HeroPointLabel text="Sustainable Materials" />
        </div>
      </div>
    </div>
  );
}
