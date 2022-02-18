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
    async loadReviews({ commit }: { commit: any }, companyId: string) {
        try {
            const reviews = await listReviews(companyId);
            commit("updateReviews", reviews);
        } catch (error: any) {
            throw new Error(error);
        }
    },

    async removeReview({ commit }: { commit: any }, reviewId: string) {
        try {
            await deleteReview(reviewId);
            commit("deleteReview", reviewId);
        } catch (error: any) {
            throw new Error(error);
        }
    }
};