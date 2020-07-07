import "./hello-world-button.scss";

class HelloWorldButton {
  // to check that babel works
  buttonCssClass = "hello-world-button";
  constructor() {}
  render() {
    const button = document.createElement("button");
    button.innerHTML = "Hello World";
    button.classList.add(this.buttonCssClass);
    button.onclick = function () {
      const p = document.createElement("p");
      p.innerHTML = "Hello world";
      p.classList.add("hello-world-text");
      body.appendChild(p);
    };
    const body = document.querySelector("body");
    body.appendChild(button);
  }
}
export default HelloWorldButton;
