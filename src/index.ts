import { MyApp } from "./models/my-app";

let button = document.querySelector("button");

button.addEventListener("click", () => {
    console.log("Button clicked.");
});

let myApp = MyApp.getInstance();
console.log(myApp);

