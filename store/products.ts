import { Product } from "~/models/product";
import { listProducts } from "~/services/products";

export const state = () => ({
    products: []
});

export const mutations = {
    updateProducts(state: any, payload: Product[]) {
        state.products = payload;
    }
};

export const getters = {
    getProducts(state: any): Product[] {
        return state.products;
    }
};

export const actions = {
    async loadProducts({ commit }: { commit: any}, companyId: string) {
        try {
            const products = await listProducts(companyId);
            commit("updateProducts", products);
        } catch (error: any) {
            throw new Error(error);
        }
    }
}