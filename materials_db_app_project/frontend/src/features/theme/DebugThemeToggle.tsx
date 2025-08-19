import Button from "../../components/Button";
import { useTheme } from "./useTheme";

export const DebugThemeToggle = () => {
  const { updateTheme } = useTheme();

  return (
    <div style={{ display: "flex", gap: ".5rem" }}>
      <Button onClick={() => updateTheme("light")}>🌞 Light</Button>
      <Button onClick={() => updateTheme("dark")}>🌙 Dark</Button>
      <Button onClick={() => updateTheme("system")}>🖥 System</Button>
    </div>
  );
};
