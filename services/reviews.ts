import { Review } from "@/models/review";

export function listReviews(companyId: string) {
    const reviews: Review[] = [];

    for (let i = 0; i < 20; i++) {
        reviews.push(new Review(
            `${i + 1}`,
            Math.floor((Math.random() * 10) % 5) + 1,
            `Lorem ipsum dolor ${i + 1}`,
            `${(i % 5) + 1}`,
            `${(i % 3) + 1}`,
            Math.floor((Math.random() * 10) % 5) + 1,
            new Date(Date.now() - ((i % 4) * 24 * 60 * 60 * 1000))
        ));
    }

    reviews.filter(r => r.company === companyId);

    return Promise.resolve(reviews);
}

export function deleteReview(reviewId: string) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(reviewId), 1500);
    });
};