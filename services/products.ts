import { Product } from "~/models/product";

export function createProduct(p: Product): Promise<Product> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(p);
        }, 1000);
    });
}

export function listProducts(companyId: string): Promise<Array<Product>> {
    const products: Array<Product> = [];
    for (let i = 0; i < 6; i++) {
        products.push(new Product(`${i+1}`, `Product ${i+1}`, `${(i%3) + 1}`, "http://example.com", Math.floor(Math.random() * 10) % 6));
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return new Promise((resolve, reject) => {
        resolve(products.filter(p => p.company === companyId));
    });
}