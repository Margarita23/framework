import { MyApp } from "./models/my-app";
import { Application } from "./models/application";

let button = document.querySelector("button");

button.addEventListener("click", () => {
    console.log("Button clicked.");
});

let myApp = MyApp.getInstance();
console.log(myApp);
const app = new Application();
app.subject.subscribe(() => console.log('hi'));
