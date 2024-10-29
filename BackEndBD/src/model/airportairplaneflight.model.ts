import { RowDataPacket } from "mysql2"

export interface AirportAirplaneFlight extends RowDataPacket{
    id_airport : string
    id_flight : string
    id_plane : string
    departure : string
    arrival : string
}