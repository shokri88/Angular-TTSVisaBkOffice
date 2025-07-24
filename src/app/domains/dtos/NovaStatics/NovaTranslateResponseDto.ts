export interface NovaTranslateResponseDto {
    data?: (NovaTranslateDto) | null;
    success: boolean;
    errorCode: string;
}

export interface NovaTranslateDto {
    arabicTexts: string[];
}
