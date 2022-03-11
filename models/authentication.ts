class SignInData {
    public email: string;
    public password: string;

    constructor(e: string, p: string) {
        this.email = e;
        this.password = p;
    }
}

class SignUpData {
    public name: string;
    public email: string;
    public password: string;

    constructor(n: string, e: string, p: string) {
        this.name = n;
        this.email = e;
        this.password = p;
    }
}

export {
    SignInData,
    SignUpData
}