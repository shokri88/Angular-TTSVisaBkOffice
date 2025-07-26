import { TTSBaseResponseDto } from "../TSBase/TTSBaseResponseDto";

export interface TTSVisaListResponseDto extends TTSBaseResponseDto {
    response: TTSVisaListResponseData;
}

export interface TTSVisaListResponseData {
    executionTime: string;
    token: string;
    currency: TTSVisaListCurrency;
    data: { [key: string]: TTSVisaListRequest; };
    totalRecords: number;
    recordPerPage: number;
    currentPage: number;
    startingRecord: number;
    endingRecord: number;
}

export interface TTSVisaListCurrency {
    id: number;
    isoCode: string;
}

export interface TTSVisaListRequest {
    requestId: number;
    dates: TTSVisaListRequestDates;
    requestDetails: TTSVisaListRequestDetails;
}

export interface TTSVisaListRequestDates {
    requestDate: string;
    applicationDate: string;
    processDate: string;
    approvalDate: string;
    entryDate: string;
    exitDate: string;
    lastDay: string;
}

export interface TTSVisaListRequestDetails {
    visaType: TTSVisaListVisaType;
    passengerFirstName: string;
    passengerMiddleName: string;
    passengerLastName: string;
    passengerGender: string;
    passengerNationality: TTSVisaListNationality;
    passengerPassportNumber: string;
    applicationNumber: string;
    changeStatusApplicationNumber: string;
    visaNumber: string;
    requestStatus: string;
    requestLock: number;
    passengerBirthDate: string;
    expectedTripDate: string;
    numberOfAccompanies: number;
    requestNotes: string;
    totalPayableRate: number;
    vATAmount: number;
    currency: TTSVisaListCurrency;
    agentReference: string;
    isInsured: boolean;
    serviceBookingId: string;
    messages: string[];
}

export interface TTSVisaListVisaType {
    id: number;
    title: string;
    countryId: number;
    countryCode: string;
}

export interface TTSVisaListNationality {
    id: number;
    name: string;
}