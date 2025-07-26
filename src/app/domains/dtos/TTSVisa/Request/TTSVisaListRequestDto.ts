export interface TTSVisaListRequestDto {
    recordPerPage: number;
    pageNumber: number;
    sortBy: string;
    startDate: string | null;
    endDate: string | null;
    visaTypeId: string | null;
    passportNumberLike: string | null;
    passengerNameLike: string | null;
    status: string[];
    requestId: string | null;
}