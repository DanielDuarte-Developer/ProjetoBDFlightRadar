import { RowDataPacket } from "mysql2"
import { BaseSqlModel } from "./base/base.sql.model"

export interface Brand extends RowDataPacket, BaseSqlModel{
    id_brand?: string
    id_country: string
    brand_name: string
}