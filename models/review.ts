export class Review {
    public id: string;
    public rating: number;
    public comment: string;
    public product_id: string;
    public company_id: string;
    public relevance: number;
    public created_at: Date;

    constructor(id: string, rating: number, comment: string, product: string, company: string, relevance: number, date: Date) {
        this.id = id;
        this.rating = rating;
        this.comment = comment;
        this.product_id = product;
        this.company_id = company;
        this.relevance = relevance;
        this.created_at = date;
    }
}