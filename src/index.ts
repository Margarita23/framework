import { Application } from "./models/application";
import { LoginController } from "./custom/login-page/login-controller";
import { LoginView } from "./custom/login-page/login-view";

const view = new LoginView();
const controller = new LoginController(view);
let app = Application.instance;
app.run(view);