import { View } from "../views/view";

export class MainView extends View {
    protected static instance = new MainView;

    private constructor() {
        super()
    }

    public static getInstance() :MainView {
        return MainView.instance;
    }

}
