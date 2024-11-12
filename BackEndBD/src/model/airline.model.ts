import { RowDataPacket } from "mysql2"
import { BaseSqlModel } from "./base/base.sql.model"

export interface Airline extends RowDataPacket, BaseSqlModel{
    Id?: string
    IdCountry: string
    AirlineName: string
    AirlineCode: string
}