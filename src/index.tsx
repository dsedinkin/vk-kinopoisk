import { createRoot } from "react-dom/client";

import AppConfig from "./AppConfig";

import "@vkontakte/vkui/dist/cssm/styles/themes.css";
import "./style.css";

const app = document.getElementById("app");
const root = app && createRoot(app);

root && root.render(<AppConfig />);
