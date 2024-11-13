import { RowDataPacket } from "mysql2"
import { BaseSqlModel } from "./base/base.sql.model"

export interface Country extends RowDataPacket, BaseSqlModel{
    Id?: string
    CountryName: string
}