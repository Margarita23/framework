import { Application } from "./models/application";
import { MainController } from "./custom/main-controller";
import { LoginController } from "./custom/login-controller";
import { ContactsController } from "./custom/contacts-controller";

let app = Application.getInstance();
app.registerControllers([new LoginController(), new MainController(), new ContactsController()]);
app.run();
