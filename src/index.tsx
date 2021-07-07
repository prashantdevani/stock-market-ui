import "./constants/index.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.scss";
import { render } from "react-dom";
import React = require("react");
import App from "./app";


const appElm = document.createElement("div");
appElm.classList.add("container");
document.body.appendChild(appElm);

window.addEventListener("load", async () => {
  setTimeout(() => {
    render(<App />, appElm);
  }, 1000);
});
