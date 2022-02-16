import { Review } from "@/models/review";

export function listReviews(companyId: string) {
    const reviews: Review[] = [];

    for (let i = 0; i < 20; i++) {
        reviews.push(new Review(
            `${i + 1}`,
            (Math.random() * 10) % 6,
            `Lorem ipsum dolor ${i + 1}`,
            `${(i % 5) + 1}`,
            `${(i % 3) + 1}`,
            (Math.random() * 10) % 6,
            new Date(Date.now() - ((i % 4) * 24 * 60 * 60 * 1000))
        ));
    }

    reviews.filter(r => r.company === companyId);

    return Promise.resolve(reviews);
}