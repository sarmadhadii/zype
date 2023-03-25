import { IConfidence } from "./confidence";
import { IScore } from "./score";
export interface IAnalytics {
    average: number, 
    played: number, 
    scores: IScore[],
    letterConfidences: { [key: string]: IConfidence }
    metadata?: any
}
