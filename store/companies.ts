import { Company } from "~/models/company";
import { getCompanyDetails, updateCompany } from "~/services/companies";

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
    async loadCompany({ commit }: { commit: any }, payload: { id: string, token: string }) {
        try {
            const response = await getCompanyDetails(payload.id, payload.token);
            commit("updateCompany", response.data);
        } catch (error: any) {
            throw new Error(error);
        }
    },

    async editCompany({ commit }: { commit: any }, payload: { company: Company, token: string }) {
        try {
            const response = await updateCompany(payload.company, payload.token);
            commit("updateCompany", response.data);
        } catch (error: any) {
            throw new Error(error);
        }
    },

    logout({ commit }: { commit: any }) {
        commit("removeCompany");
    }
};