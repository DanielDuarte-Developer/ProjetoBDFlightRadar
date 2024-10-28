import { RowDataPacket } from "mysql2"

export interface Airport extends RowDataPacket{
    id_airport?: string
    id_country: string
    airport_name: string
    airport_code: number
    location_name: string
    location_latitude: number
    location_longitude: number
}