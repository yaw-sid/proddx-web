export class Category {
    public id: string;
    public label: string;
    public company: string;
    public product: string;

    constructor(id: string, label: string, company: string, product: string) {
        this.id = id;
        this.label = label;
        this.company = company;
        this.product = product;
    }
}