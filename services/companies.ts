import axios from "./api-client";
import { Company } from "~/models/company";

export function getCompanyDetails(companyId: string, token: string) {
    return axios.get(`/companies/${companyId}`, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "text/plain, application/json"
        }
    });
};

export function updateCompany(company: Company, token: string) {
    return axios.put(`/companies/${company.id}`, company, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
            "Accept": "text/plain, application/json"
        }
    });
};