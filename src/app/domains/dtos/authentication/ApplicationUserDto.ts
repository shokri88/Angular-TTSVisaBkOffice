export interface ApplicationUserDto {
    id: string;
    companyId: number;
    officeCode: string;
    companyName: string;
    eMail: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    isConfirm: boolean;
    userName: string;
    registerDate: Date;
    novaUserId:number
}