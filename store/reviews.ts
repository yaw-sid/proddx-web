import { Review } from "~/models/review";
import { deleteReview, listReviews } from "~/services/reviews";

export const state = () => ({
    reviews: [] as Review[]
});

export const mutations = {
    updateReviews(state: any, payload: Review) {
        state.reviews = payload;
    },

    deleteReview(state: any, id: string) {
        const index = state.reviews.findIndex((r: Review) => r.id === id);
        state.reviews.splice(index, 1);
    }
};

export const getters = {
    getReviews(state: any): Review[] {
        return state.reviews;
    }
};

export const actions = {
    async loadReviews({ commit }: { commit: any }, payload: { companyId: string, token: string }) {
        try {
            const response = await listReviews(payload.companyId, payload.token);
            commit("updateReviews", response.data);
        } catch (error: any) {
            throw new Error(error);
        }
    },

    async removeReview({ commit }: { commit: any }, payload: { reviewId: string, token: string }) {
        try {
            await deleteReview(payload.reviewId, payload.token);
            commit("deleteReview", payload.reviewId);
        } catch (error: any) {
            throw new Error(error);
        }
    }
};