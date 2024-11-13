import { RowDataPacket } from "mysql2"
import { BaseSqlModel } from "./base/base.sql.model"

export interface Airport extends RowDataPacket, BaseSqlModel{
    Id?: string
    IdCountry: string
    AirportName: string
    AirportCode: string
    LocationName: string
    LocationLatitude: number
    LocationLongitude: number
}