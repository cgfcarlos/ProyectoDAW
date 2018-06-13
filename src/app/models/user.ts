export interface User {
    id: number;
    oauth_provider: string;
    oauth_uid: string;
    first_name: string;
    email: string;
    gender?: string;
    locale?: string;
    picture: string;
    isAdmin: boolean;
    token?: string;
    idToken?: string;
    provider?: string;
}
