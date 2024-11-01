import { RowDataPacket } from "mysql2"
import { BaseSqlModel } from "./base/base.sql.model"

export interface Airplane extends RowDataPacket, BaseSqlModel{
    id_airplane?: string
    id_model: string
    id_airline: string
}