import { RowDataPacket } from "mysql2"
import { BaseSqlModel } from "./base/base.sql.model"

export interface AirportFlight extends RowDataPacket, BaseSqlModel{
    Id : string
    IdAirport: string
    IdFlight : string
    TimeMarker: string
}