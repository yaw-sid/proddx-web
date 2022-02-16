import { Category } from "~/models/category";

export function listCategories(companyId: string) {
    const categories: Category[] = [];

    for (let i = 0; i < 20; i++) {
        categories.push(new Category(
            `${i + 1}`,
            `Category ${(i%4) + 1}`,
            `${(i%3) + 1}`,
            `${(i%6) + 1}`
        ));
    }
    categories.filter(c => c.company === companyId);
    
    return Promise.resolve(categories);
}