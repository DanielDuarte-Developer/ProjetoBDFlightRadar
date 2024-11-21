import { AirplaneDTO } from "./airplane.model.dto"
import { ObservationDTO } from "./observation.model.dto"

export interface FlightDTO {
    Id?: string
    ObservationObj: ObservationDTO
    AirplaneObj: AirplaneDTO
    FlightCode: string
    Passengers: number
}