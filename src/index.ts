import { Application } from "./models/application";
import { LoginController } from "./custom/login-controller";
import { LoginView } from "./custom/login-view";


const view = new LoginView();
const controller = new LoginController(view);
let app = Application.getInstance();
app.run(view);
