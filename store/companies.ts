import { Company } from "~/models/company";
import { getCompanyDetails } from "~/services/companies";

export const state = () => ({
    company: {} as Company
});

export const mutations = {
    updateCompany(state: any, payload: Company) {
        state.company = payload;
    },

    removeCompany(state: any) {
        state.company = {}
    }
};

export const getters = {
    getCompany(state: any) {
        return state.company;
    }
};

export const actions = {
    async loadCompany({ commit }: { commit: any }, companyId: string) {
        try {
            const company = await getCompanyDetails(companyId);
            commit("updateCompany", company);
        } catch (error: any) {
            throw new Error(error);
        }
    },

    logout({ commit }: { commit: any }) {
        commit("removeCompany");
    }
};