import { IServerMessage } from "../interfaces/IServerMessage";

export class ServerMessage implements IServerMessage {
    code!: number;
    type!: string;
    title!: string;
    message!: string;
    status!: number;
}