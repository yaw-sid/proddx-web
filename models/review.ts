export class Review {
    public id: string;
    public rating: number;
    public comment: string;
    public product: string;
    public company: string;
    public relevance: number;
    public date_created: Date;

    constructor(id: string, rating: number, comment: string, product: string, company: string, relevance: number, date: Date) {
        this.id = id;
        this.rating = rating;
        this.comment = comment;
        this.product = product;
        this.company = company;
        this.relevance = relevance;
        this.date_created = date;
    }
}