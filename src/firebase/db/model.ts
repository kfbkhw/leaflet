import { Timestamp } from 'firebase/firestore';

export type Collection =
    | UserCollection
    | PostCollection
    | CommentCollection
    | ReviewCollection;
export type Data = UserData | PostData | CommentData;
export type UpdatableData = UserDataUpdate | PostDataUpdate | CommentDataUpdate;

// -------------------------- user -------------------------- //
export type UserCollection = 'user';
export const COLLECTION_USER: UserCollection = 'user';

export type Providers = 'leaflet' | 'google';

export interface UserData {
    email: string; // primary key, no update
    username: string; // unique
    firstname: string;
    lastname: string;
    profileImg?: string; // unique
    bio?: string;
    follower?: string[];
    following?: string[];
    wishlist?: string[];
    like?: string[];
    bookmark?: string[];
    provider?: Providers;
    timestamp?: Timestamp; // automatic, no update
}

export interface UserDataUpdate {
    username?: string; // unique
    firstname?: string;
    lastname?: string;
    profileImg?: string; // unique
    bio?: string;
    follower?: string[];
    following?: string[];
    wishlist?: string[];
    like?: string[];
    bookmark?: string[];
}

// -------------------------- post -------------------------- //
export type PostCollection = 'post';
export const COLLECTION_POST: PostCollection = 'post';

export interface PostData {
    _id?: string; // primary key, automatic, no update
    email: string; // foreign key (user), no update
    content: string;
    images?: string[];
    comments?: string[];
    likes?: number;
    timestamp?: Timestamp; // automatic, no update
}

export interface PostDataUpdate {
    content?: string;
    images?: string[];
    comments?: string[];
    likes?: number;
}

// -------------------------- comment -------------------------- //
export type CommentCollection = 'comment';
export const COLLECTION_COMMENT: CommentCollection = 'comment';

export interface CommentData {
    _id?: string; // primary key, automatic, no update
    email: string; // foreign key (user), no update
    content: string;
    timestamp?: Timestamp; // automatic, no update
}

export interface CommentDataUpdate {
    content: string;
}

// -------------------------- review -------------------------- //
export type ReviewCollection = 'review';
export const COLLECTION_REVIEW: ReviewCollection = 'review';

export interface ReviewData {
    _id?: string; // primary key, automatic, no update
    isbn: string; // foreign key (book), no update
    email: string; // foreign key (user), no update
    anonymous: boolean;
    rating: number;
    content: string;
    timestamp?: Timestamp; // automatic, no update
}

export interface ReviewDataUpdate {
    anonymous: boolean;
    rating: number;
    content: string;
}
