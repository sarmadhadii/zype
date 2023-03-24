import { IScore } from "./score";

export interface IAnalytics {
    average: number, 
    played: number, 
    scores: IScore[],
    metadata?: any
}
