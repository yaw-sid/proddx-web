import axios from "./api-client";
import { SignInData, SignUpData } from "~/models/authentication";

const signIn = (payload: SignInData) => {
    return axios.post("/login", payload, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "text/plain, application/json"
        }
    });
};

const signUp = (payload: SignUpData) => {
    return axios.post("/register", payload, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "text/plain, application/json"
        }
    });
};

export { 
    signIn,
    signUp
};