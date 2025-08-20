import { APP_NAME } from "../../constants";
import "./Hero.scss";

export function Hero() {
  return (
    <div className="hero">
      <div className="flex flex-col gap-1 items-center">
        <h1 className="hero-heading">{APP_NAME}</h1>
        <p className="hero-paragraph">
          Discover and explore our curated collection of reclaimed materials
        </p>
      </div>
    </div>
  );
}
