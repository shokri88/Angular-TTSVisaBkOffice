export interface TTSBaseResponseDto {
    success: boolean;
    error: TTSBaseErrorResponseDto;
}

export interface TTSBaseErrorResponseDto {
    code: string;
    detail: string;
}