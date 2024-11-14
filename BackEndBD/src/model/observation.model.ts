import { RowDataPacket } from "mysql2"
import { BaseSqlModel } from "./base/base.sql.model"

export interface Observation extends RowDataPacket, BaseSqlModel{
    Id?: string
    ObservationText : string
}