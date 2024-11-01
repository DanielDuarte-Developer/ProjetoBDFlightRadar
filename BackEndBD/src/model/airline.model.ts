import { RowDataPacket } from "mysql2"
import { BaseSqlModel } from "./base/base.sql.model"

export interface Airline extends RowDataPacket, BaseSqlModel{
    id_airline?: string
    id_country: string
    airline_name: string
    airline_code: string
}