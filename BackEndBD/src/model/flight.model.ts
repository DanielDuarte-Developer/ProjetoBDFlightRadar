import { RowDataPacket } from "mysql2"
import { BaseSqlModel } from "./base/base.sql.model"

export interface Flight extends RowDataPacket, BaseSqlModel{
    id_flight?: string
    flight_code: string
    state_flight: string
    passengers: number
}