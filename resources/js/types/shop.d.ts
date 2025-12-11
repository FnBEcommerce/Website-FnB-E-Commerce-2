import { User } from './user';

export type Shop = {
    name: string;
    address: string;
    phoneNumber: string;
    assignedUsers: User[];
};
