import Druid from "./druid.png";

function addImage() {
  const img = document.createElement("img");
  img.alt = "druid";
  img.width = 300;
  img.src = Druid;
  const body = document.querySelector("body");
  body.appendChild(img);
}
export default addImage;
