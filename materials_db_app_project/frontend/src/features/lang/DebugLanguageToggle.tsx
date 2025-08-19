import { useTranslation } from "react-i18next";
import { IMAGES_PATH } from "../../constants";

export default function DebugLanguageToggle() {
  const { i18n } = useTranslation();

  const svgStyle = {
    width: "1.25em",
    height: "1.25em",
    margin: "auto 0",
  };

  return (
    <div style={{ display: "flex", gap: ".5rem" }}>
      <button className="btn" onClick={() => i18n.changeLanguage("en-GB")}>
        <img
          style={svgStyle}
          src={IMAGES_PATH + "flags/uk.svg"}
          alt="UK Flag"
        />
        EN
      </button>
      <button className="btn" onClick={() => i18n.changeLanguage("it-IT")}>
        <img
          style={svgStyle}
          src={IMAGES_PATH + "flags/italy.svg"}
          alt="Italian Flag"
        />
        IT
      </button>
      <button
        className="btn"
        onClick={() => i18n.changeLanguage(String(navigator.language))}
      >
        🌐 Browser
      </button>
    </div>
  );
}
