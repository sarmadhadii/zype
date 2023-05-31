import { IConfidence } from "./confidence"

export interface IScore {
    date: Date, 
    speed: number,
    played: number,
    metadata?: any,
    letterConfidences: { [key: string]: IConfidence }

}
