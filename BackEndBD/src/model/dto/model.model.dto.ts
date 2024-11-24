import { BrandDTO } from "./brand.model.dto"

export interface ModelDTO {
    Id?: string
    BrandObj : BrandDTO
    ModelName: string
    ModelImage: string
    SitsNumber: string
    Tare: string
    GrossWeight: string
    Payload : number
    FlightCrewNumber : number
    FuelQuantity : number
    ModelYear : number
}