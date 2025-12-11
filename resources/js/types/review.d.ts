import { User } from './user';

export type Review = {
    user: User;
    totalRating: number;
    type: string;
    description: string;
};
