export class Product {
    public id: string;
    public name: string;
    public company_id: string;
    public feedback_url: string;
    public rating: number;

    constructor(id: string, name: string, company: string, url: string, rating: number) {
        this.id = id;
        this.name = name;
        this.company_id = company;
        this.feedback_url = url;
        this.rating = rating;
    }
}