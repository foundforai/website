import { hydrateRoot, createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "./revamp.css";
import { installStaleBuildCheck } from "./lib/staleBuild";

installStaleBuildCheck();

const rootElement = document.getElementById("root")!;
const hasSSRContent = rootElement.innerHTML.trim() !== "" && rootElement.innerHTML.trim() !== "<!--ssr-outlet-->";

if (hasSSRContent) {
  hydrateRoot(rootElement, <App />);
} else {
  createRoot(rootElement).render(<App />);
}
