import { RowDataPacket } from "mysql2"

export interface Flight extends RowDataPacket{
    id_flight?: string
    flight_code: string
    state_flight: string
    passengers: number
}