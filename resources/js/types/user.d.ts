type AddressInfo = {
    street: string;
    city: string;
    state: string;
};

export type User = {
    fullName: string;
    email: string;
    password: string;
    fullNumber: string;
    birthDate: Date;
    gender: string;
    addressInfo: AddressInfo;
};
