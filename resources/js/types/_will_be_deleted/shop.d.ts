import { User } from './user';

export type Shop = {
    name: string;
    address: string;
    phone_number: string;
    users: User[];
};
