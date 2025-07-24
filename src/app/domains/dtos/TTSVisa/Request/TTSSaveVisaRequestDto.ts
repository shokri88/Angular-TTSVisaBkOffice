export interface TTSSaveVisaRequestDto {
    nationalityId: string;
    birthCountryId: string;
    birthDate: string;
    gender: string;
    maritalStatus: string;
    passportIssuingCountryId: string;
    passportNumber: string;
    passportIssueDate: string;
    passportExpiryDate: string;
    destinationCountryId: string;
    currencyId: string;
    applicantAccountId: string;
    firstName: string;
    arabicFirstName: string;
    middleName: string | null;
    arabicMiddleName: string | null;
    lastName: string;
    arabicLastName: string;
    fatherName: string;
    arabicFatherName: string;
    motherName: string;
    arabicMotherName: string;
    husbandName: string | null;
    arabicHusbandName: string | null;
    passportIssuePlace: string;
    arabicPassportIssuePlace: string;
    birthPlace: string;
    arabicBirthPlace: string;
    passportType: string;
    previousNationalityId: string;
    membershipGroupId: string;
    professionId: string;
    addressCountryId: string;
    addressCity: string;
    addressStreet: string;
    phoneNumber: string;
    uIDNumber: number | null;
    expectedTripDate: string;
    referenceNumber: string | null;
    requestRemarks: string | null;
    sponsor: string;
    comingFromCountryId: string;
    languageId: string;
    parentRequestId: string;
    holdRequest: string;
    religionId: string;
    rateId: string;

    portrait: string;
    passportPage1: string;
    passportPage2: string;
    nationalIDCardFront: string;
    nationalIDCardBack: string;
    additionalDocument1: string;
    additionalDocument2: string;

    attachments: ExportAttachmentData[]
}

export interface ExportAttachmentData {
    key: string;
    name: string;
    attachmentData: string;
}