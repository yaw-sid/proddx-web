import { Category } from "~/models/category";
import { listCategories } from "~/services/categories";

export const state = () => ({
    categories: [] as Category[]
});

export const mutations = {
    updateCategories(state: any, payload: Category[]) {
        state.categories = payload;
    }
};

export const getters = {
    getCategories(state: any) {
        return state.categories;
    }
};

export const actions = {
    async loadCategories({ commit }: { commit: any }, companyId: string) {
        try {
            const categories = await listCategories(companyId);
            commit("updateCategories", categories);
        } catch (error: any) {
            throw new Error(error);
        }
    }
};