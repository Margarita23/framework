import { Application } from "./models/application";
import { MainView } from "./custom/main-view";
import { LoginView } from "./custom/login-view";
import { ContactsView } from "./custom/contacts-view";

let app = Application.getInstance();
app.registerView(MainView.getInstance(), LoginView.getInstance(), ContactsView.getInstance());
app.run();
