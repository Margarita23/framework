import { View } from "../models/view";
import { LoginController } from "./login-controller";
import { Input } from "../models/input";
import { Button } from "../models/button";

export class LoginView extends View {
    protected static instance = new LoginView;
    private controller: LoginController = new LoginController();
    private constructor() { super(); }

    public static getInstance(): LoginView {
        return LoginView.instance;
    }

    private loginForm(){
        let login = new Input(1);
        login.x = 500;
        login.y = 300;
        login.inputText.maxLength = 50;
        login.inputText.setText("Print login...");
        this.registerControl(login);

        let pass = new Input(1);
        pass.x = 500;
        pass.y = 400;
        pass.setPrivateInput(true);
        pass.inputText.setText("Print password...");

        this.registerControl(pass);

        let submit = new Button(1);
        submit.x = 500;
        submit.y = 500;
        submit.text = "Submit";
        submit.click = this.controller.submitLoginAndPassword.bind(this);
        this.registerControl(submit);
    }

    private menuGoToLogin(){
        let button = new Button(1);
        button.text = "Main page";
        this.registerControl(button);
    }

    public run(): void{
        this.menuGoToLogin();
        this.loginForm();
    }
}