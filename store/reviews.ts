import { Review } from "~/models/review";
import { listReviews } from "~/services/reviews";

export const state = () => ({
    reviews: []
});

export const mutations = {
    updateReviews(state: any, payload: Review) {
        state.reviews = payload;
    }
};

export const getters = {
    getReviews(state: any): Review[] {
        return state.reviews;
    }
};

export const actions = {
    async loadReviews({ commit }: { commit: any }, companyId: string) {
        try {
            const reviews = await listReviews(companyId);
            commit("updateReviews", reviews);
        } catch (error: any) {
            throw new Error(error);
        }
    }
};