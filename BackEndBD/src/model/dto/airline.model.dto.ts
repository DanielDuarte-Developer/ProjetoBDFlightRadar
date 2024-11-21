import { CountryDTO } from "./country.model.dto"

export interface AirlineDTO {
    Id?: string
    CountryObj: CountryDTO
    AirlineName: string
    AirlineCode: string
}