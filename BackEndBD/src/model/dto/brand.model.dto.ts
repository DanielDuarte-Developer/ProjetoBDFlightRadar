import { CountryDTO } from "./country.model.dto"

export interface BrandDTO {
    Id?: string
    CountryObj: CountryDTO
    BrandName: string
}