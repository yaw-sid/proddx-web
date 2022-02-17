import { Product } from "~/models/product";
import { createProduct, listProducts } from "~/services/products";

export const state = () => ({
    products: []
});

export const mutations = {
    updateProducts(state: any, payload: Product[]) {
        state.products = payload;
    },

    addToProducts(state: any, payload: Product) {
        state.products.push(payload);
    }
};

export const getters = {
    getProducts(state: any): Product[] {
        return state.products;
    }
};

export const actions = {
    async loadProducts({ commit }: { commit: any }, companyId: string) {
        try {
            const products = await listProducts(companyId);
            commit("updateProducts", products);
        } catch (error: any) {
            throw new Error(error);
        }
    },

    async insertProduct({ commit }: { commit: any }, payload: Product) {
        try {
            await createProduct(payload);
            commit("addToProducts", payload);
        } catch (error: any) {
            throw new Error(error);
        }
    }
};