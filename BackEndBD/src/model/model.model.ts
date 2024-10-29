import { RowDataPacket } from "mysql2"

export interface Model extends RowDataPacket{
    id_model?: string
    id_brand : string
    sits_number: string
    tare: string
    gross_weight: string
    payload : number
    flight_crew_members : number
    fuel_quantity : number
    model_year : number
}