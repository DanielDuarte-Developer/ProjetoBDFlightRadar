import { RowDataPacket } from "mysql2"

export interface Airline extends RowDataPacket{
    id_airline?: string
    id_country: string
    airline_name: string
    airline_code: string
}