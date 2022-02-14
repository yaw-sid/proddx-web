import { SignInData, SignUpData } from "~/models/authentication";

const signIn = (payload: SignInData) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(payload)
        }, 1500);
    });
};

const signUp = (payload: SignUpData) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(payload)
        }, 1500);
    });
};

export { 
    signIn,
    signUp
};