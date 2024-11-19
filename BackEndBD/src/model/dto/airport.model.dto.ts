import { Country } from "../country.model"

export interface AirportDTO {
    Id?: string
    CountryObj: Country
    AirportName: string
    AirportCode: string
    LocationName: string
    LocationLatitude: number
    LocationLongitude: number
}