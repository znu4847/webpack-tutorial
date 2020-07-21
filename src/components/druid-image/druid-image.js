import Druid from "./druid.png";
import "./druid-image.scss";

class DruidImage {
  render() {
    const img = document.createElement("img");
    img.src = Druid;
    img.alt = "druid";
    img.classList.add("kiwi-image");

    console.log("--- druid");
    const bodyDomElement = document.querySelector("body");
    bodyDomElement.appendChild(img);
  }
}

export default DruidImage;
