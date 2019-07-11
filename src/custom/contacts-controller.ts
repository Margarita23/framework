import { ContactsView } from "./contacts-view";
import { View } from "../models/view";
import { Controller } from "../controllers/controller";

export class ContactsController extends Controller{
    public view: View = new ContactsView();
}