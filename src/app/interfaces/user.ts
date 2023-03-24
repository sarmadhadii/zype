import { IAnalytics } from "./analytics";

export interface IUser {
    id: string, 
    email: string, 
    username: string, 
    analytics: IAnalytics,
    metadata?: any
}
