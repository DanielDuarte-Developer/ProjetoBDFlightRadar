import { connectDatabase } from "./persistence/database";
import express from "express";
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from "url";
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
import { ObservationRepository } from "./repository/observation.repository";
import { ObservationController } from "./controller/observation.controller";
import { AirlineService } from "./services/airline.service";
import { AirplaneService } from "./services/airplane.service";
import { AirportService } from "./services/airport.service";
import { BrandService } from "./services/brand.service";
import { FlightService } from "./services/flight.service";
import { ModelService } from "./services/model.service";
import { AirportFlightService } from "./services/airport.flight.service";
import { CountryService } from "./services/country.service";
import { ObservationService } from "./services/observation.service";

console.log("💾 Connecting to database");
(async () => {
    try {
        var db = await connectDatabase();
        console.log("Conexão bem-sucedida ao MySQL!");
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
        const observationRepository = new ObservationRepository(dbService)


        console.log("🌐 Initializing Services ")
        const airlineService = new AirlineService(airlineRepository, countryRepository);
        const airplaneService = new AirplaneService(airplaneRepository, modelRepository, airlineRepository,brandRepository,countryRepository)
        const airportService = new AirportService(airportRepository, countryRepository)
        const brandService = new BrandService(brandRepository, countryRepository)
        const flightService = new FlightService(flightRepository, observationRepository, airplaneRepository,modelRepository,brandRepository,countryRepository,airlineRepository)
        const modelService = new ModelService(modelRepository, brandRepository,countryRepository)
        const airportFlightService = new AirportFlightService(airportFlightRepository,airportRepository,flightRepository,countryRepository,observationRepository,airplaneRepository,modelRepository,brandRepository,airlineRepository)
        const countryService = new CountryService(countryRepository)
        const observationService = new ObservationService(observationRepository)
        
        console.log("🚪 Initializing controllers")
        const airlineController = new AirlineController(airlineService)
        const airplaneController = new AirplaneController(airplaneService)
        const airportController = new AirportController(airportService)
        const brandController = new BrandController(brandService)
        const countryController = new CountryController(countryService)
        const flightController = new FlightController(flightService)
        const modelController = new ModelController(modelService)
        const airportFlightController = new AirportFlightController(airportFlightService)
        const observationController = new ObservationController(observationService)

        console.log("🔨 Configuring express")
        const api: express.Express = express();
        const port: number = 3000;
        api.use(express.json());

        //Get the frontEnd folder
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const frontendPath = path.join(__dirname, "../../FrontEndBD");

        console.log(" Serving frontend")
        api.use(express.static(frontendPath))
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
        api.get("/model", modelController.getModels())
        api.get("/model/:modelId", modelController.getModel())
        api.post("/model", modelController.addModel())
        api.put("/model", modelController.updateModel())
        api.delete("/model/:modelId", modelController.deleteModel())

        // Airport Flight routes
        api.get("/airportFlight", airportFlightController.getAirportFlights())
        api.get("/airportFlight/:airportFlightId", airportFlightController.getAirportFlight())
        api.get("/airportFlight/map/:flightId", airportFlightController.getValuesConstructPlane())
        api.get("/airportFlight/card/:flightId", airportFlightController.getFlightCardInfo())
        api.post("/airportFlight", airportFlightController.addAirportFlight())
        api.put("/airportFlight", airportFlightController.updateAirportFlight())

        // Observation routes
        api.get("/observation", observationController.getObservations())
        api.get("/observation/:observationId", observationController.getObservation())
        api.post("/observation", observationController.addObservation())
        api.put("/observation", observationController.updateObservation())
        api.delete("/observation/:observationId", observationController.deleteObservation())

        console.log("✈️ Starting express");
        api.listen(port, () => {
            console.log("💡 Express JS listening on: " + port)
        })
    } catch (error) {
        console.error("Erro ao conectar ao MySQL:", error);
    }
})();

