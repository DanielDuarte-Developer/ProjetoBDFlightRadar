import { RowDataPacket } from "mysql2"
import { BaseSqlModel } from "./base/base.sql.model"

export interface Brand extends RowDataPacket, BaseSqlModel{
    Id?: string
    IdCountry: string
    BrandName: string
}