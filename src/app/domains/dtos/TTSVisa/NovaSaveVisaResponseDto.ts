import { TTSBaseResponseDto } from "../TSBase/TTSBaseResponseDto";

export interface NovaSaveVisaResponseDto extends TTSBaseResponseDto {
    response: NovaSaveVisaResponseBodyDto;
}

export interface NovaSaveVisaResponseBodyDto {
    executionTime: string;
    token: string;
    requestId: number;
}