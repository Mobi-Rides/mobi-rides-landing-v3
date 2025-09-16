// Type augmentation for ethereum property
declare global {
  interface Window {
    ethereum?: any;
  }
}

import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
