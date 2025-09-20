import { Heart } from "lucide-react";
import { APP_NAME } from "../../constants";

export function Hero() {
  return (
    <div className="w-full py-12">
      <div className="flex gap-3 items-center justify-around">
        <div className="flex flex-col gap-6">
          <h1 className="text-brand text-6xl md:text-8xl font-bold tracking-tight">
            {APP_NAME}
          </h1>
          <p className="text-xl md:text-2xl text-black font-medium">
            You search, we match.
          </p>
        </div>
        <div className="">
          <div className="relative">
            <div className="heart-layer heart-1">
              <Heart
                size={80}
                className="text-brand"
                fill="none"
                stroke="currentColor"
                strokeWidth={3}
              />
            </div>
            <div className="heart-layer heart-2">
              <Heart
                size={120}
                className="text-brand"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
