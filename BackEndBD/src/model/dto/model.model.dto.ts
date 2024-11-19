import { Brand } from "../brand.model"

export interface ModelDTO {
    Id?: string
    BrandObj : Brand
    SitsNumber: string
    Tare: string
    GrossWeight: string
    Payload : number
    FlightCrewMembers : number
    FuelQuantity : number
    ModelYear : number
}