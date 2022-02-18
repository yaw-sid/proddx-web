export class Company {
    public id: string;
    public name: string;
    public email: string;
    public logo: string;

    constructor(id: string, name: string, email: string, logo: string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.logo = logo;
    }
}