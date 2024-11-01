import {connectDatabase} from "./persistence/database";
import express from "express";
import cors from 'cors';
import { DatabaseService } from "./services/DatabaseService";
import { AirportRepository } from "./repository/airport.repository";
import { AirlineRepository } from "./repository/airline.repository";
import { AirplaneRepository } from "./repository/airplane.repository";
import { BrandRepository } from "./repository/brand.repository";
import { CountryRepository } from "./repository/country.repository";
import { FlightRepository } from "./repository/flight.repository";
import { ModelRepository } from "./repository/model.repository";
import { AirportAirplaneFlightRepository } from "./repository/airport.airplane.flight.repository";

console.log("💾 Connecting to database");
var db;
(async () => {
    try {
        db = await connectDatabase();
        console.log("Conexão bem-sucedida ao MySQL!");
        
        await db.end(); // Close the connection when finished
    } catch (error) {
        console.error("Erro ao conectar ao MySQL:", error);
    }
})();

console.log("🌐 Initializing DB service")
const dbService = new DatabaseService(db);

console.log("📚 Initializing repositories")
const airlineRepository = new AirlineRepository(dbService)
const airplaneRepository = new AirplaneRepository(dbService)
const airportRepository = new AirportRepository(dbService)
const brandRepository = new BrandRepository(dbService)
const countryRepository = new CountryRepository(dbService)
const flightRepository = new FlightRepository(dbService)
const modelRepository = new ModelRepository(dbService)
const airportAirplaneFlightRepository = new AirportAirplaneFlightRepository(dbService)

console.log("🚪 Initializing controllers")
/*const personController = new PersonController(
    personRepository,
    tarefaRepository,
    statusRepository
)
const tarefaController = new TarefaController(tarefaRepository, statusRepository)
const statusController = new StatusController(statusRepository)
*/

console.log("🔨 Configuring express")
const api: express.Express = express();
const port: number = 3000;
api.use(express.json());

console.log(" Serving frontend")
api.use(express.static("public"))
api.use(cors());


console.log("🧭 Registering routes")
/* api.get("/person", personController.findPersons())
api.get("/person/:personId", personController.getPerson());
api.post("/person", personController.addPerson())
api.delete("/person/:personId", personController.deletePerson())
api.get("/person/:personId/tarefa", tarefaController.findTarefa())
api.post("/person/:personId/tarefa", tarefaController.addTarefa())
api.delete("/tarefa/:tarefaId", tarefaController.deleteTarefa())
api.put("/tarefa/:tarefaId/:statusId", tarefaController.updateTarefa()) */

console.log("✈️ Starting express");
api.listen(port, () => {
    console.log("💡 Express JS listening on: " + port)
})