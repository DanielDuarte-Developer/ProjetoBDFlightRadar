import { RowDataPacket } from "mysql2"
import { BaseSqlModel } from "./base/base.sql.model"

export interface AirportAirplaneFlight extends RowDataPacket, BaseSqlModel{
    id_airport : string
    id_flight : string
    id_plane : string
    departure : string
    arrival : string
}