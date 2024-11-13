import { RowDataPacket } from "mysql2"
import { BaseSqlModel } from "./base/base.sql.model"

export interface Airplane extends RowDataPacket, BaseSqlModel{
    Id?: string
    IdModel: string
    IdAirline: string
}