import { IAnalytics } from "./analytics";

export interface IUser {
    _id: string, 
    email: string, 
    username: string, 
    analytics: IAnalytics,
    metadata?: any
}
