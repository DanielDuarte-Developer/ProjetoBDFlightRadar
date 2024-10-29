import { RowDataPacket } from "mysql2"

export interface Brand extends RowDataPacket{
    id_brand?: string
    id_country: string
    brand_name: string
}