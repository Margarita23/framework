import { Application } from "./application";

export class MyApp {
    protected static instance = new MyApp();

    public static getInstance():MyApp {
        return MyApp.instance;
    }
}