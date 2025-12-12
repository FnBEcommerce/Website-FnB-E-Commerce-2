import { User } from './user';

export type Review = {
    user: User;
    total_rating: number;
    type: string;
    description: string;
};
