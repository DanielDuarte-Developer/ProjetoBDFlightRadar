import { Airline } from "../model/airline.model";
import { Airplane } from "../model/airplane.model";
import { Brand } from "../model/brand.model";
import { Country } from "../model/country.model";
import { FlightDTO } from "../model/dto/flight.model.dto";
import { Flight } from "../model/flight.model";
import { Model } from "../model/model.model";
import { Observation } from "../model/observation.model";
import { AirlineRepository } from "../repository/airline.repository";
import { AirplaneRepository } from "../repository/airplane.repository";
import { BrandRepository } from "../repository/brand.repository";
import { CountryRepository } from "../repository/country.repository";
import { FlightRepository } from "../repository/flight.repository";
import { ModelRepository } from "../repository/model.repository";
import { ObservationRepository } from "../repository/observation.repository";
import { IFlightService } from "./interfaces/iflight.service";

export class FlightService implements IFlightService{
    protected flightRepository: FlightRepository;
    protected observationRepository: ObservationRepository;
    protected airplaneRepository: AirplaneRepository;
    protected modelRepository: ModelRepository;
    protected brandRepository: BrandRepository;
    protected countryRepository: CountryRepository;
    protected airlineRepository: AirlineRepository;

    constructor(flightRepository: FlightRepository, 
        observationRepository: ObservationRepository, airplaneRepository: AirplaneRepository,
        modelRepository: ModelRepository, brandRepository: BrandRepository, countryRepository: CountryRepository,
        airlineRepository: AirlineRepository) {
        this.flightRepository = flightRepository;
        this.observationRepository = observationRepository;
        this.airplaneRepository = airplaneRepository;
        this.modelRepository = modelRepository;
        this.brandRepository = brandRepository;
        this.countryRepository = countryRepository;
        this.airlineRepository = airlineRepository;
    }

    async AddAsync(item: Flight, userId: string) {
        return await this.flightRepository.AddAsync(item,userId);
    }

    async UpdateAsync(item: Flight, userId: string) {
        await this.flightRepository.UpdateAsync(item,userId);
    }

    async DeleteAsync(id: string, userId: string) {
        await this.flightRepository.DeleteAsync(id,userId);
    }

    async GetByIdAsync(id: string): Promise<FlightDTO> {
        const flight: Flight = await this.flightRepository.GetAsync(id);
        const observation: Observation = await this.observationRepository.GetAsync(flight[0].IdObservation);
        const airplane: Airplane = await this.airplaneRepository.GetAsync(flight[0].IdAirplane);
        const model: Model = await this.modelRepository.GetAsync(airplane[0].IdModel);
        const brand: Brand = await this.brandRepository.GetAsync(model[0].IdBrand);
        const country: Country = await this.countryRepository.GetAsync(brand[0].IdCountry);
        const airline: Airline = await this.airlineRepository.GetAsync(airplane[0].IdAirline);

        return {
            Id: flight[0].Id,
            ObservationObj: {Id: observation[0].Id, ObservationText: observation[0].ObservationText},
            AirplaneObj: {
                Id : airplane[0].Id,
                ModelObj : { 
                    Id: model[0].Id,
                    BrandObj : {Id: brand[0].Id, CountryObj: {Id: country[0].Id, CountryName: country[0].CountryName}, BrandName: brand.BrandName},
                    ModelName: model[0].ModelName,
                    SitsNumber: model[0].SitsNumber,
                    Tare: model[0].Tare,
                    GrossWeight: model[0].GrossWeight,
                    Payload : model.Payload,
                    FlightCrewNumber : model[0].FlightCrewNumber,
                    FuelQuantity : model[0].FuelQuantity,
                    ModelYear : model[0].ModelYear,
                },
                AirlineObj: {
                    Id: airline[0].Id,
                    CountryObj: {Id: country[0].Id, CountryName: country[0].CountryName},
                    AirlineName: airline[0].AirlineName,
                    AirlineCode: airline[0].AirlineCode
                }
            },
            FlightCode: flight[0].FlightCode,
            Passengers: flight[0].Passengers
        }
    }

    async ListAsync(
        idFlight: string = '', 
        idObservation: string = '', 
        idAirplane: string = '', 
        flightCode: string = '', 
        passengers: number = 0, 
        sortField: string = '', 
        sortAscending: boolean = false): Promise<FlightDTO[]> {
        const flights: Flight[] = await this.flightRepository.ListFlights(idFlight,idObservation,idAirplane,flightCode,passengers,sortField,sortAscending)

        const flightDTOs = await Promise.all(
            flights[0].map(async (flight) => {
                const observation: Observation = await this.observationRepository.GetAsync(flight.IdObservation);
                const airplane: Airplane = await this.airplaneRepository.GetAsync(flight.IdAirplane);
                const model: Model = await this.modelRepository.GetAsync(airplane[0].IdModel);
                const brand: Brand = await this.brandRepository.GetAsync(model[0].IdBrand);
                const country: Country = await this.countryRepository.GetAsync(brand[0].IdCountry);
                const airline: Airline = await this.airlineRepository.GetAsync(airplane[0].IdAirline);


                return {
                    Id: flight.Id,
                    ObservationObj: {Id: observation[0].Id, ObservationText: observation[0].ObservationText},
                    AirplaneObj: {
                        Id : airplane[0].Id,
                        ModelObj : { 
                            Id: model[0].Id,
                            BrandObj : {Id: brand[0].Id, CountryObj: {Id: country[0].Id, CountryName: country[0].CountryName}, BrandName: brand.BrandName},
                            ModelName: model[0].ModelName,
                            SitsNumber: model[0].SitsNumber,
                            Tare: model[0].Tare,
                            GrossWeight: model[0].GrossWeight,
                            Payload : model.Payload,
                            FlightCrewNumber : model[0].FlightCrewNumber,
                            FuelQuantity : model[0].FuelQuantity,
                            ModelYear : model[0].ModelYear,
                        },
                        AirlineObj: {
                            Id: airline[0].Id,
                            CountryObj: {Id: country[0].Id, CountryName: country[0].CountryName},
                            AirlineName: airline[0].AirlineName,
                            AirlineCode: airline[0].AirlineCode
                        }
                    },
                    FlightCode: flight.FlightCode,
                    Passengers: flight.Passengers
                }
            })
        );

        return flightDTOs
    }
}