import { CountryDTO } from "./country.model.dto"

export interface AirportDTO {
    Id?: string
    CountryObj: CountryDTO
    AirportName: string
    AirportCode: string
    LocationName: string
    LocationLatitude: number
    LocationLongitude: number
}