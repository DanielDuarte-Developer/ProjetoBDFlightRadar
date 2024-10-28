import { Connection} from "mysql2/promise";
import { Airport } from "../model/airport.model";

export class AirportRepository {
    private db: Connection;

    constructor(db: Connection) {
        this.db = db;
    }

    async getAirports() : Promise<Airport[]> {
        const [rows] = await this.db.query<Airport[]>('SELECT * FROM airport');
        return rows;
    }
}