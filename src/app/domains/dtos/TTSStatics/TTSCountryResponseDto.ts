import { TTSBaseResponseDto } from "../TSBase/TTSBaseResponseDto";

export interface TTSCountryResponseDto extends TTSBaseResponseDto {
    response: TTSCountryResponseBodyDto;
}

export interface TTSCountryResponseBodyDto {
    token: string;
    countries: TTSCountryBodyDto[];
}

export interface TTSCountryBodyDto {
    id: number;
    countryName: string;
    countryCode: string;
}