import { AirportDTO } from "./airport.model.dto"
import { FlightDTO } from "./flight.model.dto"

export interface AirportFlightDTO{
    Id : string
    AirportObj: AirportDTO
    FlightObj : FlightDTO
    TimeMarker: string
}