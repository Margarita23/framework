import { Application } from "./models/application";
import { LoginController } from "./controllers/login-controller";
import { LoginView } from "./views/login-view";

const view = new LoginView();
const controller = new LoginController(view);
let app = Application.getInstance();
app.run(view);