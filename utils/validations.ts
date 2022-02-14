export const nameValidation = (name: string): boolean => {
    return /^([A-Za-z][. ]{0,1}[A-Za-z ,.'-]*){2,}$/.test(name);
};

export const phoneValidation = (phone: string): boolean => {
    return /^\d{10}$/.test(phone);
};

export const emailValidation = (email: string): boolean => {
    return /^(([^<>()[\]\\.,;:\s-@#!$%&*+=^"]+(\.[^<>()[\]\\.,;:\s-@#!$%&*+=^"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))+$/.test(email);
};

export const eightCharactersValidation = (password: string): boolean => {
    return password.length > 7;
};

export const oneNumberValidation = (password: string): boolean => {
    return /^(?=.*?[0-9]).{1,}$/.test(password);
};

export const oneSpecialCharacterValidation = (password: string): boolean => {
    return /^(?=.*?[#?!@$%^&*-]).{1,}$/.test(password);
};

export const passwordMatchValidation = (password: string, confirm: string): boolean => {
    return password === confirm;
};

export const addressValidation = (address: string): boolean => {
    return /^[_A-z0-9]*((\.|-|,|#|\/|\s)*[A-z0-9])+$/.test(address);
};

export const postcodeValidation = (code: string): boolean => {
    return /^([A-Z][A-HJ-Y]?\d[A-Z\d]? ?\d[A-Z]{2}|GIR ?0A{2})$/.test(code);
};

export const companyNameValidation = (holder: string): boolean => {
    return /^[A-Za-z][,.'-]?[a-z]* ?(\s[A-Za-z]+[ ,.'-]?[A-Za-z]+)+$/.test(holder);
};

export const visaValidation = (num: string): boolean => {
    return /^4[0-9]{12}(?:[0-9]{3})?$/.test(num);
};

export const masterCardValidation = (num: string): boolean => {
    return /^5[1-5][0-9]{14}|^(222[1-9]|22[3-9]\\d|2[3-6]\\d{2}|27[0-1]\\d|2720)[0-9]{12}$/.test(num);
};

export const discoverValidation = (num: string): boolean => {
    return /^6(?:011|5[0-9]{2})[0-9]{12}$/.test(num);
};

export const amexValidation = (num: string): boolean => {
    return /^3[47][0-9]{13}$/.test(num);
};

export const dinersClubValidation = (num: string): boolean => {
    return /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/.test(num);
};

export const jcbValidation = (num: string): boolean => {
    return /^(?:2131|1800|35[0-9]{3})[0-9]{11}$/.test(num);
};