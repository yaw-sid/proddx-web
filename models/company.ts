export class Company {
    public id: string;
    public email: string;
    public logo: string;

    constructor(id: string, email: string, logo: string) {
        this.id = id;
        this.email = email;
        this.logo = logo;
    }
}