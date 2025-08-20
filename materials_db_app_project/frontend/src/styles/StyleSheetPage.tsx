import "./utilityClasses.scss";
import { Filter } from "lucide-react";

export default function StyleSheetPage() {
  return (
    <>
      <section id="headings">
        <div className="container">
          <h1>Heading 1</h1>
          <h2>Heading 2</h2>
          <h3>Heading 3</h3>
          <h4>Heading 4</h4>
          <h5>Heading 5</h5>
          <h6>Heading 6</h6>
        </div>
      </section>
      <section id="text">
        <div className="container">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </p>
        </div>
      </section>
      <section id="elements">
        <div className="container">
          <div className="h-flex" style={{ alignItems: "flex-start" }}>
            <button className="btn">Button</button>
            <input placeholder="Input" type="text" />
            <textarea placeholder="Text" />
            <Filter />
          </div>
        </div>
      </section>
    </>
  );
}
