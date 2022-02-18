import { Company } from "~/models/company";

export function getCompanyDetails(companyId: string) {
    const company = new Company(companyId, "Company 1", "user@example.com", "");
    return Promise.resolve(company);
}