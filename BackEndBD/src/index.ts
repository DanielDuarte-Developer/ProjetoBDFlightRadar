import {connectDatabase} from "./persistence/database";
import express from "express";
import cors from 'cors';
import { DatabaseService } from "./services/DataBase/DatabaseService";
import { AirportRepository } from "./repository/airport.repository";
import { AirlineRepository } from "./repository/airline.repository";
import { AirplaneRepository } from "./repository/airplane.repository";
import { BrandRepository } from "./repository/brand.repository";
import { CountryRepository } from "./repository/country.repository";
import { FlightRepository } from "./repository/flight.repository";
import { ModelRepository } from "./repository/model.repository";
import { AirportFlightRepository } from "./repository/airport.flight.repository";
import { AirlineController } from "./controller/airline.controller";
import { AirplaneController } from "./controller/airplane.controller";
import { AirportController } from "./controller/airport.controller";
import { BrandController } from "./controller/brand.controller";
import { CountryController } from "./controller/country.controller";
import { FlightController } from "./controller/flight.controller";
import { ModelController } from "./controller/model.controller";
import { AirportFlightController } from "./controller/airport.flight.controller";

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
const airportFlightRepository = new AirportFlightRepository(dbService)

console.log("🚪 Initializing controllers")
const airlineController = new AirlineController(airlineRepository)
const airplaneController = new AirplaneController(airplaneRepository)
const airportController = new AirportController(airportRepository)
const brandController = new BrandController(brandRepository)
const countryController = new CountryController(countryRepository)
const flightController = new FlightController(flightRepository)
const modelController = new ModelController(modelRepository)
const airportFlightController = new AirportFlightController(airportFlightRepository) 

console.log("🔨 Configuring express")
const api: express.Express = express();
const port: number = 3000;
api.use(express.json());

console.log(" Serving frontend")
api.use(express.static("public"))
api.use(cors());


console.log("🧭 Registering routes")
// Airline routes
api.get("/airline", airlineController.getAirlines())
api.get("/airline/:airlineId", airlineController.getAirline())
api.post("/airline", airlineController.addAirline())
api.put("/airline", airlineController.updateAirline())
api.delete("/airline/:airlineId", airlineController.deleteAirline())

// Airplane routes
api.get("/airplane", airplaneController.getAirplanes())
api.get("/airplane/:airplaneId", airplaneController.getAirplane())
api.post("/airplane", airplaneController.addAirplane())
api.put("/airplane", airplaneController.updateAirplane())
api.delete("/airplane/:airplaneId", airplaneController.deleteAirplane())

// Airport routes
api.get("/airport", airportController.getAirports())
api.get("/airport/:airportId", airportController.getAirport())
api.post("/airport", airportController.addAirport())
api.put("/airport", airportController.updateAirport())
api.delete("/airport/:airportId", airportController.deleteAirport())

// Brand routes
api.get("/brand", brandController.getBrands())
api.get("/brand/:brandId", brandController.getBrand())
api.post("/brand", brandController.addBrand())
api.put("/brand", brandController.updateBrand())
api.delete("/brand/:brandId", brandController.deleteBrand())

// Country routes
api.get("/country", countryController.getCountries())
api.get("/country/:countryId", countryController.getCountry())
api.post("/country", countryController.addCountry())
api.put("/country", countryController.updateCountry())
api.delete("/country/:countryId", countryController.deleteCountry())

// Flight routes
api.get("/flight", flightController.getFlights())
api.get("/flight/:flightId", flightController.getFlight())
api.post("/flight", flightController.addFlight())
api.put("/flight", flightController.updateFlight())
api.delete("/flight/:flightId", flightController.deleteFlight())

// Model routes
api.get("/airline", modelController.getModels())
api.get("/airline/:airlineId", modelController.getModel())
api.post("/airline", modelController.addModel())
api.put("/airline", modelController.updateModel())
api.delete("/airline/:airlineId", modelController.deleteModel())

// Airport Flight routes
api.get("/airportFlight", airportFlightController.getAirportFlights())
api.get("/airportFlight/:airportFlightId", airportFlightController.getAirportFlight())
api.post("/airportFlight", airportFlightController.addAirportFlight())
api.put("/airportFlight", airportFlightController.updateAirportFlight())

console.log("✈️ Starting express");
api.listen(port, () => {
    console.log("💡 Express JS listening on: " + port)
})