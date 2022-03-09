import axios from "./api-client";
import { Product } from "~/models/product";

export function createProduct(p: Product, token: string) {
    return axios.post("/products", p, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
            "Accept": "text/plain, application/json"
        }
    });
};

export function listProducts(companyId: string, token: string) {
    return axios.get(`/products?company_id=${companyId}`, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "text/plain, application/json"
        }
    });
};

export function updateProduct(p: Product, token: string) {
    return axios.put(`/products/${p.id}`, p, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
            "Accept": "text/plain, application/json"
        }
    });
};

export function deleteProduct(productId: string, token: string) {
    return axios.delete(`/products/${productId}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
};