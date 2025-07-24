export interface NovaPassportDataResponseDto {
    data?: (NovaPassportDataDto) | null;
    success: boolean;
    errorCode: string;
}

export interface NovaPassportDataDto {
    nationalityId: string;
    birthCountryId: string;
    birthDate: string;
    gender: string;
    maritalStatus: number;
    passportIssuingCountryId: string;
    passportNumber: string;
    passportIssueDate: string;
    passportExpiryDate: string;
    firstName: string;
    arabicFirstName: string;
    middleName: string;
    arabicMiddleName: string;
    lastName: string;
    arabicLastName: string;
    fatherName: string;
    arabicFatherName: string;
    motherName: string;
    arabicMotherName: string;
    husbandName: string;
    arabicHusbandName: string;
    passportIssuePlace: string;
    arabicPassportIssuePlace: string;
    birthPlace: string;
    arabicBirthPlace: string;
    passportType: string;
    previousNationalityId: string;
    membershipGroupId: string;
    professionId: number;
    professionName: string;//????????
    addressCountryId: string;
    addressCity: string;
    addressStreet: string;
    age: string;//????????
    uIDNumber: string;//????????
    languageId: number;
    religionId: number;
    expectedEntry: string;
    portrait: string;
    passportPage0: string;
}