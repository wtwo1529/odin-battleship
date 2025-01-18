import "./styles/style.css";
import "./styles/header.css";
import "./styles/body.css";
import Player from "./player";

window.onload = () => {
  const coordinatePlane = document.querySelector(".grid");
  for (let i = 0; i < 10; i++) {
    let row = document.createElement("div");
    row.classList.add("grid-row");
    for (let j = 0; j < 10; j++) {
      let coordinate = document.createElement("div");
      coordinate.classList.add("grid-square");
      row.appendChild(coordinate);
    }
    coordinatePlane.appendChild(row);
  }
};
