import axios from "./api-client";

export function listReviews(companyId: string, token: string) {
    return axios.get(`/reviews?company_id=${companyId}`, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "text/plain, application/json"
        }
    });
}

export function deleteReview(reviewId: string, token: string) {
    return axios.delete(`/reviews/${reviewId}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
};