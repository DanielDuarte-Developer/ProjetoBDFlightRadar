import { Country } from "../country.model"

export interface AirlineDTO {
    Id?: string
    CountryObj: Country
    AirlineName: string
    AirlineCode: string
}