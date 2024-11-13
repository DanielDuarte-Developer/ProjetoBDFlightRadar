import { RowDataPacket } from "mysql2"
import { BaseSqlModel } from "./base/base.sql.model"

export interface Flight extends RowDataPacket, BaseSqlModel{
    Id?: string
    IdObservation: string
    IdAirplane: string,
    FlightCode: string
    Passengers: number
}