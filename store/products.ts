import { Product } from "~/models/product";
import { createProduct, deleteProduct, listProducts, updateProduct } from "~/services/products";

export const state = () => ({
    products: [] as Product[]
});

export const mutations = {
    updateProducts(state: any, payload: Product[]) {
        state.products = payload;
    },

    addToProducts(state: any, payload: Product) {
        state.products.push(payload);
    },

    updateAProduct(state: any, payload: Product) {
        const product = state.products.find((p: Product) => p.id === payload.id);
        Object.assign(product, payload);
    },

    deleteAProduct(state: any, id: string) {
        const index = state.products.findIndex((p: Product) => p.id === id);
        state.products.splice(index, 1);
    }
};

export const getters = {
    getProducts(state: any): Product[] {
        return state.products;
    }
};

export const actions = {
    async loadProducts({ commit }: { commit: any }, payload: { companyId: string, token: string}) {
        try {
            const response = await listProducts(payload.companyId, payload.token);
            commit("updateProducts", response.data);
        } catch (error: any) {
            throw new Error(error);
        }
    },

    async insertProduct({ commit }: { commit: any }, payload: { data: Product, token: string }) {
        try {
            const response = await createProduct(payload.data, payload.token);
            commit("addToProducts", response.data);
        } catch (error: any) {
            throw new Error(error);
        }
    },

    async editProduct({ commit }: { commit: any }, payload: { data: Product, token: string }) {
        try {
            const response = await updateProduct(payload.data, payload.token);
            commit("updateAProduct", response.data);
        } catch (error: any) {
            throw new Error(error);
        }
    },

    async removeProduct({ commit }: { commit: any }, payload: { id: string, token: string }) {
        try {
            await deleteProduct(payload.id, payload.token);
            commit("updateAProduct", payload.id);
        } catch (error: any) {
            throw new Error(error);
        }
    }
};