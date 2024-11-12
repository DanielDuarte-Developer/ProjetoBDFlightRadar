import { RowDataPacket } from "mysql2"
import { BaseSqlModel } from "./base/base.sql.model"

export interface Model extends RowDataPacket, BaseSqlModel{
    Id?: string
    IdBrand : string
    SitsNumber: string
    Tare: string
    GrossWeight: string
    Payload : number
    FlightCrewMembers : number
    FuelQuantity : number
    ModelYear : number
}