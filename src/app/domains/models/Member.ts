import { IMember } from "../interfaces/IMember";
import { ServerMessage } from "./ServerMessage";

export class Member implements IMember {
    serverMessage!: ServerMessage;
    companyName!: string;
    firstName!: string;
    lastName!: string;
    id!: string;
    officeCode!: string;
    userName!: string;
    password!: string;
}