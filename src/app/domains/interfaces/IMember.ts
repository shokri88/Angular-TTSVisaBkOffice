import { IServerMessage } from "./IServerMessage";

export interface IMember {
    companyName: string;
    firstName: string;
    lastName: string;
    id: string;
    officeCode: string;
    userName: string;
    password: string;
    serverMessage: IServerMessage;
}
