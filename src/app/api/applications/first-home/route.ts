import db from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";
type PersonalData = {
  idNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  race: string;
};

type AddressData = {
  address: string;
  suburb: string;
  city: string;
  province: string;
  postalCode: string;
};

type SupportData = {
  supportType: string;
  province: string;
  municipalityMetro: string;
  projectName: string;
  product: string;
};

type QualificationData = {
  isCitizenOrResident: string;
  isOver18: string;
  isFirstTimeBuyer: string;
  hasDependents: string;
  monthlyIncomeApplicant: string;
  monthlyIncomeSpouse: string;
  combinedMonthlyIncome: string;
};

type DependentsData = {
  femaleChildrenUnder18: string;
  maleChildrenUnder18: string;
  femaleChildren18To24: string;
  maleChildren18To24: string;
  otherDependents: string;
};


type CurrentEmployerData = {
  companyName: string;
  address: string;
  suburb: string;
  city: string;
  province: string;
  postalCode: string;
  employmentDate: string;
  contactPersonName: string;
  contactPersonPhone: string;
  contactPersonEmail: string;
};

type PreviousEmploymentData = {
  companyName: string;
  address: string;
  suburb: string;
  city: string;
  province: string;
  postalCode: string;
  employmentStartDate: string;
  employmentEndDate: string;
  termsAgreement: string;
  contactPersonName: string;
  contactPersonPhone: string;
  contactPersonEmail: string;
};



type FormData = {
  loanType: string;
  personalData: PersonalData;
  addressData: AddressData;
  supportData: SupportData;
  qualificationData: QualificationData;
  dependentsData: DependentsData;
  employmentStatus: string;
  currentEmployerData: CurrentEmployerData;
  previousEmploymentData: PreviousEmploymentData;
};

export async function GET() {
  try {
    const res = await db.firstHomeLoan.findMany();

    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  function generateUniqueId(length = 10) {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      result += chars[randomIndex];
    }
    return result;
  }
  try {
    const data: FormData = await req.json();
    const id = generateUniqueId();
    // Access the data here
    const {
      personalData,
      addressData,
      supportData,
      qualificationData,
      dependentsData,
      employmentStatus,
      currentEmployerData,
      previousEmploymentData,
    } = data;
    console.log(
      personalData,
      addressData,
      supportData,
      qualificationData,
      dependentsData,
      employmentStatus,
      currentEmployerData,
      previousEmploymentData
      
    );

    const applicationData = await db.firstHomeLoan.create({
      data: {
        id: id,
        LoanType: "First Home Finance",
        idNumber: personalData.idNumber,
        firstName: personalData.firstName,
        lastName: personalData.lastName,
        email: personalData.email,
        phone: personalData.phoneNumber,
        gender: personalData.gender,
        race: personalData.race,
        address: addressData.address,
        suburb: addressData.suburb,
        city: addressData.city,
        province: addressData.province,
        postalCode: addressData.postalCode,
        supportType: supportData.supportType,
        projectProvince: supportData.province,
        municipalityMetro: supportData.municipalityMetro,
        projectName: supportData.projectName,
        product: supportData.product,
        isCitizenOrResident: qualificationData.isCitizenOrResident,
        isOver18: qualificationData.isOver18,
        isFirstTimeBuyer: qualificationData.isFirstTimeBuyer,
        hasDependents: qualificationData.hasDependents,
        monthlyIncomeApplicant: qualificationData.monthlyIncomeApplicant,
        monthlyIncomeSpouse: qualificationData.monthlyIncomeSpouse,
        combinedMonthlyIncome: qualificationData.combinedMonthlyIncome,
        femaleChildrenUnder18: dependentsData.femaleChildrenUnder18,
        maleChildrenUnder18: dependentsData.maleChildrenUnder18,
        femaleChildren18To24: dependentsData.femaleChildren18To24,
        maleChildren18To24: dependentsData.maleChildren18To24,
        otherDependents: dependentsData.otherDependents,
        employmentStatus: employmentStatus,
        currentCompanyName: currentEmployerData.companyName,
        currentCompanyAddress: currentEmployerData.address,
        currentCompanySuburb: currentEmployerData.suburb,
        currentCompanyCity: currentEmployerData.city,
        currentCompanyProvince: currentEmployerData.province,
        currentCompanyPostalCode: currentEmployerData.postalCode,
        currentCompanyEmploymentDate: currentEmployerData.employmentDate,
        currentCompanyContactPersonName: currentEmployerData.contactPersonName,
        currentCompanyContactPersonPhone:
          currentEmployerData.contactPersonPhone,
        currentCompanyContactPersonEmail:
          currentEmployerData.contactPersonEmail,
        previousCompanyName: previousEmploymentData.companyName,
        previousCompanyAddress: previousEmploymentData.address,
        previousCompanySuburb: previousEmploymentData.suburb,
        previousCompanyCity: previousEmploymentData.city,
        previousCompanyProvince: previousEmploymentData.province,
        previousCompanyPostalCode: previousEmploymentData.postalCode,
        previousCompanyEmploymentStartDate:
          previousEmploymentData.employmentStartDate,
        previousCompanyEmploymentEndDate:
          previousEmploymentData.employmentEndDate,
        previousCompanyContactPersonName:
          previousEmploymentData.contactPersonName,
        previousCompanyContactPersonPhone:
          previousEmploymentData.contactPersonPhone,
        previousCompanyContactPersonEmail:
          previousEmploymentData.contactPersonEmail,
        termsAgreement: previousEmploymentData.termsAgreement,
      },
    });

    return NextResponse.json({ applicationData }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
