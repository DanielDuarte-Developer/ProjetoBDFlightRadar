import { Airline } from "../airline.model"
import { AirlineDTO } from "./airline.model.dto"
import { ModelDTO } from "./model.model.dto"

export interface AirplaneDTO {
    Id?: string
    ModelObj: ModelDTO
    AirlineObj: AirlineDTO
}