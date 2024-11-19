import { Airplane } from "../airplane.model"
import { Observation } from "../observation.model"

export interface FlightDTO {
    Id?: string
    ObservationObj: Observation
    AirplaneObj: Airplane
    FlightCode: string
    Passengers: number
}