import { Country } from "../country.model"

export interface BrandDTO {
    Id?: string
    CountryObj: Country
    BrandName: string
}