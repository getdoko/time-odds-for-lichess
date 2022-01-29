import { h, Component, render } from "preact";
import { App } from "./App.js";

{
  const moreTimeDiv = document.querySelector(".moretime");

  if (moreTimeDiv) {
    const rclockBottom = document.querySelector(".rclock-bottom");

    const timeOddsDiv = document.createElement("div");
    rclockBottom.appendChild(timeOddsDiv);
    render(<App />, timeOddsDiv);
  }
}
