export interface TTSVisaListRequestDto {
    recordPerPage: string;
    pageNumber: string;
    sortBy: string;
    startDate: string | null;
    endDate: string | null;
    visaTypeId: string | null;
    passportNumberLike: string | null;
    passengerNameLike: string | null;
    status: string[];
}