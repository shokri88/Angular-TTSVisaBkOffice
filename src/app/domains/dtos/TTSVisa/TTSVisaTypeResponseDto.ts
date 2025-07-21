import { TTSBaseResponseDto } from "../TSBase/TTSBaseResponseDto";

export interface TTSVisaTypeResponseDto extends TTSBaseResponseDto {
    response: TTSVisaTypeResponseBodyDto;
}

export interface TTSVisaTypeResponseBodyDto {
    token: string;
    types: TTSVisaTypeBodyDto[];
}

export interface TTSVisaTypeBodyDto {
    visaTypeId: number;
    visaTypeTitle: string;
    forTravelTo: TTSVisaForTravelToBodyDto;
    forNationalityOf: TTSVisaForNationalityOfBodyDto;
    validity: number;
    extendable: number;
    multipleEntry: number;
    descriptions: string;
    rate: TTSVisaRateBodyDto;
}

export interface TTSVisaForNationalityOfBodyDto {
    countryName: string;
    countryId: number;
}

export interface TTSVisaForTravelToBodyDto {
    countryName: string;
    countryId: number;
}

export interface TTSVisaRateBodyDto {
    rateKey: number;
    amount: string;
    currencyCode: string;
    currencyId: number;
}