import { Airline } from "../airline.model"
import { Model } from "../model.model"

export interface AirplaneDTO {
    Id?: string
    ModelObj: Model
    AirlineObj: Airline
}