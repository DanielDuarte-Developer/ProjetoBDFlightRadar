import { RowDataPacket } from "mysql2"

export interface Airplane extends RowDataPacket{
    id_airplane?: string
    id_model: string
    id_airline: string
}