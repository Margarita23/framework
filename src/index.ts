import { Application } from "./models/application";
// const view = new SomeView();
// const controller = new SomeController(view);
let canvas = document.createElement("canvas").setAttribute("id", "canvas");
export const application = Application.instance;
// app.run(view);