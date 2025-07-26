import { TTSBaseResponseDto } from "../TSBase/TTSBaseResponseDto";

export interface TTSSaveVisaResponseDto extends TTSBaseResponseDto {
    response: TTSSaveVisaResponseBodyDto;
}

export interface TTSSaveVisaResponseBodyDto {
    executionTime: string;
    token: string;
    requestId: number;
}