import { ServerMessage } from "../../models/ServerMessage";

export interface CompanyDto {
    serverMessage: ServerMessage;
    id: number;
    officeCode: string;
    companyName: string;
    fax: string;
    email: string;
    phone: string;
    website: string;
    city: string;
    address: string;
}