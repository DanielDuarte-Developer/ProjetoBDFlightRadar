import { RowDataPacket } from "mysql2"

export interface Country extends RowDataPacket{
    id_country?: string
    country_name: string
}