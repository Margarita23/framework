import { Application } from "./models/application";
import { LoginController } from "./custom/login-controller";

let app = Application.getInstance();
app.setStartController(new LoginController());
app.run();
