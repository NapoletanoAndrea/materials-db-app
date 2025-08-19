import { useEffect, useState } from "react";
import { useBreakpoint } from "./breakpoints";

export const DebugBreakpoints = () => {
  const [breakpoint] = useBreakpoint();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const calcWindowWidth = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", calcWindowWidth);
    return () => window.removeEventListener("resize", calcWindowWidth);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        gap: ".5rem",
        backgroundColor: "black",
        color: "white",
      }}
    >
      <span>{breakpoint?.label}</span>
      <span>{windowWidth + "px"}</span>
      <span>{windowWidth / 16 + "rem"}</span>
    </div>
  );
};
