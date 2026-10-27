import { hydrateRoot, createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "./revamp.css";

const rootElement = document.getElementById("root")!;
const hasSSRContent = rootElement.innerHTML.trim() !== "" && rootElement.innerHTML.trim() !== "<!--ssr-outlet-->";

if (hasSSRContent) {
  hydrateRoot(rootElement, <App />);
} else {
  createRoot(rootElement).render(<App />);
}
